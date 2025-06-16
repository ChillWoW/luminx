import { ElementType, HTMLAttributes, ReactNode } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    size?: IconSize;
    classNames?: IconClassNames;
    component?: ElementType;
}

export interface IconClassNames {
    root?: string;
    icon?: string;
}
