import { ReactNode } from "react";

export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressLabelPosition = "left" | "center" | "right";

export interface ProgressRootProps {
    children?: ReactNode;
    size?: ProgressSize;
    className?: string;
}

export interface ProgressSectionProps {
    value: number;
    className?: string;
    striped?: boolean;
    animated?: boolean;
    children?: ReactNode;
}

export interface ProgressLabelProps {
    children: ReactNode;
    position?: ProgressLabelPosition;
    className?: string;
}

export interface ProgressProps
    extends ProgressRootProps,
        Omit<
            ProgressSectionProps,
            "className" | "children" | "position" | "value"
        > {
    value?: number;
    label?: ReactNode;
    labelPosition?: ProgressLabelPosition;
    striped?: boolean;
    animated?: boolean;
}
