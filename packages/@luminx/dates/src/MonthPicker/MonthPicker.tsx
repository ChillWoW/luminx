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
import { PickerGrid } from "../_shared/PickerGrid";
import { PickerControl } from "../_shared/PickerControl";
import { YearPicker } from "../YearPicker";
import { CalendarHeader } from "../_shared/CalendarHeader";

function getMonthsData(year: number): Date[] {
    const months: Date[] = [];

    for (let i = 0; i < 12; i++) {
        months.push(new Date(year, i, 1));
    }

    return months;
}

export type MonthPickerBaseProps = {
    monthsListFormat?: string;
    yearLabelFormat?: string;
};

export type MonthPickerSingleProps = Omit<
    SinglePickerProps,
    "getControlProps"
> &
    MonthPickerBaseProps & {
        type?: "default";
        getMonthControlProps?: SinglePickerProps["getControlProps"];
    };

export type MonthPickerMultipleProps = Omit<
    MultiplePickerProps,
    "getControlProps"
> &
    MonthPickerBaseProps & {
        type: "multiple";
        getMonthControlProps?: MultiplePickerProps["getControlProps"];
    };

export type MonthPickerRangeProps = Omit<RangePickerProps, "getControlProps"> &
    MonthPickerBaseProps & {
        type: "range";
        getMonthControlProps?: RangePickerProps["getControlProps"];
    };

export type MonthPickerProps =
    | MonthPickerSingleProps
    | MonthPickerMultipleProps
    | MonthPickerRangeProps;

