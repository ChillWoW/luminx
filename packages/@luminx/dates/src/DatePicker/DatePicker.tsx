import React, { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useDatesContext } from "../DatesProvider";
import type {
    SinglePickerProps,
    MultiplePickerProps,
    RangePickerProps,
    DateValue,
    DateRangeValue,
    MultiDateValue
} from "../_shared/types";
import {
    areDatesEqual,
    isDateInRange,
    isDateInArray,
    isDateDisabled
} from "../_shared/dateUtils";
import { PickerControl } from "../_shared/PickerControl";
import { MonthPicker } from "../MonthPicker";
import { YearPicker } from "../YearPicker";
import { CalendarHeader } from "../_shared/CalendarHeader";
import { useTheme } from "@luminx/core";

function getDaysOfMonth(year: number, month: number): Date[] {
    const days: Date[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;

    for (let i = firstDayWeekday - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        days.push(date);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        days.push(new Date(year, month, i));
    }

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
            days.push(new Date(year, month + 1, i));
        }
    }

    return days;
}

export type DatePickerBaseProps = {
    monthLabelFormat?: string;
    yearLabelFormat?: string;
    weekdayFormat?: "dd" | "ddd" | "dddd";
};

export type DatePickerSingleProps = Omit<SinglePickerProps, "getControlProps"> &
    DatePickerBaseProps & {
        type?: "default";
        getDayProps?: SinglePickerProps["getControlProps"];
    };

export type DatePickerMultipleProps = Omit<
    MultiplePickerProps,
    "getControlProps"
> &
    DatePickerBaseProps & {
        type: "multiple";
        getDayProps?: MultiplePickerProps["getControlProps"];
    };

export type DatePickerRangeProps = Omit<RangePickerProps, "getControlProps"> &
    DatePickerBaseProps & {
        type: "range";
        getDayProps?: RangePickerProps["getControlProps"];
    };

export type DatePickerProps =
    | DatePickerSingleProps
    | DatePickerMultipleProps
    | DatePickerRangeProps;

