import React, { createContext, useContext } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export interface DatesSettings {
    locale?: string;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    weekendDays?: number[];
    consistentWeeks?: boolean;
}

interface DatesProviderContextValue {
    settings: Required<DatesSettings>;
    getWeekdayNames: (format?: "dd" | "ddd" | "dddd") => string[];
    getMonthNames: (format?: "MMM" | "MMMM") => string[];
    isWeekend: (date: Date) => boolean;
    formatDate: (date: Date | string | number, format?: string) => string;
    parseDate: (dateString: string, format?: string) => Date | null;
}

const DEFAULT_SETTINGS: Required<DatesSettings> = {
    locale: "en",
    firstDayOfWeek: 1,
    weekendDays: [0, 6],
    consistentWeeks: false
};

const DatesProviderContext = createContext<DatesProviderContextValue | null>(
    null
);

export interface DatesProviderProps {
    settings?: DatesSettings;
    children: React.ReactNode;
}

export function DatesProvider({ settings = {}, children }: DatesProviderProps) {
    const mergedSettings: Required<DatesSettings> = {
        ...DEFAULT_SETTINGS,
        ...settings
    };

    if (mergedSettings.locale !== "en") {
        dayjs.locale(mergedSettings.locale);
    }

    const getWeekdayNames = (format: "dd" | "ddd" | "dddd" = "dd") => {
        const localeData = dayjs().localeData();
        let names: string[];

        switch (format) {
            case "dd":
                names = localeData.weekdaysMin();
                break;
            case "ddd":
                names = localeData.weekdaysShort();
                break;
            case "dddd":
                names = localeData.weekdays();
                break;
            default:
                names = localeData.weekdaysMin();
        }

        const { firstDayOfWeek } = mergedSettings;
        return [
            ...names.slice(firstDayOfWeek),
            ...names.slice(0, firstDayOfWeek)
        ];
    };

    const getMonthNames = (format: "MMM" | "MMMM" = "MMM") => {
        const localeData = dayjs().localeData();

        switch (format) {
            case "MMM":
                return localeData.monthsShort();
            case "MMMM":
                return localeData.months();
            default:
                return localeData.monthsShort();
        }
    };

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return mergedSettings.weekendDays.includes(day);
    };

    const formatDate = (
        date: Date | string | number,
        format = "YYYY-MM-DD"
    ) => {
        return dayjs(date).format(format);
    };

    const parseDate = (dateString: string, format = "YYYY-MM-DD") => {
        const parsed = dayjs(dateString, format);
        return parsed.isValid() ? parsed.toDate() : null;
    };

    const contextValue: DatesProviderContextValue = {
        settings: mergedSettings,
        getWeekdayNames,
        getMonthNames,
        isWeekend,
        formatDate,
        parseDate
    };

    return (
        <DatesProviderContext.Provider value={contextValue}>
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

export function useDatesSettings() {
    const { settings } = useDatesContext();
    return settings;
}
