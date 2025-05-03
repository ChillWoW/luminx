import dayjs from "dayjs";
import { DateValue, DateRangeValue } from "./types";

export interface DecadeRange {
    start: number;
    end: number;
}

export function getDecadeRange(year: number): DecadeRange {
    const start = Math.floor(year / 10) * 10;
    return { start, end: start + 9 };
}

export function areDatesEqual(date1: DateValue, date2: DateValue): boolean {
    if (date1 === null && date2 === null) {
        return true;
    }

    if (date1 === null || date2 === null) {
        return false;
    }

    return (
        dayjs(date1).format("YYYY-MM-DD") === dayjs(date2).format("YYYY-MM-DD")
    );
}

export function isDateInRange(
    date: Date,
    range: DateRangeValue
): { inRange: boolean; isStart: boolean; isEnd: boolean } {
    const [start, end] = range;

    if (!start || !end) {
        return {
            inRange: false,
            isStart: Boolean(start && areDatesEqual(date, start)),
            isEnd: Boolean(end && areDatesEqual(date, end))
        };
    }

    const isAfterStart =
        dayjs(date).isAfter(start, "day") || areDatesEqual(date, start);
    const isBeforeEnd =
        dayjs(date).isBefore(end, "day") || areDatesEqual(date, end);

    return {
        inRange: isAfterStart && isBeforeEnd,
        isStart: areDatesEqual(date, start),
        isEnd: areDatesEqual(date, end)
    };
}

export function isDateInArray(date: Date, array: Date[] = []): boolean {
    return array.some((d) => areDatesEqual(date, d));
}

export function isDateDisabled(
    date: Date,
    { minDate, maxDate }: { minDate?: Date; maxDate?: Date }
): boolean {
    let disabled = false;

    if (minDate) {
        disabled = disabled || dayjs(date).isBefore(minDate, "day");
    }

    if (maxDate) {
        disabled = disabled || dayjs(date).isAfter(maxDate, "day");
    }

    return disabled;
}

export function getYearsData(decade: number): Date[] {
    const { start } = getDecadeRange(decade);
    const years: Date[] = [];

    for (let i = 0; i < 10; i++) {
        years.push(new Date(start + i, 0, 1));
    }

    return years;
}
