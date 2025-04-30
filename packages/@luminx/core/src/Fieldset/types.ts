import { HTMLAttributes } from "react";

export type FieldsetRadius = "none" | "sm" | "md" | "lg" | "xl";

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
    legend?: string;
    disabled?: boolean;
    radius?: FieldsetRadius;
    classNames?: FieldsetClassNames;
}

export interface FieldsetClassNames {
    root?: string;
    legend?: string;
}
