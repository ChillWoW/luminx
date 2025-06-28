export interface PinInputClassNames {
    root?: string;
    field?: string;
    label?: string;
    error?: string;
    hint?: string;
}

export interface PinInputProps {
    length?: number;
    value?: string;
    defaultValue?: string;
    type?: RegExp | string;
    inputMode?:
        | "search"
        | "text"
        | "none"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal";
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    mask?: boolean;
    error?: string;
    hint?: string;
    label?: string;
    withAsterisk?: boolean;
    autoFocus?: boolean;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    classNames?: PinInputClassNames;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
}
