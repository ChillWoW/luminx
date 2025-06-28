import { ButtonHTMLAttributes } from "react";

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconButtonVariant = "filled" | "outline" | "ghost";

export interface IconButtonClassNames {
    root?: string;
    icon?: string;
    disabled?: string;
}

export interface IconButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    onClick?: () => void;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    disabled?: boolean;
    children: React.ReactNode;
    classNames?: IconButtonClassNames;
}
