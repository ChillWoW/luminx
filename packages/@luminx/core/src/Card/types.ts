import { ReactNode } from "react";
import { Radius, Shadow } from "../_theme";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    radius?: Radius;
    shadow?: Shadow;
    withBorder?: boolean;
    className?: string;
}
