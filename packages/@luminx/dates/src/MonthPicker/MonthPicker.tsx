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
        size = "md",
        monthsListFormat = "MMM",
        yearLabelFormat = "YYYY",
        numberOfColumns = 1,
        getMonthControlProps,
        ariaLabels,
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

    const { settings } = useDatesContext();
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
            const newDate = new Date(activeDate);
            newDate.setFullYear(year.getFullYear());
            setActiveDate(newDate);
            onDateChange?.(newDate);
            setShowYearPicker(false);
        }
    };

    const handleMonthSelect = useCallback(
        (month: Date) => {
            if (type === "default") {
                const typedValue = value as DateValue;
                const shouldDeselect =
                    allowDeselect &&
                    typedValue instanceof Date &&
                    areDatesEqual(typedValue, month);

                const typedOnChange = onChange as
                    | ((date: DateValue) => void)
                    | undefined;
                typedOnChange?.(shouldDeselect ? null : month);
            } else if (type === "multiple") {
                const typedValue = value as MultiDateValue;
                const isSelected = isDateInArray(month, typedValue);
                const newValue = isSelected
                    ? typedValue.filter((date) => !areDatesEqual(date, month))
                    : [...typedValue, month];

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
                    typedOnChange?.([month, null]);
                } else if (!end) {
                    if (
                        allowSingleDateInRange &&
                        dayjs(month).isSame(start, "month") &&
                        dayjs(month).isSame(start, "year")
                    ) {
                        typedOnChange?.([start, start]);
                    } else {
                        const hasCorrectOrder = dayjs(start).isBefore(month);
                        typedOnChange?.(
                            hasCorrectOrder ? [start, month] : [month, start]
                        );
                    }
                } else {
                    typedOnChange?.([month, null]);
                }
            }

            if (!date) {
                setActiveDate(month);
            }
        },
        [type, value, onChange, allowDeselect, allowSingleDateInRange, date]
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
                size={size}
                ariaLabels={ariaLabels}
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
                        nextLabel={ariaLabels?.nextYear || "Next year"}
                        previousLabel={
                            ariaLabels?.previousYear || "Previous year"
                        }
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
                                selected = areDatesEqual(
                                    month,
                                    value as DateValue
                                );
                            } else if (
                                type === "multiple" &&
                                Array.isArray(value)
                            ) {
                                selected = isDateInArray(
                                    month,
                                    value as MultiDateValue
                                );
                            } else if (
                                type === "range" &&
                                Array.isArray(value)
                            ) {
                                const rangeValue = value as DateRangeValue;
                                const {
                                    inRange: isInRange,
                                    isStart,
                                    isEnd
                                } = isDateInRange(month, rangeValue);

                                inRange = isInRange;
                                isRangeStart = isStart;
                                isRangeEnd = isEnd;
                                selected = isStart || isEnd;
                            }

                            const disabled = isDateDisabled(month, {
                                minDate,
                                maxDate
                            });

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
                                    size={size}
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
