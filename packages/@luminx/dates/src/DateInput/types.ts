import { InputClassNames, InputProps, Radius, Shadow } from "@luminx/core";
import { DateValue, DateRangeValue, PickerType } from "../_shared/types";

export interface DateInputProps<T = DateValue | DateRangeValue>
    extends Omit<InputProps, "onChange" | "value" | "defaultValue"> {
    format?: string;
    type?: PickerType;
    defaultValue?: T;
    value?: T;
    onChange?: (date: T) => void;
    placeholder?: string;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
    allowDeselect?: boolean;
    disabled?: boolean;
    dropdownRadius?: Radius;
    dropdownShadow?: Shadow;
    error?: string;
    clearable?: boolean;
    className?: string;
    classNames?: DateInputClassNames;
}

export interface DateInputClassNames extends InputClassNames {
    root?: string;
    dropdown?: string;
}
