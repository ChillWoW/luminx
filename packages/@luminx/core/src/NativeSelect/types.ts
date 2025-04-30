import { InputProps } from "../Input";

export interface NativeSelectProps
    extends Omit<InputProps, "component" | "type"> {
    options: Array<{ value: string; label: string }>;
    multiple?: boolean;
    size?: number;
}
