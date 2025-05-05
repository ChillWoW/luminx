import React, { forwardRef, useState, useRef, useEffect } from "react";
import { SegmentedControlProps, SegmentedControlItem } from "./types";
import "../style.css";
import { cx, getRadius } from "../_theme";

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
            radius = "sm",
            fullWidth = false,
            color,
            disabled = false,
            readOnly = false,
            transitionDuration = 200,
            transitionTimingFunction = "ease",
            orientation = "horizontal",
            className,
            classNames,
            style,
            ...props
        },
        ref
    ) => {
        const [activeValue, setActiveValue] = useState(
            value ||
                defaultValue ||
                (typeof data[0] === "string" ? data[0] : data[0].value)
        );
        const [indicatorStyle, setIndicatorStyle] =
            useState<React.CSSProperties>({});
        const controlRefs = useRef<(HTMLLabelElement | null)[]>([]);
        const rootRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (value !== undefined) {
                setActiveValue(value);
            }
        }, [value]);

        useEffect(() => {
            const activeIndex = data.findIndex(
                (item) =>
                    (typeof item === "string" ? item : item.value) ===
                    activeValue
            );

            if (
                activeIndex >= 0 &&
                rootRef.current &&
                controlRefs.current[activeIndex]
            ) {
                const activeControl = controlRefs.current[activeIndex];
                if (!activeControl) return;

                const rootRect = rootRef.current.getBoundingClientRect();
                const activeRect = activeControl.getBoundingClientRect();

                const style: React.CSSProperties = {
                    transitionDuration: `${transitionDuration}ms`,
                    transitionTimingFunction: transitionTimingFunction
                };

                if (orientation === "horizontal") {
                    style.width = `${activeRect.width}px`;
                    style.height = `${activeRect.height}px`;
                    style.transform = `translateX(${
                        activeRect.left - rootRect.left
                    }px)`;
                } else {
                    style.width = `${activeRect.width}px`;
                    style.height = `${activeRect.height}px`;
                    style.transform = `translateY(${
                        activeRect.top - rootRect.top
                    }px)`;
                }

                if (color) {
                    style.backgroundColor = color;
                }

                setIndicatorStyle(style);
            }
        }, [
            activeValue,
            data,
            orientation,
            transitionDuration,
            transitionTimingFunction,
            color
        ]);

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
                    "inline-flex relative bg-[var(--lumin-background)] p-1 rounded-md",
                    orientation === "vertical" ? "flex-col" : "flex-row",
                    fullWidth && "w-full",
                    disabled && "opacity-60 cursor-not-allowed",
                    className,
                    classNames?.root
                )}
                style={{
                    ...getRadius(radius),
                    ...style
                }}
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
                                "flex-1 rounded-md text-[var(--lumin-text)] font-medium",
                                activeValue !== item.value &&
                                    "hover:text-[var(--lumin-text)] text-[var(--lumin-hint)]",
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
                                        "bg-[var(--lumin-secondary)]",
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
