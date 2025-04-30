export type IndicatorPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
export type IndicatorSize = "xs" | "sm" | "md" | "lg";
export type IndicatorRadius = "none" | "sm" | "md" | "lg" | "full";

export interface IndicatorProps {
    children?: React.ReactNode;
    show?: boolean;
    position?: IndicatorPosition;
    size?: IndicatorSize;
    radius?: IndicatorRadius;
    withBorder?: boolean;
    content?: React.ReactNode;
    className?: string;
    classNames?: IndicatorClassNames;
}

export interface IndicatorClassNames {
    root?: string;
    indicator?: string;
}
