import React from "react";
import { cn } from "../../_utils";

interface IconProps {
    size?: number;
    className?: string;
    onClick?: () => void;
}

export const ClearIcon = ({ size = 16, className }: IconProps) => {
    return (
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
};
