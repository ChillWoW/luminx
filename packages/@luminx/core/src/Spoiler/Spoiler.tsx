import { useState, useRef, useEffect, forwardRef } from "react";
import { SpoilerProps } from "./types";
import { cn } from "../_utils";

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
    (
        {
            children,
            maxHeight = 100,
            showLabel,
            hideLabel,
            expanded: controlledExpanded,
            onExpandedChange,
            transitionDuration = 200,
            controlRef,
            className,
            ...props
        },
        ref
    ) => {
        const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);
        const [contentHeight, setContentHeight] = useState(0);
        const contentRef = useRef<HTMLDivElement>(null);

        const expanded =
            controlledExpanded !== undefined
                ? controlledExpanded
                : uncontrolledExpanded;
        const isContentTaller = contentHeight > maxHeight;

        useEffect(() => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        }, [children]);

        const handleToggle = () => {
            const newExpanded = !expanded;
            if (controlledExpanded === undefined) {
                setUncontrolledExpanded(newExpanded);
            }
            onExpandedChange?.(newExpanded);
        };

        return (
            <div ref={ref} className={cn("relative", className)} {...props}>
                <div
                    ref={contentRef}
                    style={{
                        maxHeight:
                            isContentTaller && !expanded
                                ? maxHeight
                                : undefined,
                        overflow:
                            isContentTaller && !expanded ? "hidden" : undefined,
                        transitionProperty: "max-height",
                        transitionDuration: `${transitionDuration}ms`,
                        transitionTimingFunction: "ease"
                    }}
                >
                    {children}
                </div>

                {isContentTaller && (
                    <div className="mt-2 text-center">
                        <button
                            ref={controlRef}
                            onClick={handleToggle}
                            className="text-[var(--lumin-primary)] font-medium hover:underline focus:outline-none"
                            type="button"
                        >
                            {expanded ? hideLabel : showLabel}
                        </button>
                    </div>
                )}
            </div>
        );
    }
);

Spoiler.displayName = "Spoiler";
