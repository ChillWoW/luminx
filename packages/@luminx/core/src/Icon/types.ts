import { ElementType, HTMLAttributes, ReactNode } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type IconShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface IconGradient {
    from: string;
    to: string;
    deg?: number;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    size?: IconSize;
    radius?: IconRadius;
    shadow?: IconShadow;
    classNames?: IconClassNames;
    color?: string;
    component?: ElementType;
}

export interface IconClassNames {
    root?: string;
    icon?: string;
}
