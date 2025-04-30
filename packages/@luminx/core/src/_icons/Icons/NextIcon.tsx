import React from "react";
import { cn } from "../../_utils";

interface IconProps {
    size?: number;
    className?: string;
}

export const NextIcon = ({ size = 24, className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("flex-shrink-0", className)}
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);
