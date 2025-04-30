import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";

let portalTargets: Record<string, HTMLDivElement> = {};

export const Portal = ({
    children,
    target,
    reuseTargetNode = false
}: PortalProps) => {
    const [mounted, setMounted] = useState(false);
    const portalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);

        // Create an element to append to the target
        if (!portalRef.current) {
            portalRef.current = document.createElement("div");
        }

        let targetNode: HTMLElement | null = null;

        // Handle target options
        if (target) {
            // If target is a DOM node
            if (target instanceof HTMLElement) {
                targetNode = target;
            }
            // If target is a selector string
            else if (typeof target === "string") {
                targetNode = document.querySelector(target);
            }
        }

        // If no valid target is provided or found, use document.body
        if (!targetNode) {
            if (reuseTargetNode && portalTargets["default"]) {
                targetNode = portalTargets["default"];
            } else {
                // Create a new default target if none exists
                const newTarget = document.createElement("div");
                document.body.appendChild(newTarget);

                // Save for reuse if requested
                if (reuseTargetNode) {
                    portalTargets["default"] = newTarget;
                }

                targetNode = newTarget;
            }
        }

        // Append portal element to the target
        targetNode.appendChild(portalRef.current);

        // Clean up when component is unmounted
        return () => {
            if (portalRef.current && targetNode?.contains(portalRef.current)) {
                targetNode.removeChild(portalRef.current);
            }

            // If the target was created for this portal, remove it
            if (
                !reuseTargetNode &&
                targetNode &&
                targetNode !== document.body &&
                document.body.contains(targetNode)
            ) {
                document.body.removeChild(targetNode);
            }
        };
    }, [target, reuseTargetNode]);

    // Don't render on server-side
    if (!mounted) return null;

    return portalRef.current ? createPortal(children, portalRef.current) : null;
};

export default Portal;
