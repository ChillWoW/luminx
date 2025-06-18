import { forwardRef } from "react";
import { AccordionItemProps } from "./types";
import { AccordionItemContext } from "./context";
import { useAccordion } from "./context";
import { cx, useTheme } from "../_theme";

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, value, className }, ref) => {
        const { theme } = useTheme();

        const accordion = useAccordion();

        const isActive = Array.isArray(accordion.value)
            ? accordion.value.includes(value)
            : accordion.value === value;

        const contextValue = {
            value,
            isActive
        };

        const getBackground = () => {
            switch (theme) {
                case "light":
                    return "bg-[var(--luminx-light-background)]";
                default:
                    return "bg-[var(--luminx-dark-background)]";
            }
        };

        return (
            <AccordionItemContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "border-b last:border-b-0",
                        theme === "light"
                            ? "border-[var(--luminx-light-border)]"
                            : "border-[var(--luminx-dark-border)]",
                        isActive && getBackground(),
                        className,
                        accordion.classNames?.item
                    )}
                    data-active={isActive || undefined}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        );
    }
);

AccordionItem.displayName = "@luminx/core/Accordion.Item";
