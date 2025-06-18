import React, { ElementType, ReactNode } from "react";

export type BadgeVariant = "filled" | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BadgeGradient {
    from: string;
    to: string;
    deg?: number;
}

export interface BadgeProps
    extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
    children?: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    fullWidth?: boolean;
    classNames?: BadgeClassNames;
    component?: ElementType;
}

export interface BadgeClassNames {
    root?: string;
    section?: string;
    label?: string;
}
