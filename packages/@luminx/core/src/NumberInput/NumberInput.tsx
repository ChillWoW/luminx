import React, { useState, useCallback, useRef } from "react";
import { Input } from "../Input/Input";
import { NumberInputProps } from "./types";
import { useTheme } from "../_theme";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export const NumberInput = ({
    min,
    max,
    step = 1,
    precision = 0,
    defaultValue = 0,
    hideControls,
    onChange,
    disabled,
    classNames,
    allowDecimal = false,
    allowNegative = true,
    decimalScale,
    decimalSeparator = ".",
    thousandSeparator = ",",
    prefix,
    suffix,
    ...props
}: NumberInputProps) => {
    const { theme, cx } = useTheme();

    const incrementTimerRef = useRef<NodeJS.Timeout | null>(null);
    const decrementTimerRef = useRef<NodeJS.Timeout | null>(null);
    const initialDelayRef = useRef<NodeJS.Timeout | null>(null);

    const [value, setValue] = useState<number>(
        props.value !== undefined ? Number(props.value) : defaultValue
    );

    const [displayValue, setDisplayValue] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const formatValue = useCallback(
        (num: number): string => {
            let formatted = String(num);

            const effectiveDecimalScale =
                decimalScale !== undefined ? decimalScale : precision;

            if (effectiveDecimalScale !== undefined) {
                const factor = Math.pow(10, effectiveDecimalScale);
                formatted = (Math.round(num * factor) / factor).toFixed(
                    effectiveDecimalScale
                );
            }

            if (thousandSeparator) {
                const parts = formatted.split(decimalSeparator);
                parts[0] = parts[0].replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    thousandSeparator
                );
                formatted = parts.join(decimalSeparator);
            }

            if (decimalSeparator !== ".") {
                formatted = formatted.replace(".", decimalSeparator);
            }

            if (prefix) formatted = `${prefix}${formatted}`;
            if (suffix) formatted = `${formatted}${suffix}`;

            return formatted;
        },
        [
            precision,
            decimalScale,
            decimalSeparator,
            thousandSeparator,
            prefix,
            suffix
        ]
    );

    const parseValue = useCallback(
        (valueString: string): number => {
            let parsed = valueString;
            if (prefix) parsed = parsed.replace(prefix, "");
            if (suffix) parsed = parsed.replace(suffix, "");

            if (decimalSeparator !== ".") {
                parsed = parsed.replace(decimalSeparator, ".");
            }

            if (thousandSeparator) {
                parsed = parsed.replace(
                    new RegExp(`\\${thousandSeparator}`, "g"),
                    ""
                );
            }

            return Number(parsed);
        },
        [prefix, suffix, decimalSeparator, thousandSeparator]
    );

    const clampValue = useCallback(
        (val: number): number => {
            let clampedValue = val;
            if (min !== undefined && clampedValue < min) clampedValue = min;
            if (max !== undefined && clampedValue > max) clampedValue = max;
            return clampedValue;
        },
        [min, max]
    );

    const applyPrecision = useCallback(
        (val: number): number => {
            if (precision !== undefined) {
                const factor = Math.pow(10, precision);
                return Math.round(val * factor) / factor;
            }
            return val;
        },
        [precision]
    );

    const commitValue = useCallback(
        (rawValue: number) => {
            const clampedValue = clampValue(rawValue);
            const finalValue = applyPrecision(clampedValue);
            setValue(finalValue);
            setDisplayValue(null);
            setIsTyping(false);
            onChange?.(finalValue);
        },
        [clampValue, applyPrecision, onChange]
    );

    const handleChange = useCallback(
        (valueString: string) => {
            setIsTyping(true);

            if (valueString === "") {
                setValue(0);
                setDisplayValue(null);
                setIsTyping(false);
                onChange?.(0);
                return;
            }

            const isValidChar = new RegExp(
                `^[0-9${allowNegative ? "\\-" : ""}${
                    allowDecimal ? "\\" + decimalSeparator : ""
                }${thousandSeparator ? "\\" + thousandSeparator : ""}${
                    prefix ? prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : ""
                }${
                    suffix ? suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : ""
                }]*$`
            );

            if (!isValidChar.test(valueString)) {
                return;
            }

            if (allowDecimal && valueString === decimalSeparator) {
                setValue(0);
                setDisplayValue(`0${decimalSeparator}`);
                onChange?.(0);
                return;
            }

            if (allowNegative && valueString === "-") {
                setValue(0);
                setDisplayValue("-");
                onChange?.(0);
                return;
            }

            if (allowDecimal && valueString.includes(decimalSeparator)) {
                setDisplayValue(valueString);

                if (valueString.endsWith(decimalSeparator)) {
                    const baseValue = parseValue(valueString.slice(0, -1));
                    if (!isNaN(baseValue)) {
                        setValue(baseValue);
                        onChange?.(baseValue);
                    }
                    return;
                }

                const parsedValue = parseValue(valueString);
                if (!isNaN(parsedValue)) {
                    setValue(parsedValue);
                    onChange?.(parsedValue);
                }
                return;
            }

            setDisplayValue(null);
            const newValue = parseValue(valueString);

            if (isNaN(newValue)) {
                return;
            }

            setValue(newValue);
            onChange?.(newValue);
        },
        [
            allowDecimal,
            allowNegative,
            decimalSeparator,
            thousandSeparator,
            prefix,
            suffix,
            parseValue,
            onChange
        ]
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            if (isTyping) {
                commitValue(value);
            }
            props.onBlur?.(event);
        },
        [isTyping, value, commitValue, props.onBlur]
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && isTyping) {
                commitValue(value);
                event.currentTarget.blur();
            }
            props.onKeyDown?.(event);
        },
        [isTyping, value, commitValue, props.onKeyDown]
    );

    const increment = useCallback(() => {
        setValue((currentValue) => {
            const newValue = currentValue + step;
            const clampedValue = clampValue(newValue);
            if (clampedValue === currentValue) return currentValue;
            setDisplayValue(null);
            setIsTyping(false);
            onChange?.(clampedValue);
            return clampedValue;
        });
    }, [step, clampValue, onChange]);

    const decrement = useCallback(() => {
        setValue((currentValue) => {
            const newValue = currentValue - step;
            if (!allowNegative && newValue < 0) return currentValue;
            const clampedValue = clampValue(newValue);
            if (clampedValue === currentValue) return currentValue;
            setDisplayValue(null);
            setIsTyping(false);
            onChange?.(clampedValue);
            return clampedValue;
        });
    }, [step, allowNegative, clampValue, onChange]);

    const clearTimers = useCallback(() => {
        if (incrementTimerRef.current) {
            clearInterval(incrementTimerRef.current);
            incrementTimerRef.current = null;
        }
        if (decrementTimerRef.current) {
            clearInterval(decrementTimerRef.current);
            decrementTimerRef.current = null;
        }
        if (initialDelayRef.current) {
            clearTimeout(initialDelayRef.current);
            initialDelayRef.current = null;
        }
    }, []);

    const handleIncrementMouseDown = useCallback(() => {
        if (disabled) return;

        increment();

        initialDelayRef.current = setTimeout(() => {
            incrementTimerRef.current = setInterval(() => {
                setValue((currentValue) => {
                    if (max !== undefined && currentValue >= max)
                        return currentValue;
                    const newValue = currentValue + step;
                    const clampedValue = clampValue(newValue);
                    if (clampedValue === currentValue) return currentValue;
                    setDisplayValue(null);
                    setIsTyping(false);
                    onChange?.(clampedValue);
                    return clampedValue;
                });
            }, 100);
        }, 300);
    }, [disabled, max, step, clampValue, onChange, increment]);

    const handleDecrementMouseDown = useCallback(() => {
        if (disabled) return;

        decrement();

        initialDelayRef.current = setTimeout(() => {
            decrementTimerRef.current = setInterval(() => {
                setValue((currentValue) => {
                    if (
                        (min !== undefined && currentValue <= min) ||
                        (!allowNegative && currentValue - step < 0)
                    ) {
                        return currentValue;
                    }
                    const newValue = currentValue - step;
                    const clampedValue = clampValue(newValue);
                    if (clampedValue === currentValue) return currentValue;
                    setDisplayValue(null);
                    setIsTyping(false);
                    onChange?.(clampedValue);
                    return clampedValue;
                });
            }, 100);
        }, 300);
    }, [disabled, min, allowNegative, step, clampValue, onChange, decrement]);

    const handleMouseUp = useCallback(() => {
        clearTimers();
    }, [clearTimers]);

    const handleMouseLeave = useCallback(() => {
        clearTimers();
    }, [clearTimers]);

    React.useEffect(() => {
        return () => {
            clearTimers();
        };
    }, [clearTimers]);

    const isIncrementDisabled = disabled || (max !== undefined && value >= max);
    const isDecrementDisabled =
        disabled ||
        (min !== undefined && value <= min) ||
        (!allowNegative && value - step < 0);

    const controlButtons = (
        <div
            className={cx(
                "inline-flex flex-col h-full border-l",
                theme === "light"
                    ? "border-[var(--luminx-light-border)]"
                    : "border-[var(--luminx-dark-border)]",
                classNames?.controlButtons
            )}
        >
            <button
                type="button"
                className={cx(
                    "w-7 h-[20px] flex items-center justify-center border-b",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                        : "border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]",
                    isIncrementDisabled && "opacity-60 cursor-not-allowed",
                    !isIncrementDisabled &&
                        "hover:bg-[var(--luminx-primary-light)]",
                    classNames?.incrementButton
                )}
                onMouseDown={handleIncrementMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                disabled={isIncrementDisabled}
            >
                <IconChevronUp size={16} />
            </button>
            <button
                type="button"
                onMouseDown={handleDecrementMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                disabled={isDecrementDisabled}
                className={cx(
                    "w-7 h-[20px] flex items-center justify-center",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                        : "border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]",
                    isDecrementDisabled && "opacity-60 cursor-not-allowed",
                    !isDecrementDisabled &&
                        "hover:bg-[var(--luminx-primary-light)]",
                    classNames?.decrementButton
                )}
            >
                <IconChevronDown size={16} />
            </button>
        </div>
    );

    return (
        <Input
            type="text"
            inputMode={allowDecimal ? "decimal" : "numeric"}
            value={displayValue !== null ? displayValue : formatValue(value)}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            rightSection={hideControls ? null : controlButtons}
            disabled={disabled}
            classNames={{
                rightSection: "p-0",
                ...classNames
            }}
            {...props}
        />
    );
};

NumberInput.displayName = "@luminx/core/NumberInput";
