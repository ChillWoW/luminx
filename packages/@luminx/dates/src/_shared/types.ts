export type DateValue = Date | null;
export type DateRangeValue = [DateValue, DateValue];
export type MultiDateValue = Date[];
export type AnyDateValue = DateValue | DateRangeValue | MultiDateValue;

export type PickerType = "default" | "multiple" | "range";

export interface AnyPickerBaseProps {
    type?: PickerType;
    defaultDate?: Date;
    date?: Date;
    onDateChange?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    numberOfColumns?: number;
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
