import React, { CSSProperties } from "react";

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextWrap = "wrap" | "nowrap" | "balance" | "pretty" | "stable";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    order?: TitleOrder;
    size?: TitleSize;
    textWrap?: TextWrap;
    lineClamp?: number;
    align?: CSSProperties["textAlign"];
    weight?: CSSProperties["fontWeight"] | number;
    color?: string;
    style?: CSSProperties;
    className?: string;
    children: React.ReactNode;
}
