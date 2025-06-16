import React from "react";
import { IndicatorProps } from "./types";
import { cx } from "../_theme";

export const Indicator = ({
    children,
    show = true,
    position = "top-right",
    size = "sm",
    label,
    style,
    className,
    classNames,
    ...props
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
        lg: "w-5 h-5 text-sm",
        xl: "w-6 h-6 text-base"
    };

    return (
        <div
            className={cx("relative inline-flex w-fit", classNames?.root)}
            {...props}
        >
            {children}
            {show && (
                <div
                    className={cx(
                        "absolute flex items-center justify-center bg-[var(--luminx-primary)] rounded-full",
                        sizeClasses[size],
                        positionClasses[position],
                        label && "w-fit px-1",
                        classNames?.indicator,
                        className
                    )}
                >
                    {label}
                </div>
            )}
        </div>
    );
};
