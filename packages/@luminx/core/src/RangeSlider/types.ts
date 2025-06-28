import { HTMLAttributes } from "react";

export type RangeSliderSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface RangeSliderValue {
    min: number;
    max: number;
}

export interface RangeSliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: RangeSliderValue;
    defaultValue?: RangeSliderValue;
    min?: number;
    max?: number;
    step?: number;
    marks?: RangeSliderMark[];
    snapToMarks?: boolean;
    label?: RangeSliderLabel;
    labelAlwaysOn?: boolean;
    thumbSize?: number;
    thumbColor?: string;
    thumbChildren?: React.ReactNode;
    trackColor?: string;
    barColor?: string;
    disabled?: boolean;
    inverted?: boolean;
    showLabelOnHover?: boolean;
    minRange?: number;
    maxRange?: number;
    allowCross?: boolean;
    onChange?: (value: RangeSliderValue) => void;
    onChangeEnd?: (value: RangeSliderValue) => void;
    size?: RangeSliderSize;
    className?: string;
    classNames?: RangeSliderClassNames;
}

export interface RangeSliderMark {
    value: number;
    label?: React.ReactNode;
}

export type RangeSliderLabel = ((value: number) => React.ReactNode) | null;

export interface RangeSliderClassNames {
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
