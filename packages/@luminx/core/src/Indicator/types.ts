import { CSSProperties, ReactNode } from "react";
import { Radius, Shadow } from "../_theme";

export type IndicatorPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
export type IndicatorSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IndicatorProps {
    children?: ReactNode;
    show?: boolean;
    position?: IndicatorPosition;
    size?: IndicatorSize;
    radius?: Radius;
    shadow?: Shadow;
    withBorder?: boolean;
    label?: string | ReactNode;
    style?: CSSProperties;
    className?: string;
    classNames?: IndicatorClassNames;
}

export interface IndicatorClassNames {
    root?: string;
    indicator?: string;
}
