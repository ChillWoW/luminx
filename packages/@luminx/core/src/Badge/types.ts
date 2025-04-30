import React, { ElementType } from "react";

export type BadgeVariant = "filled" | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type BadgeShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface BadgeGradient {
    from: string;
    to: string;
    deg?: number;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    radius?: BadgeRadius;
    shadow?: BadgeShadow;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    fullWidth?: boolean;
    classNames?: BadgeClassNames;
    component?: ElementType;
}

export interface BadgeClassNames {
    root?: string;
    section?: string;
    label?: string;
}
