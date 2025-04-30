import React from "react";
import { StackAlign, StackJustify, StackProps } from "./types";
import { cn } from "../_utils";

export const Stack = ({
    children,
    align,
    justify,
    gap,
    className,
    style
}: StackProps) => {
    const getAlignClass = () => {
        const alignMap: Record<string, string> = {
            stretch: "items-stretch",
            center: "items-center",
            "flex-start": "items-start",
            "flex-end": "items-end"
        };

        return alignMap[align as StackAlign] || "";
    };

    const getJustifyClass = () => {
        const justifyMap: Record<string, string> = {
            center: "justify-center",
            "flex-start": "justify-start",
            "flex-end": "justify-end",
            "space-between": "justify-between",
            "space-around": "justify-around"
        };

        return justifyMap[justify as StackJustify] || "";
    };

    const getGapClass = () => {
        if (typeof gap === "number") return `gap-[${gap}px]`;

        const spacingMap: Record<string, string> = {
            none: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8"
        };

        return spacingMap[gap as keyof typeof spacingMap] || `gap-[${gap}]`;
    };

    return (
        <div
            className={cn(
                "flex flex-col",
                getAlignClass(),
                getJustifyClass(),
                getGapClass(),
                className
            )}
        >
            {children}
        </div>
    );
};
