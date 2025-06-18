import { HTMLAttributes } from "react";

export interface ByteFormatProps extends HTMLAttributes<HTMLSpanElement> {
    value: number;
    binary?: boolean;
    signed?: boolean;
    bits?: boolean;
    space?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}
