import { useState, useRef, useEffect } from "react";
import { Input, InputProps, useTheme } from "@luminx/core";
import { DatePicker } from "../DatePicker";
import { useDatesContext } from "../DatesProvider";
import type { DateValue, DateRangeValue } from "../_shared/types";
import type { DateInputProps } from "./types";

export const DateInput = <T extends DateValue | DateRangeValue>({
    format,
    defaultValue = null as T,
    value,
    onChange,
    placeholder = "Select date",
    label,
    minDate,
    maxDate,
    allowDeselect = true,
    disabled = false,
    error,
    clearable = false,
    type = "default",
    dropdownWidth = "320px",
    className,
    classNames,
    ...others
}: DateInputProps<T>) => {
    const { theme, cx } = useTheme();

    const [opened, setOpened] = useState(false);
    const [localValue, setLocalValue] = useState<DateValue | DateRangeValue>(
        value ?? defaultValue
    );
    const { formatDate, parseDate } = useDatesContext();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputClick = () => {
        if (!disabled) {
            setOpened(true);
        }
    };

    const handleDateChange = (newValue: T) => {
        setLocalValue(newValue);
        onChange?.(newValue);
        if (type === "default") {
            setOpened(false);
        }
    };

    const handleInputChange = (inputValue: string) => {
        if (!inputValue) {
            const emptyValue =
                type === "range" ? ([null, null] as DateRangeValue) : null;
            setLocalValue(emptyValue);
            onChange?.(emptyValue as T);
            return;
        }

        if (type === "default") {
            const dateObj = parseDate(inputValue, format);
            if (dateObj) {
                setLocalValue(dateObj);
                onChange?.(dateObj as T);
            }
        }
    };

    const getDisplayValue = () => {
        if (!localValue) return "";

        if (type === "range" && Array.isArray(localValue)) {
            const [start, end] = localValue;
            if (!start && !end) return "";
            if (start && !end) return start ? formatDate(start, format) : "";
            if (!start && end) return end ? formatDate(end, format) : "";
            return `${start ? formatDate(start, format) : ""} - ${
                end ? formatDate(end, format) : ""
            }`;
        }

        return localValue ? formatDate(localValue as Date, format) : "";
    };

    const displayValue = getDisplayValue();

    const inputProps: Partial<InputProps> = {
        label,
        value: displayValue,
        onChange: handleInputChange,
        onClick: handleInputClick,
        placeholder,
        readOnly: true,
        disabled,
        error,
        ...others
    };

    return (
        <div
            className={cx("relative", classNames?.root, className)}
            ref={inputRef}
        >
            <Input {...inputProps} classNames={classNames} />

            {opened && (
                <div
                    ref={dropdownRef}
                    className={cx(
                        "absolute z-10 mt-1 p-2 rounded-md",
                        theme === "light"
                            ? "bg-[var(--luminx-light-background)]"
                            : "bg-[var(--luminx-dark-background)]",
                        classNames?.dropdown
                    )}
                    style={{ width: dropdownWidth }}
                >
                    {type === "range" ? (
                        <DatePicker
                            type="range"
                            value={localValue as DateRangeValue}
                            onChange={
                                handleDateChange as (
                                    value: DateRangeValue
                                ) => void
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    ) : (
                        <DatePicker
                            type="default"
                            value={localValue as DateValue}
                            onChange={
                                handleDateChange as (value: DateValue) => void
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