export function DatePicker(props: DatePickerProps) {
    const {
        type = "default",
        defaultDate,
        date,
        onDateChange,
        value,
        onChange,
        minDate,
        maxDate,
        monthLabelFormat = "MMMM YYYY",
        yearLabelFormat = "YYYY",
        weekdayFormat = "dd",
        numberOfColumns = 1,
        getDayProps,
        ...others
    } = props;

    const { theme, cx } = useTheme();

    const allowDeselect =
        type === "default"
            ? (props as DatePickerSingleProps).allowDeselect
            : undefined;

    const allowSingleDateInRange =
        type === "range"
            ? (props as DatePickerRangeProps).allowSingleDateInRange
            : undefined;

    const { formatDate, getWeekdayNames, isWeekend } = useDatesContext();

    const defaultDateValue = defaultDate || new Date();
    const [activeDate, setActiveDate] = useState(date || defaultDateValue);
    const [viewMode, setViewMode] = useState<"days" | "months" | "years">(
        "days"
    );

    useEffect(() => {
        if (date) {
            setActiveDate(date);
        }
    }, [date]);

    const handleNextMonth = () => {
        const newDate = new Date(activeDate);
        newDate.setMonth(activeDate.getMonth() + 1);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(activeDate);
        newDate.setMonth(activeDate.getMonth() - 1);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handleMonthSelect = (month: DateValue) => {
        if (month instanceof Date) {
            const newDate = new Date(activeDate);
            newDate.setMonth(month.getMonth());
            newDate.setFullYear(month.getFullYear());
            setActiveDate(newDate);
            onDateChange?.(newDate);
            setViewMode("days");
        }
    };

    const handleYearSelect = (year: DateValue) => {
        if (year instanceof Date) {
            const newDate = new Date(activeDate);
            newDate.setFullYear(year.getFullYear());
            setActiveDate(newDate);
            onDateChange?.(newDate);
            setViewMode("months");
        }
    };

    const handleDaySelect = useCallback(
        (day: Date) => {
            if (type === "default") {
                const typedValue = value as DateValue;
                const shouldDeselect =
                    allowDeselect &&
                    typedValue instanceof Date &&
                    areDatesEqual(typedValue, day);

                const typedOnChange = onChange as
                    | ((date: DateValue) => void)
                    | undefined;
                typedOnChange?.(shouldDeselect ? null : day);
            } else if (type === "multiple") {
                const typedValue = value as MultiDateValue;
                const isSelected = isDateInArray(day, typedValue);
                const newValue = isSelected
                    ? typedValue.filter((date) => !areDatesEqual(date, day))
                    : [...typedValue, day];

                const typedOnChange = onChange as
                    | ((dates: MultiDateValue) => void)
                    | undefined;
                typedOnChange?.(newValue);
            } else if (type === "range") {
                const typedValue = value as DateRangeValue;
                const [start, end] = typedValue;
                const typedOnChange = onChange as
                    | ((range: DateRangeValue) => void)
                    | undefined;

                if (!start) {
                    typedOnChange?.([day, null]);
                } else if (!end) {
                    if (allowSingleDateInRange && areDatesEqual(day, start)) {
                        typedOnChange?.([start, start]);
                    } else {
                        const hasCorrectOrder = dayjs(start).isBefore(day);
                        typedOnChange?.(
                            hasCorrectOrder ? [start, day] : [day, start]
                        );
                    }
                } else {
                    typedOnChange?.([day, null]);
                }
            }

            if (!date) {
                setActiveDate(day);
            }
        },
        [type, value, onChange, allowDeselect, allowSingleDateInRange, date]
    );

    const isNextMonthDisabled =
        maxDate &&
        (activeDate.getFullYear() > maxDate.getFullYear() ||
            (activeDate.getFullYear() === maxDate.getFullYear() &&
                activeDate.getMonth() + 1 > maxDate.getMonth()));

    const isPreviousMonthDisabled =
        minDate &&
        (activeDate.getFullYear() < minDate.getFullYear() ||
            (activeDate.getFullYear() === minDate.getFullYear() &&
                activeDate.getMonth() - 1 < minDate.getMonth()));

    if (viewMode === "months") {
        return (
            <MonthPicker
                type="default"
                value={activeDate}
                onChange={handleMonthSelect}
                date={activeDate}
                minDate={minDate}
                maxDate={maxDate}
                numberOfColumns={numberOfColumns}
            />
        );
    }

    if (viewMode === "years") {
        return (
            <YearPicker
                type="default"
                value={activeDate}
                onChange={handleYearSelect}
                date={activeDate}
                minDate={minDate}
                maxDate={maxDate}
                numberOfColumns={numberOfColumns}
            />
        );
    }

    const columns = Array(numberOfColumns)
        .fill(0)
        .map((_, columnIndex) => {
            const columnMonth = (activeDate.getMonth() + columnIndex) % 12;
            const columnYear =
                activeDate.getFullYear() +
                Math.floor((activeDate.getMonth() + columnIndex) / 12);
            const columnDays = getDaysOfMonth(columnYear, columnMonth);

            const columnMonthLabel = formatDate(
                new Date(columnYear, columnMonth, 1),
                monthLabelFormat
            );

            const weekdayNames = getWeekdayNames(weekdayFormat);

            return (
                <div key={columnIndex} className="mb-4 last:mb-0">
                    <CalendarHeader
                        label={columnMonthLabel}
                        nextDisabled={
                            columnIndex === numberOfColumns - 1 &&
                            isNextMonthDisabled
                        }
                        previousDisabled={
                            columnIndex === 0 && isPreviousMonthDisabled
                        }
                        onNext={
                            columnIndex === numberOfColumns - 1
                                ? handleNextMonth
                                : undefined
                        }
                        onPrevious={
                            columnIndex === 0 ? handlePreviousMonth : undefined
                        }
                        onLabelClick={() => setViewMode("months")}
                    />
                    <div className="flex flex-col gap-1 mb-1">
                        <div className="flex gap-1">
                            {weekdayNames.map((weekday, i) => (
                                <div
                                    key={i}
                                    className={cx(
                                        "flex-1 text-center text-sm font-medium",
                                        theme === "light"
                                            ? "text-[var(--luminx-light-hint)]"
                                            : "text-[var(--luminx-dark-hint)]"
                                    )}
                                    style={{ minWidth: 0 }}
                                >
                                    {weekday}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {Array.from({
                            length: Math.ceil(columnDays.length / 7)
                        }).map((_, weekIndex) => {
                            const weekStart = weekIndex * 7;
                            const weekDays = columnDays.slice(
                                weekStart,
                                weekStart + 7
                            );

                            return (
                                <div key={weekIndex} className="flex gap-1">
                                    {weekDays.map((day, dayIndex) => {
                                        let selected = false;
                                        let inRange = false;
                                        let isRangeStart = false;
                                        let isRangeEnd = false;

                                        const weekend = isWeekend(day);

                                        if (
                                            type === "default" &&
                                            value instanceof Date
                                        ) {
                                            selected = areDatesEqual(
                                                day,
                                                value
                                            );
                                        } else if (
                                            type === "multiple" &&
                                            Array.isArray(value)
                                        ) {
                                            selected = isDateInArray(
                                                day,
                                                value as Date[]
                                            );
                                        } else if (
                                            type === "range" &&
                                            Array.isArray(value)
                                        ) {
                                            const rangeStatus = isDateInRange(
                                                day,
                                                value as DateRangeValue
                                            );
                                            selected =
                                                rangeStatus.isStart ||
                                                rangeStatus.isEnd;
                                            inRange = rangeStatus.inRange;
                                            isRangeStart = rangeStatus.isStart;
                                            isRangeEnd = rangeStatus.isEnd;
                                        }

                                        const disabled = isDateDisabled(day, {
                                            minDate,
                                            maxDate
                                        });

                                        const dayControlProps =
                                            getDayProps?.(day) || {};

                                        return (
                                            <div
                                                key={weekStart + dayIndex}
                                                className="flex-1"
                                                style={{ minWidth: 0 }}
                                            >
                                                <PickerControl
                                                    selected={selected}
                                                    inRange={inRange}
                                                    isRangeStart={isRangeStart}
                                                    isRangeEnd={isRangeEnd}
                                                    disabled={disabled}
                                                    weekend={weekend}
                                                    onClick={() =>
                                                        !disabled &&
                                                        handleDaySelect(day)
                                                    }
                                                    className="w-full"
                                                    {...dayControlProps}
                                                >
                                                    {day.getDate()}
                                                </PickerControl>
                                            </div>
                                        );
                                    })}
                                    {weekDays.length < 7 &&
                                        Array.from({
                                            length: 7 - weekDays.length
                                        }).map((_, emptyIndex) => (
                                            <div
                                                key={`empty-${emptyIndex}`}
                                                className="flex-1"
                                            />
                                        ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        });

    return <div {...others}>{columns}</div>;
}
