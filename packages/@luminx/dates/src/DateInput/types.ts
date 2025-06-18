import { InputClassNames, InputProps } from "@luminx/core";
import { DateValue, DateRangeValue, PickerType } from "../_shared/types";
import { Placement } from "@floating-ui/react";
import { TransitionProps } from "@luminx/core";

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
    error?: string;
    clearable?: boolean;
    position?: Placement;
    zIndex?: number;
    offset?: number;
    initialOpened?: boolean;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    withTransition?: boolean;
    transitionProps?: Partial<TransitionProps>;
    middlewares?: {
        shift?: boolean;
        flip?: boolean;
    };

    className?: string;
    classNames?: DateInputClassNames;
}

export interface DateInputClassNames extends InputClassNames {
    root?: string;
    dropdown?: string;
}
