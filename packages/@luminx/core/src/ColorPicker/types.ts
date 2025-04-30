// src/ui/ColorPicker/types.ts
import { HTMLAttributes } from "react";

export type ColorFormat =
    | "hex"
    | "hexa"
    | "rgb"
    | "rgba"
    | "hsl"
    | "hsla"
    | "hsv"
    | "hsva";
export type ColorPickerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ColorPickerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    // Core functionality
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    format?: ColorFormat;

    // Appearance
    size?: ColorPickerSize;
    fullWidth?: boolean;

    // Features
    swatches?: string[];
    swatchesPerRow?: number;
    swatchesTooltip?: boolean;
    withPicker?: boolean;

    // Accessibility
    saturationLabel?: string;
    hueLabel?: string;
    alphaLabel?: string;

    // Styling
    className?: string;
    classNames?: ColorPickerClassNames;
}

export interface ColorPickerClassNames {
    wrapper?: string;
    preview?: string;
    body?: string;
    slider?: string;
    sliderOverlay?: string;
    saturation?: string;
    saturationOverlay?: string;
    sliders?: string;
    thumb?: string;
    swatch?: string;
    swatches?: string;
}

export interface HueSliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: number;
    onChange: (value: number) => void;
    size?: ColorPickerSize;
    className?: string;
    thumbSize?: number;
    label?: string;
}

export interface AlphaSliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: number;
    onChange: (value: number) => void;
    color: string;
    size?: ColorPickerSize;
    className?: string;
    thumbSize?: number;
    label?: string;
}

export interface SaturationProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: { h: number; s: number; v: number; a: number };
    onChange: (value: { h: number; s: number; v: number; a: number }) => void;
    size?: ColorPickerSize;
    color: string;
    className?: string;
    label?: string;
}
