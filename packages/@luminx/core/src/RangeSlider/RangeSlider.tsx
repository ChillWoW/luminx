import React, {
    forwardRef,
    useRef,
    useState,
    useEffect,
    useCallback
} from "react";
import { RangeSliderProps, RangeSliderValue } from "./types";
import { useTheme } from "../_theme";

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
    (
        {
            value,
            defaultValue = { min: 0, max: 100 },
            min = 0,
            max = 100,
            step = 1,
            marks = [],
            snapToMarks = false,
            label = (val) => val.toString(),
            labelAlwaysOn = false,
            thumbSize = 14,
            thumbChildren,
            barColor,
            disabled = false,
            inverted = false,
            showLabelOnHover = true,
            minRange = 0,
            maxRange,
            allowCross = false,
            onChange,
            onChangeEnd,
            size = "md",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [currentValue, setCurrentValue] = useState<RangeSliderValue>(
            value !== undefined ? value : defaultValue
        );
        const [isDragging, setIsDragging] = useState<"min" | "max" | false>(
            false
        );
        const [isHovered, setIsHovered] = useState(false);
        const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(
            null
        );
        const trackRef = useRef<HTMLDivElement>(null);
        const minThumbRef = useRef<HTMLDivElement>(null);
        const maxThumbRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (value !== undefined) {
                setCurrentValue(value);
            }
        }, [value]);

        const getPositionFromValue = useCallback(
            (val: number) => {
                const normalizedValue = Math.min(Math.max(val, min), max);
                return ((normalizedValue - min) / (max - min)) * 100;
            },
            [min, max]
        );

        const getValueFromPosition = useCallback(
            (position: number) => {
                const clampedPosition = Math.min(Math.max(position, 0), 100);

                if (snapToMarks && marks.length > 0) {
                    const positionValue =
                        min + (clampedPosition / 100) * (max - min);

                    let closestMark = marks[0].value;
                    let minDistance = Math.abs(positionValue - closestMark);

                    for (const mark of marks) {
                        const distance = Math.abs(positionValue - mark.value);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestMark = mark.value;
                        }
                    }

                    return Math.min(Math.max(closestMark, min), max);
                }

                const stepsCount = (max - min) / step;
                const stepPercentage = 100 / stepsCount;
                const steps = Math.round(clampedPosition / stepPercentage);
                const steppedValue = min + steps * step;

                const precisionFactor = 1000000;
                const roundedValue =
                    Math.round(steppedValue * precisionFactor) /
                    precisionFactor;

                return Math.min(Math.max(roundedValue, min), max);
            },
            [min, max, step, snapToMarks, marks]
        );

        const updateValueFromPosition = useCallback(
            (clientX: number, thumbType: "min" | "max") => {
                if (!trackRef.current) return;

                const { left, width } =
                    trackRef.current.getBoundingClientRect();
                const position = ((clientX - left) / width) * 100;
                const newValue = getValueFromPosition(
                    inverted ? 100 - position : position
                );

                let updatedValue = { ...currentValue };

                if (thumbType === "min") {
                    updatedValue.min = newValue;

                    if (!allowCross && updatedValue.min > updatedValue.max) {
                        updatedValue.min = updatedValue.max;
                    }

                    if (
                        minRange > 0 &&
                        updatedValue.max - updatedValue.min < minRange
                    ) {
                        updatedValue.min = Math.max(
                            min,
                            updatedValue.max - minRange
                        );
                    }
                } else {
                    updatedValue.max = newValue;

                    if (!allowCross && updatedValue.max < updatedValue.min) {
                        updatedValue.max = updatedValue.min;
                    }

                    if (
                        minRange > 0 &&
                        updatedValue.max - updatedValue.min < minRange
                    ) {
                        updatedValue.max = Math.min(
                            max,
                            updatedValue.min + minRange
                        );
                    }
                }

                if (
                    maxRange &&
                    updatedValue.max - updatedValue.min > maxRange
                ) {
                    if (thumbType === "min") {
                        updatedValue.min = updatedValue.max - maxRange;
                    } else {
                        updatedValue.max = updatedValue.min + maxRange;
                    }
                }

                if (
                    updatedValue.min !== currentValue.min ||
                    updatedValue.max !== currentValue.max
                ) {
                    setCurrentValue(updatedValue);
                    onChange?.(updatedValue);
                }
            },
            [
                currentValue,
                getValueFromPosition,
                inverted,
                onChange,
                allowCross,
                minRange,
                maxRange,
                min,
                max
            ]
        );

        const handleTrackClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (disabled) return;

                if (
                    event.target === minThumbRef.current ||
                    event.target === maxThumbRef.current
                )
                    return;

                event.preventDefault();
                event.stopPropagation();

                if (!trackRef.current) return;

                const { left, width } =
                    trackRef.current.getBoundingClientRect();
                const position = ((event.clientX - left) / width) * 100;
                const clickValue = getValueFromPosition(
                    inverted ? 100 - position : position
                );

                const minDistance = Math.abs(clickValue - currentValue.min);
                const maxDistance = Math.abs(clickValue - currentValue.max);
                const closerThumb = minDistance <= maxDistance ? "min" : "max";

                setIsDragging(closerThumb);
                setActiveThumb(closerThumb);
                updateValueFromPosition(event.clientX, closerThumb);

                const handleMouseMove = (e: MouseEvent) => {
                    updateValueFromPosition(e.clientX, closerThumb);
                };

                const handleMouseUp = () => {
                    setIsDragging(false);
                    setActiveThumb(null);
                    onChangeEnd?.(currentValue);

                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            },
            [
                disabled,
                getValueFromPosition,
                inverted,
                currentValue,
                updateValueFromPosition,
                onChangeEnd
            ]
        );

        const handleMouseDown = useCallback(
            (
                event: React.MouseEvent<HTMLDivElement>,
                thumbType: "min" | "max"
            ) => {
                if (disabled) return;

                event.preventDefault();
                event.stopPropagation();

                setIsDragging(thumbType);
                setActiveThumb(thumbType);

                const handleMouseMove = (e: MouseEvent) => {
                    updateValueFromPosition(e.clientX, thumbType);
                };

                const handleMouseUp = () => {
                    setIsDragging(false);
                    setActiveThumb(null);
                    onChangeEnd?.(currentValue);

                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            },
            [disabled, updateValueFromPosition, onChangeEnd, currentValue]
        );

        const handleKeyDown = useCallback(
            (
                event: React.KeyboardEvent<HTMLDivElement>,
                thumbType: "min" | "max"
            ) => {
                if (disabled) return;

                let newValue = { ...currentValue };
                const currentThumbValue =
                    thumbType === "min" ? currentValue.min : currentValue.max;

                switch (event.key) {
                    case "ArrowRight":
                    case "ArrowUp":
                        if (thumbType === "min") {
                            newValue.min = Math.min(
                                currentThumbValue + step,
                                allowCross ? max : currentValue.max
                            );
                        } else {
                            newValue.max = Math.min(
                                currentThumbValue + step,
                                max
                            );
                        }
                        event.preventDefault();
                        break;
                    case "ArrowLeft":
                    case "ArrowDown":
                        if (thumbType === "min") {
                            newValue.min = Math.max(
                                currentThumbValue - step,
                                min
                            );
                        } else {
                            newValue.max = Math.max(
                                currentThumbValue - step,
                                allowCross ? min : currentValue.min
                            );
                        }
                        event.preventDefault();
                        break;
                    case "Home":
                        if (thumbType === "min") {
                            newValue.min = min;
                        } else {
                            newValue.max = allowCross
                                ? min
                                : Math.max(min, currentValue.min);
                        }
                        event.preventDefault();
                        break;
                    case "End":
                        if (thumbType === "min") {
                            newValue.min = allowCross
                                ? max
                                : Math.min(max, currentValue.max);
                        } else {
                            newValue.max = max;
                        }
                        event.preventDefault();
                        break;
                    default:
                        return;
                }

                if (minRange > 0) {
                    if (
                        thumbType === "min" &&
                        newValue.max - newValue.min < minRange
                    ) {
                        newValue.min = Math.max(min, newValue.max - minRange);
                    } else if (
                        thumbType === "max" &&
                        newValue.max - newValue.min < minRange
                    ) {
                        newValue.max = Math.min(max, newValue.min + minRange);
                    }
                }

                if (maxRange && newValue.max - newValue.min > maxRange) {
                    if (thumbType === "min") {
                        newValue.min = newValue.max - maxRange;
                    } else {
                        newValue.max = newValue.min + maxRange;
                    }
                }

                if (
                    newValue.min !== currentValue.min ||
                    newValue.max !== currentValue.max
                ) {
                    setCurrentValue(newValue);
                    onChange?.(newValue);
                    onChangeEnd?.(newValue);
                }
            },
            [
                currentValue,
                disabled,
                max,
                min,
                onChange,
                onChangeEnd,
                step,
                allowCross,
                minRange,
                maxRange
            ]
        );

        const sizeClass = () => {
            const styles = {
                xs: { track: "h-1", thumb: "h-3 w-3" },
                sm: { track: "h-1.5", thumb: "h-4 w-4" },
                md: { track: "h-2", thumb: "h-5 w-5" },
                lg: { track: "h-3", thumb: "h-6 w-6" },
                xl: { track: "h-4", thumb: "h-7 w-7" }
            };
            return styles[size];
        };

        const currentSize = sizeClass();
        const minPosition = getPositionFromValue(currentValue.min);
        const maxPosition = getPositionFromValue(currentValue.max);
        const showLabel =
            labelAlwaysOn || isDragging || (isHovered && showLabelOnHover);

        return (
            <div
                className={cx(
                    "relative w-full py-4",
                    disabled && "opacity-60 cursor-not-allowed",
                    className,
                    classNames?.root
                )}
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <div
                    ref={trackRef}
                    className={cx(
                        "relative w-full rounded-full",
                        currentSize.track,
                        "cursor-pointer",
                        disabled && "cursor-not-allowed",
                        classNames?.trackContainer
                    )}
                    onMouseDown={disabled ? undefined : handleTrackClick}
                >
                    <div
                        className={cx(
                            "absolute inset-0 rounded-full",
                            theme === "light"
                                ? "bg-[var(--luminx-light-background)]"
                                : "bg-[var(--luminx-dark-background)]",
                            classNames?.track
                        )}
                    />

                    <div
                        className={cx(
                            "absolute top-0 bottom-0 rounded-full",
                            "bg-[var(--luminx-primary)]",
                            classNames?.bar
                        )}
                        style={{
                            left: `${Math.min(minPosition, maxPosition)}%`,
                            width: `${Math.abs(maxPosition - minPosition)}%`,
                            backgroundColor: barColor
                        }}
                    />

                    {marks.map((mark) => {
                        const markPosition = getPositionFromValue(mark.value);
                        const isInRange =
                            mark.value >=
                                Math.min(currentValue.min, currentValue.max) &&
                            mark.value <=
                                Math.max(currentValue.min, currentValue.max);

                        const isAtStart = markPosition <= 1;
                        const isAtEnd = markPosition >= 99;

                        let translateClass = "-translate-x-1/2";
                        let leftPosition = `${markPosition}%`;

                        if (isAtStart) {
                            translateClass = "translate-x-0";
                            leftPosition = "1px";
                        } else if (isAtEnd) {
                            translateClass = "-translate-x-full";
                            leftPosition = "calc(100% - 1px)";
                        }

                        return (
                            <div
                                key={mark.value}
                                className={cx(
                                    "absolute top-1/2 -translate-y-1/2",
                                    translateClass,
                                    classNames?.markWrapper
                                )}
                                style={{ left: leftPosition }}
                            >
                                <div
                                    className={cx(
                                        "w-1.5 h-1.5 rounded-full",
                                        isInRange
                                            ? "bg-[var(--luminx-primary)]"
                                            : "bg-[var(--luminx-white)]",
                                        "shadow-sm z-5",
                                        classNames?.mark
                                    )}
                                />
                                {mark.label && (
                                    <div
                                        className={cx(
                                            "absolute top-4 text-xs",
                                            theme === "light"
                                                ? "text-[var(--luminx-light-text)]"
                                                : "text-[var(--luminx-dark-text)]",
                                            isAtStart
                                                ? "translate-x-0"
                                                : isAtEnd
                                                ? "-translate-x-full"
                                                : "-translate-x-1/2",
                                            classNames?.markLabel
                                        )}
                                    >
                                        {mark.label}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div
                        ref={minThumbRef}
                        className={cx(
                            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
                            "rounded-full",
                            theme === "light"
                                ? "bg-[var(--luminx-white)] ring-[var(--luminx-primary)]"
                                : "bg-[var(--luminx-primary)] ring-[var(--luminx-white)]",
                            "ring-2 ring-inset",
                            thumbChildren && "flex items-center justify-center",
                            "cursor-grab active:cursor-grabbing",
                            "transition-shadow duration-200",
                            !disabled && "hover:shadow-md focus:shadow-md",
                            disabled && "cursor-not-allowed",
                            "z-10",
                            (isDragging === "min" || activeThumb === "min") &&
                                "z-20",
                            currentSize.thumb,
                            classNames?.thumb
                        )}
                        style={{
                            left: `${minPosition}%`,
                            width: `${thumbSize}px`,
                            height: `${thumbSize}px`,
                            touchAction: "none"
                        }}
                        onMouseDown={(e) => handleMouseDown(e, "min")}
                        onKeyDown={(e) => handleKeyDown(e, "min")}
                        tabIndex={disabled ? -1 : 0}
                        role="slider"
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={currentValue.min}
                        aria-disabled={disabled}
                        aria-label="Range minimum"
                    >
                        {thumbChildren}
                    </div>

                    <div
                        ref={maxThumbRef}
                        className={cx(
                            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
                            "rounded-full",
                            theme === "light"
                                ? "bg-[var(--luminx-white)] ring-[var(--luminx-primary)]"
                                : "bg-[var(--luminx-primary)] ring-[var(--luminx-white)]",
                            "ring-2 ring-inset",
                            thumbChildren && "flex items-center justify-center",
                            "cursor-grab active:cursor-grabbing",
                            "transition-shadow duration-200",
                            !disabled && "hover:shadow-md focus:shadow-md",
                            disabled && "cursor-not-allowed",
                            "z-10",
                            (isDragging === "max" || activeThumb === "max") &&
                                "z-20",
                            currentSize.thumb,
                            classNames?.thumb
                        )}
                        style={{
                            left: `${maxPosition}%`,
                            width: `${thumbSize}px`,
                            height: `${thumbSize}px`,
                            touchAction: "none"
                        }}
                        onMouseDown={(e) => handleMouseDown(e, "max")}
                        onKeyDown={(e) => handleKeyDown(e, "max")}
                        tabIndex={disabled ? -1 : 0}
                        role="slider"
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={currentValue.max}
                        aria-disabled={disabled}
                        aria-label="Range maximum"
                    >
                        {thumbChildren}
                    </div>

                    {label && showLabel && (
                        <>
                            <div
                                className={cx(
                                    "absolute -top-8 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap",
                                    theme === "light"
                                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                                    "transition-opacity duration-200",
                                    showLabel &&
                                        (isDragging === "min" ||
                                            activeThumb === "min" ||
                                            labelAlwaysOn)
                                        ? "opacity-100"
                                        : "opacity-0",
                                    classNames?.label
                                )}
                                style={{ left: `${minPosition}%` }}
                            >
                                {typeof label === "function"
                                    ? label(currentValue.min)
                                    : label}
                            </div>
                            <div
                                className={cx(
                                    "absolute -top-8 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap",
                                    theme === "light"
                                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                                    "transition-opacity duration-200",
                                    showLabel &&
                                        (isDragging === "max" ||
                                            activeThumb === "max" ||
                                            labelAlwaysOn)
                                        ? "opacity-100"
                                        : "opacity-0",
                                    classNames?.label
                                )}
                                style={{ left: `${maxPosition}%` }}
                            >
                                {typeof label === "function"
                                    ? label(currentValue.max)
                                    : label}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
);

RangeSlider.displayName = "@luminx/core/RangeSlider";
