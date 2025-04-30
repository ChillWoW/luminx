import { ReactNode } from "react";

export type RingProgressSize = number | "xs" | "sm" | "md" | "lg" | "xl";
export type RingProgressThickness = number;

export interface RingProgressSection {
    value: number;
    color?: string;
    tooltip?: ReactNode;
    [key: string]: any;
}

export interface RingProgressRootProps {
    size?: RingProgressSize;
    thickness?: RingProgressThickness;
    sections: RingProgressSection[];
    label?: ReactNode;
    roundCaps?: boolean;
    rootColor?: string;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}

export interface RingProgressProps extends RingProgressRootProps {
    children?: ReactNode;
}
