import { CSSProperties } from "react";

export type TransitionName =
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "scale"
    | "scale-y"
    | "scale-x"
    | "skew-up"
    | "skew-down"
    | "rotate-left"
    | "rotate-right"
    | "slide-down"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "pop"
    | "pop-bottom-left"
    | "pop-bottom-right"
    | "pop-top-left"
    | "pop-top-right";

export interface TransitionStyles {
    in: CSSProperties;
    out: CSSProperties;
    common?: CSSProperties;
    transitionProperty: string;
}

export interface TransitionProps {
    children:
        | React.ReactNode
        | ((styles: React.CSSProperties) => React.ReactNode);
    mounted: boolean;
    transition: TransitionName | TransitionStyles;
    duration?: number;
    timingFunction?: string;
    enterDelay?: number;
    exitDelay?: number;
    keepMounted?: boolean;
    className?: string;
    onExited?: () => void;
    onEntered?: () => void;
}
