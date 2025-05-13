import { ElementType, HTMLAttributes, ReactNode } from "react";
import { Radius, Shadow } from "../_theme";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconGradient {
    from: string;
    to: string;
    deg?: number;
}

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    size?: IconSize;
    radius?: Radius;
    shadow?: Shadow;
    classNames?: IconClassNames;
    component?: ElementType;
}

export interface IconClassNames {
    root?: string;
    icon?: string;
}
