import { HTMLAttributes } from "react";
import { Radius, Shadow } from "../_theme";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    height?: string | number;
    width?: string | number;
    radius?: Radius;
    shadow?: Shadow;
    animate?: boolean;
    visible?: boolean;
    className?: string;
}
