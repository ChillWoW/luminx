import { ButtonHTMLAttributes, ElementType } from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "outline" | "unstyled";
export type ButtonLoaderPosition = "left" | "right";
export type ButtonAlign = "left" | "center" | "right";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    type?: "button" | "submit" | "reset";
    as?: ElementType;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    active?: boolean;
    loading?: boolean;
    loadingPosition?: ButtonLoaderPosition;
    loader?: React.ReactNode;
    fullWidth?: boolean;
    href?: string;
    target?: string;
    preventDefault?: boolean;
    align?: ButtonAlign;
    useAnimation?: boolean;
    uppercase?: boolean;
    className?: string;
    classNames?: ButtonClassNames;
}

export interface ButtonClassNames {
    root?: string;
    leftSection?: string;
    rightSection?: string;
    disabled?: string;
    sectionDisabled?: string;
    loader?: string;
}
