import React from "react";
import { cn } from "../_utils";
import { IndicatorProps } from "./types";
import { getRadius } from "../_theme";

export const Indicator = ({
    children,
    show = true,
    position = "top-right",
    size = "md",
    radius = "full",
    withBorder = false,
    content,
    className,
    classNames
}: IndicatorProps) => {
    const positionClasses = {
        "top-right": "top-0 right-0 -translate-y-1/4 translate-x-1/4",
        "top-left": "top-0 left-0 -translate-y-1/4 -translate-x-1/4",
        "bottom-right": "bottom-0 right-0 translate-y-1/4 translate-x-1/4",
        "bottom-left": "bottom-0 left-0 translate-y-1/4 -translate-x-1/4"
    };

    const sizeClasses = {
        xs: "w-2 h-2 text-[0.5rem]",
        sm: "w-3 h-3 text-[0.625rem]",
        md: "w-4 h-4 text-xs",
        lg: "w-5 h-5 text-sm"
    };

    return (
        <div
            className={cn("relative inline-flex", classNames?.root, className)}
        >
            {children}
            {show && (
                <div
                    className={cn(
                        "absolute flex items-center justify-center bg-[var(--lumin-primary)]",
                        sizeClasses[size],
                        positionClasses[position],
                        withBorder && "ring-2 ring-white dark:ring-gray-900",
                        content ? "min-w-4 px-1" : "",
                        classNames?.indicator
                    )}
                    style={{
                        ...getRadius(radius)
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};
