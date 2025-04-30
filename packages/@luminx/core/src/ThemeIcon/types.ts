import { ElementType, HTMLAttributes, ReactNode } from "react";

export type ThemeIconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ThemeIconRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ThemeIconShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface ThemeIconGradient {
    from: string;
    to: string;
    deg?: number;
}

export interface ThemeIconProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    size?: ThemeIconSize;
    radius?: ThemeIconRadius;
    shadow?: ThemeIconShadow;
    classNames?: ThemeIconClassNames;
    component?: ElementType;
}

export interface ThemeIconClassNames {
    root?: string;
    icon?: string;
}
