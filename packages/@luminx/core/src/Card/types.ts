import { ReactNode } from "react";
import { Padding, Radius, Shadow } from "../_theme";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: Padding;
    radius?: Radius;
    shadow?: Shadow;
    withBorder?: boolean;
    className?: string;
}
