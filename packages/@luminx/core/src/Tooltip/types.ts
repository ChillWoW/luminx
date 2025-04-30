import { HTMLAttributes, ReactNode } from "react";

export type TooltipPosition =
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";

export type TooltipEvents = {
    hover?: boolean;
    focus?: boolean;
    touch?: boolean;
};

export interface TooltipOffset {
    mainAxis?: number;
    crossAxis?: number;
}

export type TooltipRadius = "none" | "sm" | "md" | "lg" | "xl";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    label: ReactNode;
    children: ReactNode;
    position?: TooltipPosition;
    offset?: number | TooltipOffset;
    disabled?: boolean;
    opened?: boolean;
    withArrow?: boolean;
    arrowSize?: number;
    arrowRadius?: number;
    multiline?: boolean;
    width?: number | string;
    inline?: boolean;
    events?: TooltipEvents;
    openDelay?: number;
    closeDelay?: number;
    color?: string;
    radius?: TooltipRadius;
    refProp?: string;
    classNames?: {
        root?: string;
        tooltip?: string;
        arrow?: string;
        content?: string;
    };
}

export interface TooltipGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    openDelay?: number;
    closeDelay?: number;
}

export interface TooltipFloatingProps extends Omit<TooltipProps, "position"> {
    followMouse?: boolean;
    offset?: number;
}
