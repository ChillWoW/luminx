import { HTMLAttributes } from "react";

export type GroupAlign = "start" | "center" | "end";
export type GroupJustify =
    | "flex-start"
    | "center"
    | "space-between"
    | "flex-end";
export type GroupGap =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | string
    | number;
export type GroupWrap = "wrap" | "nowrap" | "wrap-reverse";

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    align?: GroupAlign;
    gap?: GroupGap;
    grow?: boolean;
    justify?: GroupJustify;
    preventOverflow?: boolean;
    wrap?: GroupWrap;
}
