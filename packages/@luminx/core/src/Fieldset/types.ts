import { HTMLAttributes } from "react";

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
    legend?: string;
    disabled?: boolean;
    classNames?: FieldsetClassNames;
}

export interface FieldsetClassNames {
    root?: string;
    legend?: string;
}
