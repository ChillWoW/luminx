import React from "react";
import { cn } from "../_utils";
import "../style.css";

interface IconProps {
    size?: number;
    className?: string;
    onClick?: () => void;
}

export const CheckIcon = ({ size = 20, className }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={size}
            height={size}
            viewBox="0 0 30 30"
            className={cn("mr-2 flex-shrink-0", className)}
        >
            <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
        </svg>
    );
};

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

export const ChevronIcon = ({ className, size = 20, onClick }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            width={size}
            height={size}
            className={cn("text-[var(--lumin-hint)] cursor-pointer", className)}
            onClick={onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
        </svg>
    );
};
