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
    getDecadeRange,
    getYearsData,
    areDatesEqual,
    isDateInRange,
    isDateInArray,
    isDateDisabled
} from "../_shared/dateUtils";
import { CalendarHeader } from "../_shared/CalendarHeader";
import { PickerGrid } from "../_shared/PickerGrid";
import { PickerControl } from "../_shared/PickerControl";

export type YearPickerBaseProps = {
    yearsListFormat?: string;
    decadeLabelFormat?: string;
};

export type YearPickerSingleProps = Omit<SinglePickerProps, "getControlProps"> &
    YearPickerBaseProps & {
        type?: "default";
        getYearControlProps?: SinglePickerProps["getControlProps"];
    };

export type YearPickerMultipleProps = Omit<
    MultiplePickerProps,
    "getControlProps"
> &
    YearPickerBaseProps & {
        type: "multiple";
        getYearControlProps?: MultiplePickerProps["getControlProps"];
    };

export type YearPickerRangeProps = Omit<RangePickerProps, "getControlProps"> &
    YearPickerBaseProps & {
        type: "range";
        getYearControlProps?: RangePickerProps["getControlProps"];
    };

export type YearPickerProps =
    | YearPickerSingleProps
    | YearPickerMultipleProps
    | YearPickerRangeProps;

export function YearPicker(props: YearPickerProps) {
    const {
        type = "default",
        defaultDate,
        date,
        onDateChange,
        value,
        onChange,
        minDate,
        maxDate,
        yearsListFormat = "YYYY",
        decadeLabelFormat = "YYYY",
        numberOfColumns = 1,
        getYearControlProps,
        ...others
    } = props;

    const allowDeselect =
        type === "default"
            ? (props as YearPickerSingleProps).allowDeselect
            : undefined;

    const allowSingleDateInRange =
        type === "range"
            ? (props as YearPickerRangeProps).allowSingleDateInRange
            : undefined;

    const { settings } = useDatesContext();
    const defaultDateValue = defaultDate || new Date();
    const [activeDate, setActiveDate] = useState(date || defaultDateValue);

    useEffect(() => {
        if (date) {
            setActiveDate(date);
        }
    }, [date]);

    const decade = getDecadeRange(activeDate.getFullYear());
    const years = getYearsData(activeDate.getFullYear());

    const handleNextDecade = () => {
        const newDate = new Date(activeDate);
        newDate.setFullYear(activeDate.getFullYear() + 10);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handlePreviousDecade = () => {
        const newDate = new Date(activeDate);
        newDate.setFullYear(activeDate.getFullYear() - 10);
        setActiveDate(newDate);
        onDateChange?.(newDate);
    };

    const handleYearSelect = useCallback(
        (year: Date) => {
            const findValidDateInYear = (selectedYear: Date): Date => {
                const yearNum = selectedYear.getFullYear();

                let targetMonth = 0;
                let targetDay = 1;

                if (type === "default" && value instanceof Date) {
                    targetMonth = value.getMonth();
                    targetDay = value.getDate();
                } else if (activeDate) {
                    targetMonth = activeDate.getMonth();
                    targetDay = activeDate.getDate();
                }

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

            const validDate = findValidDateInYear(year);

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
                        dayjs(validDate).isSame(start, "year")
                    ) {
                        typedOnChange?.([start, start]);
                    } else {
                        const hasCorrectOrder = dayjs(start).isBefore(
                            validDate,
                            "year"
                        );
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

    const isNextDecadeDisabled =
        maxDate && decade.end + 1 > maxDate.getFullYear();

    const isPreviousDecadeDisabled =
        minDate && decade.start - 1 < minDate.getFullYear();

    const columns = Array(numberOfColumns)
        .fill(0)
        .map((_, columnIndex) => {
            const columnDecade = decade.start + columnIndex * 10;
            const columnDecadeRange = getDecadeRange(columnDecade);
            const columnYears = getYearsData(columnDecade);

            const columnDecadeLabel = `${dayjs(
                new Date(columnDecadeRange.start, 0, 1)
            ).format(decadeLabelFormat)} – ${dayjs(
                new Date(columnDecadeRange.end, 0, 1)
            ).format(decadeLabelFormat)}`;

            return (
                <div key={columnIndex} className="mb-4 last:mb-0">
                    <CalendarHeader
                        label={columnDecadeLabel}
                        nextDisabled={isNextDecadeDisabled}
                        previousDisabled={isPreviousDecadeDisabled}
                        onNext={
                            columnIndex === numberOfColumns - 1
                                ? handleNextDecade
                                : undefined
                        }
                        onPrevious={
                            columnIndex === 0 ? handlePreviousDecade : undefined
                        }
                    />
                    <PickerGrid columns={3}>
                        {columnYears.map((year) => {
                            let selected = false;
                            let inRange = false;
                            let isRangeStart = false;
                            let isRangeEnd = false;

                            if (type === "default" && value) {
                                selected = areDatesEqual(
                                    year,
                                    value as DateValue
                                );
                            } else if (
                                type === "multiple" &&
                                Array.isArray(value)
                            ) {
                                selected = isDateInArray(
                                    year,
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
                                } = isDateInRange(year, rangeValue);

                                inRange = isInRange;
                                isRangeStart = isStart;
                                isRangeEnd = isEnd;
                                selected = isStart || isEnd;
                            }

                            const disabled = (() => {
                                const yearStart = new Date(
                                    year.getFullYear(),
                                    0,
                                    1
                                );
                                const yearEnd = new Date(
                                    year.getFullYear(),
                                    11,
                                    31
                                );

                                let isDisabled = false;

                                if (
                                    minDate &&
                                    dayjs(yearEnd).isBefore(minDate, "day")
                                ) {
                                    isDisabled = true;
                                }

                                if (
                                    maxDate &&
                                    dayjs(yearStart).isAfter(maxDate, "day")
                                ) {
                                    isDisabled = true;
                                }

                                return isDisabled;
                            })();

                            const customControlProps =
                                getYearControlProps?.(year) || {};

                            return (
                                <PickerControl
                                    key={year.getFullYear()}
                                    selected={selected}
                                    inRange={inRange}
                                    isRangeStart={isRangeStart}
                                    isRangeEnd={isRangeEnd}
                                    disabled={disabled}
                                    onClick={() => handleYearSelect(year)}
                                    aria-label={`Select year ${year.getFullYear()}`}
                                    {...customControlProps}
                                >
                                    {dayjs(year).format(yearsListFormat)}
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
