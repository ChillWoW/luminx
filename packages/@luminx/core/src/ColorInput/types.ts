import { InputProps } from "../Input";
import { ColorPickerFormat, ColorPickerProps } from "../ColorPicker/types";
import { ColorSwatchProps } from "../ColorSwatch";

export interface ColorInputProps extends Omit<InputProps, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    format?: ColorPickerFormat;
    hidePreview?: boolean;
    showEyeDropper?: boolean;
    colorSwatchProps?: ColorSwatchProps;
    colorPickerProps?: ColorPickerProps;
    withPicker?: boolean;
    classNames?: ColorInputClassNames & InputProps["classNames"];
}

export interface ColorInputClassNames {
    colorSwatch?: string;
    colorPicker?: string;
}
