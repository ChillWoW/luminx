import { InputProps } from "../Input";
import { ColorFormat } from "../ColorPicker/types";
import { ColorSwatchProps } from "../ColorSwatch";

export interface ColorInputProps extends Omit<InputProps, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    format?: ColorFormat;
    hidePreview?: boolean;
    showEyeDropper?: boolean;
    colorSwatchProps?: ColorSwatchProps;
    classNames?: ColorInputClassNames & InputProps["classNames"];
}

export interface ColorInputClassNames {
    colorSwatch?: string;
    colorPicker?: string;
}
