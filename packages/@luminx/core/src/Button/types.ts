import { ButtonHTMLAttributes, ElementType } from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "outline" | "unstyled";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ButtonLoaderPosition = "left" | "right";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    as?: ElementType;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    variant?: ButtonVariant;
    radius?: ButtonRadius;
    size?: ButtonSize;
    color?: string;
    disabled?: boolean;
    active?: boolean;
    hover?: boolean;
    loading?: boolean;
    loadingPosition?: ButtonLoaderPosition;
    loader?: React.ReactNode;
    fullWidth?: boolean;
    href?: string;
    target?: string;
    preventDefault?: boolean;
    tooltip?: boolean;
    tooltipProps?: Record<string, any>;
    style?: React.CSSProperties;
    className?: string;
    classNames?: ButtonClassNames;
}

export interface ButtonClassNames {
    container?: string;
    leftSection?: string;
    rightSection?: string;
    disabled?: string;
    loader?: string;
}
