import { TextProps } from "../Text/types";

export interface HighlightProps extends Omit<TextProps, "children"> {
    highlight: string | string[];
    children: string;
    className?: string;
    classNames?: HighlightClassNames;
}

export interface HighlightClassNames {
    highlight?: string;
    text?: string;
}
