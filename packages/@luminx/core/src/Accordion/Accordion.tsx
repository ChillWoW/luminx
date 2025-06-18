import { forwardRef, useState, useEffect } from "react";
import { AccordionProps } from "./types";
import { AccordionContext } from "./context";
import { AccordionItem } from "./AccordionItem";
import { AccordionControl } from "./AccordionControl";
import { AccordionPanel } from "./AccordionPanel";
import { useTheme } from "../_theme";

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            children,
            multiple = false,
            value,
            defaultValue = null,
            onChange,
            chevron,
            chevronPosition = "right",
            chevronSize = 16,
            disableChevronRotation = false,
            transitionDuration = 200,
            className,
            classNames
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [internalValue, setInternalValue] = useState<
            string | string[] | null
        >(defaultValue);

        const currentValue = value !== undefined ? value : internalValue;

        useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value);
            }
        }, [value]);

        const handleChange = (itemValue: string) => {
            let newValue: string | string[] | null;

            if (multiple) {
                const currentArray = Array.isArray(currentValue)
                    ? currentValue
                    : [];
                if (currentArray.includes(itemValue)) {
                    newValue = currentArray.filter((v) => v !== itemValue);
                    if (newValue.length === 0) newValue = null;
                } else {
                    newValue = [...currentArray, itemValue];
                }
            } else {
                newValue = currentValue === itemValue ? null : itemValue;
            }

            if (value === undefined) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        };

        const contextValue = {
            value: currentValue,
            onChange: handleChange,
            multiple,
            chevron,
            chevronPosition,
            chevronSize,
            disableChevronRotation,
            transitionDuration,
            classNames
        };

        return (
            <AccordionContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "border rounded-md overflow-hidden",
                        theme === "light"
                            ? "border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                            : "border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]",
                        className,
                        classNames?.root
                    )}
                    data-multiple={multiple || undefined}
                >
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);

const ExtendedAccordion = Object.assign(Accordion, {
    Item: AccordionItem,
    Control: AccordionControl,
    Panel: AccordionPanel
});

ExtendedAccordion.displayName = "@luminx/core/Accordion";

export { ExtendedAccordion as Accordion };
