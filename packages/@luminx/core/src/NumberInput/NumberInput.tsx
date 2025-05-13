import React, { useState, useCallback } from "react";
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

    const [value, setValue] = useState<number>(
        props.value !== undefined ? Number(props.value) : defaultValue
    );

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

    const handleChange = useCallback(
        (valueString: string) => {
            let newValueString = valueString;

            if (valueString === "") {
                newValueString = "0";
            }

            const isValidChar = new RegExp(
                `^[0-9${allowNegative ? "-" : ""}${
                    allowDecimal ? "\\" + decimalSeparator : ""
                }${thousandSeparator ? "\\" + thousandSeparator : ""}${
                    prefix ? prefix : ""
                }${suffix ? suffix : ""}]*$`
            );

            if (!isValidChar.test(newValueString)) {
                return;
            }

            let newValue = parseValue(newValueString);

            if (min !== undefined && newValue < min) newValue = min;
            if (max !== undefined && newValue > max) newValue = max;

            if (precision !== undefined) {
                const factor = Math.pow(10, precision);
                newValue = Math.round(newValue * factor) / factor;
            }

            setValue(newValue);
            onChange?.(newValue);
        },
        [
            min,
            max,
            precision,
            onChange,
            allowDecimal,
            allowNegative,
            decimalSeparator,
            thousandSeparator,
            prefix,
            suffix,
            parseValue
        ]
    );

    const increment = useCallback(() => {
        const newValue = value + step;
        if (max !== undefined && newValue > max) return;
        setValue(newValue);
        onChange?.(newValue);
    }, [value, step, max, onChange]);

    const decrement = useCallback(() => {
        const newValue = value - step;
        if (min !== undefined && newValue < min) return;
        if (!allowNegative && newValue < 0) return;
        setValue(newValue);
        onChange?.(newValue);
    }, [value, step, min, onChange, allowNegative]);

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
                onClick={increment}
                disabled={isIncrementDisabled}
            >
                <IconChevronUp size={16} />
            </button>
            <button
                type="button"
                onClick={decrement}
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
            value={formatValue(value)}
            onChange={handleChange}
            rightSection={hideControls ? null : controlButtons}
            rightSectionPadding={0}
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
