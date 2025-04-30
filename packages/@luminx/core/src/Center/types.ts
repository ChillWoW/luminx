import { CSSProperties, HTMLAttributes } from "react";

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
}
