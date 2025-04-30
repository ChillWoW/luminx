import { InputHTMLAttributes } from "react";

export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    fullWidth?: boolean;
    size?: SwitchSize;
    color?: string;
    thumbColor?: string;

    label?: string;
    hint?: string;
    error?: string;

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (checked: boolean) => void;

    onLabel?: React.ReactNode;
    offLabel?: React.ReactNode;
    thumbIcon?: React.ReactNode;

    className?: string;
    classNames?: SwitchClassNames;
}

export interface SwitchClassNames {
    root?: string;
    wrapper?: string;
    track?: string;
    activeTrack?: string;
    thumb?: string;
    activeThumb?: string;
    trackLabel?: string;
    body?: string;
    labelWrapper?: string;
    label?: string;
    required?: string;
    hint?: string;
    error?: string;
}
