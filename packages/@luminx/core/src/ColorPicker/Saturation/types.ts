import { HTMLAttributes } from "react";

export interface SaturationProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value: { h: number; s: number; v: number; a: number };
    onChange: (value: { h: number; s: number; v: number; a: number }) => void;
    color: string;
    className?: string;
}