export function MonthPicker(props: MonthPickerProps) {
    const {
        type = "default",
        defaultDate,
        date,
        onDateChange,
        value,
        onChange,
        minDate,
        maxDate,
        monthsListFormat = "MMM",
        yearLabelFormat = "YYYY",
        numberOfColumns = 1,
        getMonthControlProps,
        ...others
    } = props;

    const allowDeselect =
        type === "default"
            ? (props as MonthPickerSingleProps).allowDeselect
            : undefined;

    const allowSingleDateInRange =
        type === "range"
            ? (props as MonthPickerRangeProps).allowSingleDateInRange
            : undefined;

    const defaultDateValue = defaultDate || new Date();
    const [activeDate, setActiveDate] = useState(date || defaultDateValue);
    const [showYearPicker, setShowYearPicker] = useState(false);

    useEffect(() => {
        if (date) {
            setActiveDate(date);
        }
    }, [date]);

    const handleNextYear = () => {
        const newDate = new Date(activeDate);
        newDate.setFullYear(activeDate.getFullYear() + 1);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handlePreviousYear = () => {
        const newDate = new Date(activeDate);
        newDate.setFullYear(activeDate.getFullYear() - 1);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handleYearSelect = (year: DateValue) => {
        if (year instanceof Date) {
            const yearNum = year.getFullYear();

            const findValidDateInYear = (): Date => {
                let targetMonth = activeDate.getMonth();
                let targetDay = activeDate.getDate();

                let targetDate = new Date(yearNum, targetMonth, targetDay);

                if (minDate || maxDate) {
                    if (minDate && targetDate < minDate) {
                        if (minDate.getFullYear() === yearNum) {
                            targetDate = new Date(minDate);
                        } else {
                            targetDate = new Date(yearNum, 0, 1);
                        }
                    } else if (maxDate && targetDate > maxDate) {
                        if (maxDate.getFullYear() === yearNum) {
                            targetDate = new Date(maxDate);
                        } else {
                            targetDate = new Date(yearNum, 11, 31);
                        }
                    }
                }

                return targetDate;
            };

            const validDate = findValidDateInYear();
            setActiveDate(validDate);
            onDateChange?.(validDate);
            setShowYearPicker(false);
        }
    };

    const handleMonthSelect = useCallback(
        (month: Date) => {
            const findValidDateInMonth = (selectedMonth: Date): Date => {
                const yearNum = selectedMonth.getFullYear();
                const monthNum = selectedMonth.getMonth();

                let targetDay = 1;

                if (type === "default" && value instanceof Date) {
                    targetDay = value.getDate();
                } else if (activeDate) {
                    targetDay = activeDate.getDate();
                }

                const daysInMonth = new Date(
                    yearNum,
                    monthNum + 1,
                    0
                ).getDate();
                if (targetDay > daysInMonth) {
                    targetDay = daysInMonth;
                }

                let targetDate = new Date(yearNum, monthNum, targetDay);

                if (minDate || maxDate) {
                    if (minDate && targetDate < minDate) {
                        if (
                            minDate.getFullYear() === yearNum &&
                            minDate.getMonth() === monthNum
                        ) {
                            targetDate = new Date(minDate);
                        } else {
                            targetDate = new Date(yearNum, monthNum, 1);
                        }
                    } else if (maxDate && targetDate > maxDate) {
                        if (
                            maxDate.getFullYear() === yearNum &&
                            maxDate.getMonth() === monthNum
                        ) {
                            targetDate = new Date(maxDate);
                        } else {
                            targetDate = new Date(yearNum, monthNum + 1, 0);
                        }
                    }
                }

                return targetDate;
            };

            const validDate = findValidDateInMonth(month);

            if (type === "default") {
                const typedValue = value as DateValue;
                const shouldDeselect =
                    allowDeselect &&
                    typedValue instanceof Date &&
                    areDatesEqual(typedValue, validDate);

                const typedOnChange = onChange as
                    | ((date: DateValue) => void)
                    | undefined;
                typedOnChange?.(shouldDeselect ? null : validDate);
            } else if (type === "multiple") {
                const typedValue = value as MultiDateValue;
                const isSelected = isDateInArray(validDate, typedValue);
                const newValue = isSelected
                    ? typedValue.filter(
                          (date) => !areDatesEqual(date, validDate)
                      )
                    : [...typedValue, validDate];

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
                    typedOnChange?.([validDate, null]);
                } else if (!end) {
                    if (
                        allowSingleDateInRange &&
                        dayjs(validDate).isSame(start, "month") &&
                        dayjs(validDate).isSame(start, "year")
                    ) {
                        typedOnChange?.([start, start]);
                    } else {
                        const hasCorrectOrder =
                            dayjs(start).isBefore(validDate);
                        typedOnChange?.(
                            hasCorrectOrder
                                ? [start, validDate]
                                : [validDate, start]
                        );
                    }
                } else {
                    typedOnChange?.([validDate, null]);
                }
            }

            if (!date) {
                setActiveDate(validDate);
            }
        },
        [
            type,
            value,
            onChange,
            allowDeselect,
            allowSingleDateInRange,
            date,
            activeDate,
            minDate,
            maxDate
        ]
    );

    const isNextYearDisabled =
        maxDate && activeDate.getFullYear() + 1 > maxDate.getFullYear();

    const isPreviousYearDisabled =
        minDate && activeDate.getFullYear() - 1 < minDate.getFullYear();

    if (showYearPicker) {
        return (
            <YearPicker
                type="default"
                value={new Date(activeDate.getFullYear(), 0, 1)}
                onChange={handleYearSelect}
                minDate={minDate}
                maxDate={maxDate}
                numberOfColumns={numberOfColumns}
            />
        );
    }

    const columns = Array(numberOfColumns)
        .fill(0)
        .map((_, columnIndex) => {
            const columnYear = activeDate.getFullYear() + columnIndex;
            const columnMonths = getMonthsData(columnYear);

            const columnYearLabel = dayjs(new Date(columnYear, 0, 1)).format(
                yearLabelFormat
            );

            return (
                <div key={columnIndex} className="mb-4 last:mb-0">
                    <CalendarHeader
                        label={columnYearLabel}
                        nextDisabled={
                            columnIndex === numberOfColumns - 1 &&
                            isNextYearDisabled
                        }
                        previousDisabled={
                            columnIndex === 0 && isPreviousYearDisabled
                        }
                        onNext={
                            columnIndex === numberOfColumns - 1
                                ? handleNextYear
                                : undefined
                        }
                        onPrevious={
                            columnIndex === 0 ? handlePreviousYear : undefined
                        }
                        onLabelClick={() => setShowYearPicker(true)}
                    />
                    <PickerGrid columns={3}>
                        {columnMonths.map((month) => {
                            let selected = false;
                            let inRange = false;
                            let isRangeStart = false;
                            let isRangeEnd = false;

                            if (type === "default" && value) {
                                selected =
                                    value instanceof Date &&
                                    month.getFullYear() ===
                                        value.getFullYear() &&
                                    month.getMonth() === value.getMonth();
                            } else if (
                                type === "multiple" &&
                                Array.isArray(value)
                            ) {
                                selected = (value as MultiDateValue).some(
                                    (date) =>
                                        date instanceof Date &&
                                        month.getFullYear() ===
                                            date.getFullYear() &&
                                        month.getMonth() === date.getMonth()
                                );
                            } else if (
                                type === "range" &&
                                Array.isArray(value)
                            ) {
                                const rangeValue = value as DateRangeValue;
                                const [start, end] = rangeValue;

                                let isStart = false;
                                let isEnd = false;
                                let isInRange = false;

                                if (start) {
                                    isStart =
                                        month.getFullYear() ===
                                            start.getFullYear() &&
                                        month.getMonth() === start.getMonth();
                                }

                                if (end) {
                                    isEnd =
                                        month.getFullYear() ===
                                            end.getFullYear() &&
                                        month.getMonth() === end.getMonth();
                                }

                                if (start && end) {
                                    const monthDate = new Date(
                                        month.getFullYear(),
                                        month.getMonth(),
                                        1
                                    );
                                    const startMonth = new Date(
                                        start.getFullYear(),
                                        start.getMonth(),
                                        1
                                    );
                                    const endMonth = new Date(
                                        end.getFullYear(),
                                        end.getMonth(),
                                        1
                                    );

                                    isInRange =
                                        monthDate >= startMonth &&
                                        monthDate <= endMonth;
                                }

                                inRange = isInRange;
                                isRangeStart = isStart;
                                isRangeEnd = isEnd;
                                selected = isStart || isEnd;
                            }

                            const disabled = (() => {
                                const monthStart = new Date(
                                    month.getFullYear(),
                                    month.getMonth(),
                                    1
                                );
                                const monthEnd = new Date(
                                    month.getFullYear(),
                                    month.getMonth() + 1,
                                    0
                                );

                                let isDisabled = false;

                                if (
                                    minDate &&
                                    dayjs(monthEnd).isBefore(minDate, "day")
                                ) {
                                    isDisabled = true;
                                }

                                if (
                                    maxDate &&
                                    dayjs(monthStart).isAfter(maxDate, "day")
                                ) {
                                    isDisabled = true;
                                }

                                return isDisabled;
                            })();

                            const customControlProps =
                                getMonthControlProps?.(month) || {};

                            return (
                                <PickerControl
                                    key={month.getMonth()}
                                    selected={selected}
                                    inRange={inRange}
                                    isRangeStart={isRangeStart}
                                    isRangeEnd={isRangeEnd}
                                    disabled={disabled}
                                    onClick={() => handleMonthSelect(month)}
                                    aria-label={`Select month ${month.toLocaleString(
                                        "default",
                                        { month: "long" }
                                    )} ${month.getFullYear()}`}
                                    {...customControlProps}
                                >
                                    {dayjs(month).format(monthsListFormat)}
                                </PickerControl>
                            );
                        })}
                    </PickerGrid>
                </div>
            );
        });

    return (
        <div className="w-full" {...others}>
            {columns}
        </div>
    );
}
