import { ReactNode, HTMLAttributes } from "react";

export type EmptyStateSize = "xs" | "sm" | "md" | "lg" | "xl";
export type EmptyStateOrientation = "vertical" | "horizontal";
export type EmptyStateSpacing = "xs" | "sm" | "md" | "lg" | "xl";

export interface EmptyStateClassNames {
    root?: string;
    container?: string;
    icon?: string;
    content?: string;
    title?: string;
    description?: string;
    actions?: string;
}

export interface EmptyStateProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    size?: EmptyStateSize;
    orientation?: EmptyStateOrientation;
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    spacing?: EmptyStateSpacing;
    withBorder?: boolean;
    withAnimation?: boolean;
    centered?: boolean;
    classNames?: EmptyStateClassNames;
    className?: string;
}
