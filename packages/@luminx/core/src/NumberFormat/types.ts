import { NumericFormatProps } from "react-number-format";

export interface LocaleProviderProps {
    locale?: string;
    children: React.ReactNode;
}

export interface NumberFormatProps
    extends Omit<NumericFormatProps, "value" | "style"> {
    value: number | string;
    style?: "decimal" | "currency" | "percent" | "unit";
    currency?: string;
    unit?: string;
    notation?: "standard" | "scientific" | "engineering" | "compact";
    compactDisplay?: "short" | "long";
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
}

export interface LocaleContextValue {
    locale: string;
}
