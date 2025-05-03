import React, { createContext, useContext } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export interface DatesSettings {
    locale?: string;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    weekendDays?: number[];
    timezone?: string;
    dateFormat?: string;
    timeFormat?: string;
}

interface DatesProviderContextValue {
    settings: DatesSettings;
    getTimezone: () => string | undefined;
    formatDate: (date: Date | string | number, format?: string) => string;
    parseDate: (dateString: string, format?: string) => Date | null;
    getWeekdayNames: (format?: string) => string[];
    getMonthNames: (format?: string) => string[];
    isWeekend: (date: Date) => boolean;
}

const DEFAULT_SETTINGS: DatesSettings = {
    locale: "en",
    firstDayOfWeek: 1, // 0 = Sunday, 6 = Saturday
    weekendDays: [0, 6],
    timezone: undefined,
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm"
};

const DatesProviderContext = createContext<DatesProviderContextValue>({
    settings: DEFAULT_SETTINGS,
    getTimezone: () => undefined,
    formatDate: () => "",
    parseDate: () => null,
    getWeekdayNames: () => [],
    getMonthNames: () => [],
    isWeekend: () => false
});

export interface DatesProviderProps {
    settings?: DatesSettings;
    children: React.ReactNode;
}

export function DatesProvider({ settings = {}, children }: DatesProviderProps) {
    const mergedSettings: DatesSettings = {
        ...DEFAULT_SETTINGS,
        ...settings
    };

    if (mergedSettings.locale && mergedSettings.locale !== "en") {
        try {
            // Only import the locale if needed
            import(`dayjs/locale/${mergedSettings.locale}`)
                .then(() => dayjs.locale(mergedSettings.locale))
                .catch((error) => {
                    console.warn(
                        `Failed to load dayjs locale "${mergedSettings.locale}"`,
                        error
                    );
                });
        } catch (error) {
            console.warn(
                `Failed to set dayjs locale to "${mergedSettings.locale}"`,
                error
            );
        }
    }

    const getTimezone = () => mergedSettings.timezone;

    const formatDate = (date: Date | string | number, format?: string) => {
        const dayjsDate = dayjs(date);
        const timezone = getTimezone();
        const formatString = format || mergedSettings.dateFormat;

        if (timezone) {
            return dayjsDate.tz(timezone).format(formatString);
        }

        return dayjsDate.format(formatString);
    };

    const parseDate = (dateString: string, format?: string) => {
        const formatString = format || mergedSettings.dateFormat;
        const parsed = dayjs(dateString, formatString);
        return parsed.isValid() ? parsed.toDate() : null;
    };

    const getWeekdayNames = (format = "dd") => {
        const localeData = dayjs().localeData();
        const weekdays = localeData.weekdays();
        const weekdaysShort = localeData.weekdaysShort();
        const weekdaysMin = localeData.weekdaysMin();

        let names: string[];
        switch (format) {
            case "dd":
                names = weekdaysMin;
                break;
            case "ddd":
                names = weekdaysShort;
                break;
            case "dddd":
                names = weekdays;
                break;
            default:
                names = weekdaysMin;
        }

        const { firstDayOfWeek = 0 } = mergedSettings;
        return [
            ...names.slice(firstDayOfWeek),
            ...names.slice(0, firstDayOfWeek)
        ];
    };

    const getMonthNames = (format = "MMM") => {
        const localeData = dayjs().localeData();
        const months = localeData.months();
        const monthsShort = localeData.monthsShort();

        switch (format) {
            case "MMM":
                return monthsShort;
            case "MMMM":
                return months;
            default:
                return monthsShort;
        }
    };

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return mergedSettings.weekendDays?.includes(day) || false;
    };

    return (
        <DatesProviderContext.Provider
            value={{
                settings: mergedSettings,
                getTimezone,
                formatDate,
                parseDate,
                getWeekdayNames,
                getMonthNames,
                isWeekend
            }}
        >
            {children}
        </DatesProviderContext.Provider>
    );
}

export function useDatesContext() {
    const context = useContext(DatesProviderContext);

    if (!context) {
        throw new Error("useDatesContext must be used within a DatesProvider");
    }

    return context;
}

export function formatWithTimezone(
    date: Date | string | number,
    format = "YYYY-MM-DD"
) {
    const { formatDate } = useDatesContext();
    return formatDate(date, format);
}
