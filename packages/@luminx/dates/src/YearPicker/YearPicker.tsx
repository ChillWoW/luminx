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
        size = "md",
        yearsListFormat = "YYYY",
        decadeLabelFormat = "YYYY",
        numberOfColumns = 1,
        getYearControlProps,
        ariaLabels,
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
            if (type === "default") {
                const typedValue = value as DateValue;
                const shouldDeselect =
                    allowDeselect &&
                    typedValue instanceof Date &&
                    areDatesEqual(typedValue, year);

                const typedOnChange = onChange as
                    | ((date: DateValue) => void)
                    | undefined;
                typedOnChange?.(shouldDeselect ? null : year);
            } else if (type === "multiple") {
                const typedValue = value as MultiDateValue;
                const isSelected = isDateInArray(year, typedValue);
                const newValue = isSelected
                    ? typedValue.filter((date) => !areDatesEqual(date, year))
                    : [...typedValue, year];

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
                    typedOnChange?.([year, null]);
                } else if (!end) {
                    if (
                        allowSingleDateInRange &&
                        dayjs(year).isSame(start, "year")
                    ) {
                        typedOnChange?.([start, start]);
                    } else {
                        const hasCorrectOrder = dayjs(start).isBefore(
                            year,
                            "year"
                        );
                        typedOnChange?.(
                            hasCorrectOrder ? [start, year] : [year, start]
                        );
                    }
                } else {
                    typedOnChange?.([year, null]);
                }
            }

            if (!date) {
                setActiveDate(year);
            }
        },
        [type, value, onChange, allowDeselect, allowSingleDateInRange, date]
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
                        nextLabel={ariaLabels?.nextDecade || "Next decade"}
                        previousLabel={
                            ariaLabels?.previousDecade || "Previous decade"
                        }
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

                            const disabled = isDateDisabled(year, {
                                minDate,
                                maxDate
                            });

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
                                    size={size}
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
