import { forwardRef, useEffect, useState, useCallback } from "react";
import { CountdownProps, TimeRemaining } from "./types";
import { cx, useTheme } from "@luminx/core";

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0,
            expired: true
        };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
        total: difference,
        expired: false
    };
};

export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
    (
        {
            targetDate,
            format = "HH:MM:SS",
            customFormat,
            labels = {
                days: "days",
                hours: "hrs",
                minutes: "min",
                seconds: "sec"
            },
            showLabels = false,
            expiredMessage = "Event has started",
            onComplete,
            interval = 1000,
            separator = ":",
            className,
            classNames,
            showLeadingZeros = true,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();
        const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
            calculateTimeRemaining(targetDate)
        );
        const [hasCompleted, setHasCompleted] = useState(false);

        const updateCountdown = useCallback(() => {
            const newTimeRemaining = calculateTimeRemaining(targetDate);
            setTimeRemaining(newTimeRemaining);

            if (newTimeRemaining.expired && !hasCompleted) {
                setHasCompleted(true);
                onComplete?.();
            }
        }, [targetDate, onComplete, hasCompleted]);

        useEffect(() => {
            const timer = setInterval(updateCountdown, interval);
            return () => clearInterval(timer);
        }, [updateCountdown, interval]);

        const formatNumber = (num: number): string => {
            return showLeadingZeros
                ? num.toString().padStart(2, "0")
                : num.toString();
        };

        const renderCustomFormat = (): string => {
            if (!customFormat) return "";

            return customFormat
                .replace("{days}", formatNumber(timeRemaining.days))
                .replace("{hours}", formatNumber(timeRemaining.hours))
                .replace("{minutes}", formatNumber(timeRemaining.minutes))
                .replace("{seconds}", formatNumber(timeRemaining.seconds));
        };

        const renderTimeUnit = (
            value: number,
            label?: string,
            showSeparator?: boolean
        ) => (
            <span key={label} className="inline-flex items-center gap-1">
                <span className={cx("font-mono", classNames?.unit)}>
                    {formatNumber(value)}
                </span>
                {showLabels && label && (
                    <span
                        className={cx("text-sm opacity-75", classNames?.label)}
                    >
                        {label}
                    </span>
                )}
                {showSeparator && !showLabels && (
                    <span className={cx("opacity-50", classNames?.separator)}>
                        {separator}
                    </span>
                )}
            </span>
        );

        const renderCountdown = () => {
            if (timeRemaining.expired) {
                return (
                    <span className={cx("font-mono", classNames?.unit)}>
                        {expiredMessage}
                    </span>
                );
            }

            if (format === "custom" && customFormat) {
                return (
                    <span className={cx("font-mono", classNames?.unit)}>
                        {renderCustomFormat()}
                    </span>
                );
            }

            const units = [];

            switch (format) {
                case "DD:HH:MM:SS":
                    units.push(
                        renderTimeUnit(timeRemaining.days, labels.days, true),
                        renderTimeUnit(timeRemaining.hours, labels.hours, true),
                        renderTimeUnit(
                            timeRemaining.minutes,
                            labels.minutes,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.seconds,
                            labels.seconds,
                            false
                        )
                    );
                    break;
                case "HH:MM:SS":
                    units.push(
                        renderTimeUnit(
                            timeRemaining.hours + timeRemaining.days * 24,
                            labels.hours,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.minutes,
                            labels.minutes,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.seconds,
                            labels.seconds,
                            false
                        )
                    );
                    break;
                case "MM:SS":
                    units.push(
                        renderTimeUnit(
                            timeRemaining.minutes +
                                timeRemaining.hours * 60 +
                                timeRemaining.days * 24 * 60,
                            labels.minutes,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.seconds,
                            labels.seconds,
                            false
                        )
                    );
                    break;
                case "SS":
                    units.push(
                        renderTimeUnit(
                            timeRemaining.seconds +
                                timeRemaining.minutes * 60 +
                                timeRemaining.hours * 60 * 60 +
                                timeRemaining.days * 24 * 60 * 60,
                            labels.seconds,
                            false
                        )
                    );
                    break;
                default:
                    units.push(
                        renderTimeUnit(
                            timeRemaining.hours + timeRemaining.days * 24,
                            labels.hours,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.minutes,
                            labels.minutes,
                            true
                        ),
                        renderTimeUnit(
                            timeRemaining.seconds,
                            labels.seconds,
                            false
                        )
                    );
            }

            return (
                <div
                    className={cx(
                        "flex items-center",
                        showLabels ? "gap-4" : "gap-1"
                    )}
                >
                    {units}
                </div>
            );
        };

        const classes = cx(
            "inline-flex items-center justify-center",
            theme === "light"
                ? "text-[var(--luminx-light-text)]"
                : "text-[var(--luminx-dark-text)]",
            classNames?.container,
            className
        );

        return (
            <div ref={ref} className={classes} {...props}>
                {renderCountdown()}
            </div>
        );
    }
);

Countdown.displayName = "@luminx/core/Countdown";
