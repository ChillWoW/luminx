import React, { forwardRef, useState, useCallback, useRef } from "react";
import { RatingProps } from "./types";
import { useTheme } from "../_theme";

const StarIcon = ({
    filled = false,
    size = 20
}: {
    filled?: boolean;
    size?: number;
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
);

const Rating = forwardRef<HTMLDivElement, RatingProps>(
    (
        {
            value,
            defaultValue = null,
            onChange,
            onChangeActive,
            max = 5,

            size = "md",
            readOnly = false,
            disabled = false,
            withHover = false,
            highlightSelectedOnly = false,
            icon,
            emptyIcon,
            getLabelText = (value: number) =>
                `${value} Star${value !== 1 ? "s" : ""}`,
            name,
            classNames,
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [uncontrolledValue, setUncontrolledValue] = useState<
            number | null
        >(defaultValue);
        const [hoverValue, setHoverValue] = useState<number>(-1);
        const [focused, setFocused] = useState<number>(-1);
        const containerRef = useRef<HTMLDivElement>(null);

        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : uncontrolledValue;

        const handleChange = useCallback(
            (newValue: number | null) => {
                if (readOnly || disabled) return;

                if (!isControlled) {
                    setUncontrolledValue(newValue);
                }
                onChange?.(newValue);
            },
            [isControlled, onChange, readOnly, disabled]
        );

        const handleHover = useCallback(
            (newHover: number) => {
                if (readOnly || disabled || !withHover) return;
                setHoverValue(newHover);
                onChangeActive?.(newHover);
            },
            [readOnly, disabled, withHover, onChangeActive]
        );

        const handleMouseLeave = useCallback(() => {
            if (readOnly || disabled) return;
            setHoverValue(-1);
            onChangeActive?.(-1);
        }, [readOnly, disabled, onChangeActive]);

        const getSizeClasses = () => {
            const sizes = {
                xs: "text-sm",
                sm: "text-base",
                md: "text-lg",
                lg: "text-xl",
                xl: "text-2xl"
            };
            return sizes[size] || sizes.md;
        };

        const getItemValue = (index: number) => {
            return index + 1;
        };

        const getDisplayValue = () => {
            if (withHover && hoverValue !== -1) return hoverValue;
            return currentValue || 0;
        };

        const isItemActive = (index: number) => {
            const displayValue = getDisplayValue();
            if (highlightSelectedOnly) {
                return Math.ceil(displayValue) === index + 1;
            }
            return displayValue > index;
        };

        const isItemPartiallyFilled = (index: number) => {
            if (highlightSelectedOnly) return false;
            const displayValue = getDisplayValue();
            return displayValue > index && displayValue < index + 1;
        };

        const getPartialFillPercentage = (index: number) => {
            const displayValue = getDisplayValue();
            const fractionalPart = displayValue - index;
            return Math.min(Math.max(fractionalPart, 0), 1) * 100;
        };

        const renderIcon = (index: number, filled: boolean) => {
            const iconSize = {
                xs: 16,
                sm: 18,
                md: 20,
                lg: 24,
                xl: 28
            }[size];

            if (filled && icon) {
                return (
                    <div
                        style={{
                            width: iconSize,
                            height: iconSize,
                            fontSize: iconSize
                        }}
                    >
                        {icon}
                    </div>
                );
            }
            if (!filled && emptyIcon) {
                return (
                    <div
                        style={{
                            width: iconSize,
                            height: iconSize,
                            fontSize: iconSize
                        }}
                    >
                        {emptyIcon}
                    </div>
                );
            }
            if (icon && !emptyIcon) {
                return (
                    <div
                        style={{
                            width: iconSize,
                            height: iconSize,
                            fontSize: iconSize
                        }}
                    >
                        {icon}
                    </div>
                );
            }

            return <StarIcon filled={filled} size={iconSize} />;
        };

        const items = Array.from({ length: max }, (_, index) => {
            const isActive = isItemActive(index);
            const isPartial = isItemPartiallyFilled(index);
            const isHovered = withHover && hoverValue > index;
            const isFocused = focused === index;

            return (
                <div
                    key={index}
                    className={cx(
                        "relative inline-flex cursor-pointer transition-all duration-150",
                        readOnly && "cursor-default",
                        disabled && "cursor-not-allowed opacity-50",
                        classNames?.item
                    )}
                    onClick={() => {
                        if (readOnly || disabled) return;
                        const newValue = getItemValue(index);
                        handleChange(
                            currentValue === newValue ? null : newValue
                        );
                    }}
                    onMouseEnter={() => handleHover(index + 1)}
                >
                    <input
                        type="radio"
                        name={name}
                        value={index + 1}
                        checked={Math.ceil(currentValue || 0) === index + 1}
                        onChange={() => handleChange(index + 1)}
                        onFocus={() => setFocused(index)}
                        onBlur={() => setFocused(-1)}
                        disabled={disabled}
                        readOnly={readOnly}
                        aria-label={getLabelText(index + 1)}
                        className={cx(
                            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                            readOnly && "cursor-default",
                            disabled && "cursor-not-allowed",
                            classNames?.input
                        )}
                    />

                    <div
                        className={cx(
                            "relative flex items-center justify-center transition-all duration-150",
                            theme === "light"
                                ? "text-gray-400 hover:text-yellow-400"
                                : "text-gray-500 hover:text-yellow-400",
                            (isActive || isHovered) && "text-yellow-400",
                            isFocused &&
                                "ring-2 ring-blue-500 ring-offset-1 rounded",
                            disabled && "text-gray-300",
                            classNames?.icon
                        )}
                    >
                        <div
                            className={cx(
                                "flex items-center justify-center",
                                classNames?.itemEmpty
                            )}
                        >
                            {renderIcon(index, false)}
                        </div>

                        <div
                            className={cx(
                                "absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-150 text-yellow-400",
                                classNames?.itemFilled
                            )}
                            style={{
                                width: isPartial
                                    ? `${getPartialFillPercentage(index)}%`
                                    : isActive || isHovered
                                    ? "100%"
                                    : "0%",
                                clipPath: isPartial
                                    ? `inset(0 ${
                                          100 - getPartialFillPercentage(index)
                                      }% 0 0)`
                                    : undefined
                            }}
                        >
                            {renderIcon(index, true)}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div
                ref={ref}
                className={cx(
                    "inline-flex items-center gap-1",
                    getSizeClasses(),
                    readOnly && "cursor-default",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.root,
                    className
                )}
                onMouseLeave={handleMouseLeave}
                role={readOnly ? "img" : "radiogroup"}
                aria-label={
                    readOnly ? getLabelText(currentValue || 0) : undefined
                }
                {...props}
            >
                {items}
            </div>
        );
    }
);

Rating.displayName = "@luminx/core/Rating";

export { Rating };
