import { ReactNode } from "react";

export type ProgressCircleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressCircleLabelPosition = "center" | "bottom";

export interface ProgressCircleRootProps {
    children?: ReactNode;
    size?: ProgressCircleSize;
    className?: string;
    thickness?: number;
}

export interface ProgressCircleSectionProps {
    value: number;
    className?: string;
    striped?: boolean;
    animated?: boolean;
    children?: ReactNode;
    color?: string;
}

export interface ProgressCircleLabelProps {
    children: ReactNode;
    position?: ProgressCircleLabelPosition;
    className?: string;
}

export interface ProgressCircleProps
    extends ProgressCircleRootProps,
        Omit<
            ProgressCircleSectionProps,
            "className" | "children" | "position" | "value"
        > {
    value?: number;
    label?: ReactNode;
    labelPosition?: ProgressCircleLabelPosition;
    striped?: boolean;
    animated?: boolean;
    color?: string;
}
