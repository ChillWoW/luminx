import { ReactNode } from "react";

export type ProgressCircleLabelPosition = "center" | "bottom";

export interface ProgressCircleClassNames {
    root?: string;
    wrapper?: string;
    section?: string;
    svg?: string;
    track?: string;
    progress?: string;
    label?: string;
}

export interface ProgressCircleRootProps {
    children?: ReactNode;
    size?: number;
    className?: string;
    thickness?: number;
    classNames?: ProgressCircleClassNames;
}

export interface ProgressCircleSectionProps {
    value: number;
    className?: string;
    children?: ReactNode;
    rounded?: boolean;
    classNames?: ProgressCircleClassNames;
}

export interface ProgressCircleLabelProps {
    children: ReactNode;
    position?: ProgressCircleLabelPosition;
    className?: string;
    classNames?: ProgressCircleClassNames;
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
    rounded?: boolean;
    classNames?: ProgressCircleClassNames;
}
