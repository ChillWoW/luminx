import { InputProps } from "../Input";

export interface TextareaProps extends Omit<InputProps, "component" | "type"> {
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
    minRows?: number;
    maxRows?: number;
    autoSize?: boolean;
}
