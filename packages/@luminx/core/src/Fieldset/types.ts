import { HTMLAttributes } from "react";
import { Radius } from "../_theme";

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  disabled?: boolean;
  radius?: Radius;
  classNames?: FieldsetClassNames;
}

export interface FieldsetClassNames {
  root?: string;
  legend?: string;
}
