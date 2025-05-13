import { InputProps, InputClassNames } from "../Input";

export interface NumberInputClassNames extends InputClassNames {
    incrementButton?: string;
    decrementButton?: string;
    controlButtons?: string;
}

export interface NumberInputProps
    extends Omit<InputProps, "type" | "onChange" | "classNames"> {
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    onChange?: (value: number) => void;
    defaultValue?: number;
    hideControls?: boolean;
    allowDecimal?: boolean;
    allowNegative?: boolean;
    decimalScale?: number;
    decimalSeparator?: string;
    thousandSeparator?: string;
    prefix?: string;
    suffix?: string;
    classNames?: NumberInputClassNames;
}
