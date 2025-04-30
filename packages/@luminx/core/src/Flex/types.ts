import { CSSProperties, HTMLAttributes, JSX } from "react";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
type FlexAlign = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type FlexJustify =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
type FlexGap = "xs" | "sm" | "md" | "lg" | "xl" | string | number;

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;

    gap?: FlexGap;

    rowGap?: FlexGap;

    columnGap?: FlexGap;

    direction?: FlexDirection;

    align?: FlexAlign;

    justify?: FlexJustify;

    wrap?: FlexWrap;

    as?: keyof JSX.IntrinsicElements;
}
