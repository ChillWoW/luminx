import React, { forwardRef, useState, useRef, useEffect } from "react";
import { SegmentedControlProps, SegmentedControlItem } from "./types";
import { useTheme } from "../_theme";

export const SegmentedControl = forwardRef<
    HTMLDivElement,
    SegmentedControlProps
>(
    (
        {
            data,
            value,
            defaultValue,
            onChange,
            size = "md",
            fullWidth = false,
            color,
            disabled = false,
            readOnly = false,
            transitionDuration = 200,
            transitionTimingFunction = "ease",
            orientation = "horizontal",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [activeValue, setActiveValue] = useState(
            value ||
                defaultValue ||
                (typeof data[0] === "string" ? data[0] : data[0].value)
        );
        const controlRefs = useRef<(HTMLLabelElement | null)[]>([]);
        const rootRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (value !== undefined) {
                setActiveValue(value);
            }
        }, [value]);

        const handleChange = (newValue: string) => {
            if (!disabled && !readOnly) {
                if (!value) {
                    setActiveValue(newValue);
                }
                onChange?.(newValue);
            }
        };

        const sizeClass = () => {
            const styles = {
                xs: "text-xs py-0.5 px-1.5",
                sm: "text-sm py-1 px-2",
                md: "text-base py-1.5 px-2.5",
                lg: "text-lg py-2 px-3.5",
                xl: "text-xl py-2.5 px-4.5"
            };

            return styles[size] || styles.md;
        };

        const formatItem = (item: SegmentedControlItem) => {
            if (typeof item === "string") {
                return { label: item, value: item, disabled: false };
            }
            return { ...item, disabled: item.disabled || false };
        };

        const items = data.map(formatItem);

        return (
            <div
                ref={ref || rootRef}
                className={cx(
                    "inline-flex relative p-1 rounded-md",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    orientation === "vertical" ? "flex-col" : "flex-row",
                    fullWidth && "w-full",
                    disabled && "opacity-60 cursor-not-allowed",
                    className,
                    classNames?.root
                )}
                {...props}
            >
                <div
                    className={cx(
                        "flex gap-1 w-full",
                        orientation === "vertical" ? "flex-col" : "flex-row",
                        classNames?.control
                    )}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.value}
                            className={cx(
                                "flex-1 rounded-md font-medium",
                                theme === "light"
                                    ? "text-[var(--luminx-light-text)]"
                                    : "text-[var(--luminx-dark-text)]",
                                activeValue !== item.value &&
                                    (theme === "light"
                                        ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                                        : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]"),
                                item.disabled &&
                                    "opacity-60 cursor-not-allowed",
                                classNames?.item
                            )}
                        >
                            <input
                                id={`segmented-control-${item.value}`}
                                className={cx("sr-only", classNames?.input)}
                                type="radio"
                                name="segmented-control"
                                value={item.value}
                                checked={activeValue === item.value}
                                disabled={disabled || item.disabled}
                                readOnly={readOnly}
                                onChange={() => handleChange(item.value)}
                            />
                            <label
                                ref={(el) => {
                                    if (el) {
                                        controlRefs.current[index] = el;
                                    }
                                }}
                                htmlFor={`segmented-control-${item.value}`}
                                className={cx(
                                    "flex items-center justify-center text-center transition-colors w-full rounded-md",
                                    sizeClass(),
                                    "cursor-pointer",
                                    (disabled || item.disabled || readOnly) &&
                                        "cursor-not-allowed",
                                    activeValue === item.value &&
                                        (theme === "light"
                                            ? "bg-[var(--luminx-light-background-hover)]"
                                            : "bg-[var(--luminx-dark-background-hover)]"),
                                    activeValue === item.value &&
                                        classNames?.activeItem,
                                    classNames?.label,
                                    "relative z-[2]"
                                )}
                            >
                                {item.icon && (
                                    <span
                                        className={cx("mr-2", classNames?.icon)}
                                    >
                                        {item.icon}
                                    </span>
                                )}
                                <span
                                    className={cx(
                                        "relative z-[2]",
                                        classNames?.innerLabel
                                    )}
                                >
                                    {item.label}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

SegmentedControl.displayName = "@luminx/core/SegmentedControl";
