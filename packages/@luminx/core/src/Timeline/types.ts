import { HTMLAttributes, ReactNode } from "react";

export type TimelineAlign = "left" | "right";
export type TimelineLineVariant = "solid" | "dashed" | "dotted";
export interface TimelineContextValue {
    active: number;
    lineWidth: number;
    bulletSize: number;
    align: TimelineAlign;
    reverseActive: boolean;
    children: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
    active?: number;
    lineWidth?: number;
    bulletSize?: number;
    align?: TimelineAlign;
    reverseActive?: boolean;
    classNames?: TimelineClassNames;
    children: ReactNode;
}

export interface TimelineItemProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    bullet?: ReactNode;
    lineVariant?: TimelineLineVariant;
    isActive?: boolean;
    classNames?: TimelineItemClassNames;
    children?: ReactNode;
}

export interface TimelineClassNames {
    root?: string;
}

export interface TimelineItemClassNames {
    root?: string;
    itemBody?: string;
    bullet?: string;
    line?: string;
    title?: string;
    content?: string;
}
