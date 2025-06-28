export interface PinInputClassNames {
    root?: string;
    field?: string;
    label?: string;
    error?: string;
    hint?: string;
}

export interface PinInputProps {
    /** Number of input fields */
    length?: number;

    /** Controlled value */
    value?: string;

    /** Default value for uncontrolled mode */
    defaultValue?: string;

    /** Regex pattern to validate each character */
    type?: RegExp | string;

    /** Input mode for virtual keyboards */
    inputMode?:
        | "search"
        | "text"
        | "none"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal";

    /** Whether inputs are disabled */
    disabled?: boolean;

    /** Whether inputs are read-only */
    readOnly?: boolean;

    /** Placeholder character for empty fields */
    placeholder?: string;

    /** Whether to mask the input */
    mask?: boolean;

    /** Error message */
    error?: string;

    /** Hint text */
    hint?: string;

    /** Label for the pin input group */
    label?: string;

    /** Whether label should show asterisk */
    withAsterisk?: boolean;

    /** Auto focus first field on mount */
    autoFocus?: boolean;

    /** Called when value changes */
    onChange?: (value: string) => void;

    /** Called when all fields are filled */
    onComplete?: (value: string) => void;

    /** Called when any field gains focus */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

    /** Called when any field loses focus */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

    /** Custom class names for different elements */
    classNames?: PinInputClassNames;

    /** Root element class name */
    className?: string;

    /** ARIA label for accessibility */
    "aria-label"?: string;

    /** ID for the component */
    id?: string;

    /** Name attribute for form handling */
    name?: string;

    /** Whether the field is required */
    required?: boolean;
}
