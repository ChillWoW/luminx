import React from "react";
import { cn } from "../../_utils";

interface IconProps {
    size?: number;
    className?: string;
    onClick?: () => void;
}

export const ChevronIcon = ({ className, size = 20, onClick }: IconProps) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 5L5 1L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
