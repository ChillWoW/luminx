export type DateValue = Date | null;
export type DateRangeValue = [DateValue, DateValue];
export type MultiDateValue = Date[];
export type AnyDateValue = DateValue | DateRangeValue | MultiDateValue;

export type PickerType = "default" | "multiple" | "range";

export interface AnyPickerBaseProps {
    /** Type of picker */
    type?: PickerType;

    /** Date to display initially when uncontrolled */
    defaultDate?: Date;

    /** Date to display (controlled) */
    date?: Date;

    /** Called when date changes */
    onDateChange?: (date: Date) => void;

    /** Minimum possible date */
    minDate?: Date;

    /** Maximum possible date */
    maxDate?: Date;

    /** Controls size */
    size?: "xs" | "sm" | "md" | "lg" | "xl";

    /** Number of columns to render */
    numberOfColumns?: number;

    /** Accessibility labels */
    ariaLabels?: {
        previousDecade?: string;
        nextDecade?: string;
        previousYear?: string;
        nextYear?: string;
        previousMonth?: string;
        nextMonth?: string;
    };
}

export interface SinglePickerProps extends AnyPickerBaseProps {
    type?: "default";
    value?: DateValue;
    onChange?: (value: DateValue) => void;
    allowDeselect?: boolean;
    getControlProps?: (date: Date) => Record<string, any>;
}

export interface MultiplePickerProps extends AnyPickerBaseProps {
    type: "multiple";
    value?: MultiDateValue;
    onChange?: (value: MultiDateValue) => void;
    getControlProps?: (date: Date) => Record<string, any>;
}

export interface RangePickerProps extends AnyPickerBaseProps {
    type: "range";
    value?: DateRangeValue;
    onChange?: (value: DateRangeValue) => void;
    allowSingleDateInRange?: boolean;
    getControlProps?: (date: Date) => Record<string, any>;
}
