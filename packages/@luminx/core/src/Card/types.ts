import { ReactNode } from "react";

export type CardPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type CardRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type CardShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: CardPadding;
    radius?: CardRadius;
    shadow?: CardShadow;
    withBorder?: boolean;
    className?: string;
}
