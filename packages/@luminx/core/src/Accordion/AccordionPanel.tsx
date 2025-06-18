import { forwardRef, useRef, useEffect, useState } from "react";
import { AccordionPanelProps } from "./types";
import { useAccordion, useAccordionItem } from "./context";
import { cx } from "../_theme";

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
    ({ children, className }, ref) => {
        const accordion = useAccordion();
        const item = useAccordionItem();
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState<number | string>(0);

        useEffect(() => {
            if (contentRef.current) {
                if (item.isActive) {
                    // Get the natural height of the content
                    const scrollHeight = contentRef.current.scrollHeight;
                    setHeight(scrollHeight);
                } else {
                    setHeight(0);
                }
            }
        }, [item.isActive]);

        return (
            <div
                ref={ref}
                className={cx(
                    "overflow-hidden transition-all ease-in-out",
                    className,
                    accordion.classNames?.panel
                )}
                style={{
                    height: height,
                    transitionDuration: `${accordion.transitionDuration}ms`
                }}
                data-active={item.isActive || undefined}
            >
                <div ref={contentRef} className="p-4">
                    {children}
                </div>
            </div>
        );
    }
);

AccordionPanel.displayName = "@luminx/core/Accordion.Panel";
