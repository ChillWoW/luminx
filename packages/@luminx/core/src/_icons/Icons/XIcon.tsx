import React from "react";
import { cn } from "../../_utils";

interface IconProps {
    size?: number;
    className?: string;
}

export const XIcon = ({ size = 10, className }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("flex-shrink-0", className)}
        >
            <path
                d="M9 1L1 9M1 1L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
