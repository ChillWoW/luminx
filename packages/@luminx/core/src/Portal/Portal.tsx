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

        if (!portalRef.current) {
            portalRef.current = document.createElement("div");
        }

        let targetNode: HTMLElement | null = null;

        if (target) {
            if (target instanceof HTMLElement) {
                targetNode = target;
            } else if (typeof target === "string") {
                targetNode = document.querySelector(target);
            }
        }

        if (!targetNode) {
            if (reuseTargetNode && portalTargets["default"]) {
                targetNode = portalTargets["default"];
            } else {
                const newTarget = document.createElement("div");
                document.body.appendChild(newTarget);

                if (reuseTargetNode) {
                    portalTargets["default"] = newTarget;
                }

                targetNode = newTarget;
            }
        }

        targetNode.appendChild(portalRef.current);

        return () => {
            if (portalRef.current && targetNode?.contains(portalRef.current)) {
                targetNode.removeChild(portalRef.current);
            }

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

    if (!mounted) return null;

    return portalRef.current ? createPortal(children, portalRef.current) : null;
};

export default Portal;
