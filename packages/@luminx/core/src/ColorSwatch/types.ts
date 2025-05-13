import { HTMLAttributes, ElementType, ReactNode } from "react";

export type ColorSwatchShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ColorSwatchRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
    color: string;
    component?: ElementType;
    shadow?: ColorSwatchShadow;
    size?: number;
    children?: ReactNode;
    radius?: ColorSwatchRadius;
    style?: React.CSSProperties;
    className?: string;
    classNames?: ColorSwatchClassNames;
}

export interface ColorSwatchClassNames {
    root?: string;
    colorOverlay?: string;
    shadowOverlay?: string;
    child?: string;
}
