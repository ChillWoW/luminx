import React from "react";
import { cn } from "../../_utils";

export interface VisibilityIconProps {
    reveal: boolean;
    size?: number;
    className?: string;
}

export const VisibilityIcon = ({
    reveal,
    size = 16,
    className
}: VisibilityIconProps) => (
    <svg
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
        {reveal ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
                <path d="m2 2 20 20" />
            </>
        ) : (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        )}
    </svg>
);
