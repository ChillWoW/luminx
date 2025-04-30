import { InputHTMLAttributes } from "react";

export type InputRadius = "none" | "sm" | "md" | "lg" | "xl";
export type InputShadow = "none" | "sm" | "md" | "lg" | "xl";
export type InputComponent = "input" | "textarea" | "select";

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    // Component type
    component?: InputComponent;

    // Appearance
    radius?: InputRadius;
    shadow?: InputShadow;
    fullWidth?: boolean;
    unstyled?: boolean;

    // Content
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    placeholder?: string;

    // State
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;

    // Input attributes
    type?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    inputMode?: "text" | "numeric" | "decimal" | "email" | "tel" | "url";
    name?: string;

    // Select/Textarea specific props
    options?: Array<{ value: string; label: string }>;
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";

    // Custom sections
    leftSection?: React.ReactNode;
    leftSectionPadding?: number;
    rightSection?: React.ReactNode;
    rightSectionPadding?: number;

    // Handlers
    onChange?: (value: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    // Refs and styling
    value?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputWrapperOrder?: string[];
    debounce?: number;
    style?: React.CSSProperties;

    // Accessibility
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaControls?: string;

    // Styling classnames
    className?: string;
    classNames?: InputClassNames;
}

export interface InputClassNames {
    wrapper?: string;
    container?: string;
    label?: string;
    hint?: string;
    required?: string;
    error?: string;
    success?: string;
    input?: string;
    leftSection?: string;
    rightSection?: string;
}
