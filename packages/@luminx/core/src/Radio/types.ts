import React, { InputHTMLAttributes } from "react";

export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioVariant = "outline" | "filled";
export type RadioLabelPosition = "left" | "right";

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    fullWidth?: boolean;
    unstyled?: boolean;
    size?: RadioSize;
    variant?: RadioVariant;

    label?: string;
    labelPosition?: RadioLabelPosition;
    hint?: string;
    error?: string;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    icon?: React.ReactNode;

    inputRef?: React.Ref<HTMLInputElement>;
    style?: React.CSSProperties;

    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;

    className?: string;
    classNames?: RadioClassNames;
}

export interface RadioClassNames {
    root?: string;
    input?: string;
    icon?: string;
    inner?: string;
    body?: string;
    labelWrapper?: string;
    label?: string;
    hint?: string;
    error?: string;
}

export interface RadioGroupProps {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    size?: RadioSize;
    variant?: RadioVariant;
    labelPosition?: RadioLabelPosition;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    orientation?: "horizontal" | "vertical";
    spacing?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    style?: React.CSSProperties;
}
