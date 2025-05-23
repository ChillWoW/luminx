import React, { InputHTMLAttributes } from "react";
import { Radius, Shadow } from "../_theme";

export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    fullWidth?: boolean;
    unstyled?: boolean;
    color?: string;
    iconColor?: string;
    size?: CheckboxSize;
    radius?: Radius;
    shadow?: Shadow;

    label?: string;
    hint?: string;
    error?: string;
    indeterminate?: boolean;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    icon?: React.FC<{ indeterminate?: boolean; className?: string }>;

    inputRef?: React.Ref<HTMLInputElement>;
    style?: React.CSSProperties;

    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;

    className?: string;
    classNames?: CheckboxClassNames;
}

export interface CheckboxClassNames {
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
