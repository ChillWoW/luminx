import { HTMLAttributes } from "react";

export interface AlphaSliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: number;
    onChange: (value: number) => void;
    color: string;
    className?: string;
}
