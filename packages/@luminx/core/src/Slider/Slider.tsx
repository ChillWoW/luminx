import React, {
    forwardRef,
    useRef,
    useState,
    useEffect,
    useCallback
} from "react";
import { SliderProps } from "./types";
import { useTheme } from "../_theme";

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
    (
        {
            value,
            defaultValue = 0,
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

        const [currentValue, setCurrentValue] = useState(
            value !== undefined ? value : defaultValue
        );
        const [isDragging, setIsDragging] = useState(false);
        const [isHovered, setIsHovered] = useState(false);
        const trackRef = useRef<HTMLDivElement>(null);
        const thumbRef = useRef<HTMLDivElement>(null);

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
            (clientX: number) => {
                if (!trackRef.current) return;

                const { left, width } =
                    trackRef.current.getBoundingClientRect();
                const position = ((clientX - left) / width) * 100;
                const newValue = getValueFromPosition(
                    inverted ? 100 - position : position
                );

                if (newValue !== currentValue) {
                    setCurrentValue(newValue);
                    onChange?.(newValue);
                }
            },
            [currentValue, getValueFromPosition, inverted, onChange]
        );

        const handleTrackClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (disabled) return;

                if (event.target === thumbRef.current) return;

                event.preventDefault();
                event.stopPropagation();

                setIsDragging(true);
                updateValueFromPosition(event.clientX);

                const handleMouseMove = (e: MouseEvent) => {
                    updateValueFromPosition(e.clientX);
                };

                const handleMouseUp = () => {
                    setIsDragging(false);

                    if (!trackRef.current) return;
                    const { left, width } =
                        trackRef.current.getBoundingClientRect();
                    const position = ((event.clientX - left) / width) * 100;
                    const finalValue = getValueFromPosition(
                        inverted ? 100 - position : position
                    );
                    onChangeEnd?.(finalValue);

                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            },
            [
                disabled,
                updateValueFromPosition,
                getValueFromPosition,
                inverted,
                onChangeEnd
            ]
        );

        const handleMouseDown = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (disabled) return;

                event.preventDefault();
                event.stopPropagation();

                setIsDragging(true);
                updateValueFromPosition(event.clientX);

                const handleMouseMove = (e: MouseEvent) => {
                    updateValueFromPosition(e.clientX);
                };

                const handleMouseUp = () => {
                    setIsDragging(false);
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
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (disabled) return;

                let newValue = currentValue;

                switch (event.key) {
                    case "ArrowRight":
                    case "ArrowUp":
                        newValue = Math.min(currentValue + step, max);
                        event.preventDefault();
                        break;
                    case "ArrowLeft":
                    case "ArrowDown":
                        newValue = Math.max(currentValue - step, min);
                        event.preventDefault();
                        break;
                    case "Home":
                        newValue = min;
                        event.preventDefault();
                        break;
                    case "End":
                        newValue = max;
                        event.preventDefault();
                        break;
                    default:
                        return;
                }

                if (newValue !== currentValue) {
                    setCurrentValue(newValue);
                    onChange?.(newValue);
                    onChangeEnd?.(newValue);
                }
            },
            [currentValue, disabled, max, min, onChange, onChangeEnd, step]
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
        const position = getPositionFromValue(currentValue);
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
                            [inverted ? "right" : "left"]: 0,
                            width: `${position}%`,
                            backgroundColor: barColor
                        }}
                    />

                    {marks.map((mark) => {
                        const markPosition = getPositionFromValue(mark.value);

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
                                        "w-1.5 h-1.5 rounded-full bg-[var(--luminx-white)]",
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
                        ref={thumbRef}
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
                            isDragging && "z-20",
                            currentSize.thumb,
                            classNames?.thumb
                        )}
                        style={{
                            left: `${position}%`,
                            width: `${thumbSize}px`,
                            height: `${thumbSize}px`,
                            touchAction: "none"
                        }}
                        onMouseDown={handleMouseDown}
                        onKeyDown={handleKeyDown}
                        tabIndex={disabled ? -1 : 0}
                        role="slider"
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={currentValue}
                        aria-disabled={disabled}
                    >
                        {thumbChildren}
                    </div>

                    {label && showLabel && (
                        <div
                            className={cx(
                                "absolute -top-8 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap",
                                theme === "light"
                                    ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                                    : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                                "transition-opacity duration-200",
                                showLabel ? "opacity-100" : "opacity-0",
                                classNames?.label
                            )}
                            style={{ left: `${position}%` }}
                        >
                            {typeof label === "function"
                                ? label(currentValue)
                                : label}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Slider.displayName = "@luminx/core/Slider";
