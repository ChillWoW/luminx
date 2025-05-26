import { HTMLAttributes } from "react";
import { Radius } from "../_theme";

export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    marks?: SliderMark[];
    label?: SliderLabel;
    labelAlwaysOn?: boolean;
    thumbSize?: number;
    thumbColor?: string;
    trackColor?: string;
    barColor?: string;
    disabled?: boolean;
    inverted?: boolean;
    showLabelOnHover?: boolean;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    size?: SliderSize;
    radius?: Radius;
    className?: string;
    classNames?: SliderClassNames;
}

export interface SliderMark {
    value: number;
    label?: React.ReactNode;
}

export type SliderLabel = ((value: number) => React.ReactNode) | null;

export interface SliderClassNames {
    root?: string;
    label?: string;
    thumb?: string;
    trackContainer?: string;
    track?: string;
    bar?: string;
    markWrapper?: string;
    mark?: string;
    markLabel?: string;
}
