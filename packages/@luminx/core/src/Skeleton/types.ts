import { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    height?: string | number;
    width?: string | number;
    animate?: boolean;
    visible?: boolean;
    className?: string;
}
