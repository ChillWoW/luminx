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

        const sizeClasses = () => {
            const styles = {
                xs: "text-xs px-2 py-1",
                sm: "text-sm px-3 py-1.5",
                md: "text-sm px-4 py-2",
                lg: "text-base px-5 py-2.5",
                xl: "text-lg px-6 py-3"
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
                    "inline-flex relative",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] border border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] border border-[var(--luminx-dark-border)]",
                    "rounded-lg p-1",
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
                        "flex w-full",
                        orientation === "vertical" ? "flex-col" : "flex-row",
                        "gap-1",
                        classNames?.control
                    )}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.value}
                            className={cx(
                                "flex-1 relative",
                                orientation === "horizontal"
                                    ? "min-w-0"
                                    : "min-h-0",
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
                                    "flex items-center justify-center text-center transition-all duration-200 w-full rounded-md font-medium relative overflow-hidden",
                                    sizeClasses(),
                                    "cursor-pointer select-none",
                                    theme === "light"
                                        ? "text-[var(--luminx-light-text)]"
                                        : "text-[var(--luminx-dark-text)]",
                                    activeValue !== item.value && [
                                        theme === "light"
                                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)] hover:bg-[var(--luminx-light-background-hover)]"
                                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)] hover:bg-[var(--luminx-dark-background-hover)]"
                                    ],
                                    activeValue === item.value && [
                                        theme === "light"
                                            ? "bg-white text-[var(--luminx-light-text)] shadow-sm"
                                            : "bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)] shadow-sm"
                                    ],
                                    (disabled || item.disabled || readOnly) && [
                                        "cursor-not-allowed opacity-60"
                                    ],
                                    activeValue === item.value &&
                                        classNames?.activeItem,
                                    classNames?.label
                                )}
                            >
                                <div className="flex items-center justify-center gap-2 min-w-0 w-full">
                                    {item.icon && (
                                        <span
                                            className={cx(
                                                "flex-shrink-0",
                                                classNames?.icon
                                            )}
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                    <span
                                        className={cx(
                                            "truncate",
                                            orientation === "horizontal"
                                                ? "max-w-full"
                                                : "max-h-full",
                                            classNames?.innerLabel
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

SegmentedControl.displayName = "@luminx/core/SegmentedControl";
