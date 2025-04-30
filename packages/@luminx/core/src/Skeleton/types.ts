import { HTMLAttributes } from "react";

export type SkeletonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    height?: string | number;
    width?: string | number;
    radius?: SkeletonRadius;
    circle?: boolean;
    animate?: boolean;
    visible?: boolean;
    className?: string;
}
