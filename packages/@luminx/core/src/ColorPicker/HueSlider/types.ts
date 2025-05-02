import { HTMLAttributes } from "react";

export interface HueSliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: number;
    onChange: (value: number) => void;
    className?: string;
}
