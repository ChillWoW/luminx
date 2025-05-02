import { ButtonHTMLAttributes, ElementType } from "react";
import { Radius, Shadow } from "../_theme";
import { TooltipProps } from "../Tooltip";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "outline" | "unstyled";
export type ButtonLoaderPosition = "left" | "right";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    as?: ElementType;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    variant?: ButtonVariant;
    radius?: Radius;
    shadow?: Shadow;
    size?: ButtonSize;
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
    tooltipProps?: Omit<TooltipProps, "children">;
    style?: React.CSSProperties;
    className?: string;
    classNames?: ButtonClassNames;
}

export interface ButtonClassNames {
    root?: string;
    leftSection?: string;
    rightSection?: string;
    disabled?: string;
    loader?: string;
}
