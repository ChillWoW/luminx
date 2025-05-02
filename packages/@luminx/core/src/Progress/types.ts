import { ReactNode } from "react";

export type ProgressRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface ProgressRootProps {
    size?: number | string;
    color?: string;
    radius?: ProgressRadius;
    striped?: boolean;
    animated?: boolean;
    transitionDuration?: number;
    className?: string;
    children?: ReactNode;
}

export interface ProgressSectionProps {
    value: number;
    color?: string;
    className?: string;
    children?: ReactNode;
}

export interface ProgressLabelProps {
    children: ReactNode;
    className?: string;
}

export interface ProgressProps
    extends ProgressRootProps,
        Omit<ProgressSectionProps, "className" | "children"> {
    label?: ReactNode;
}
