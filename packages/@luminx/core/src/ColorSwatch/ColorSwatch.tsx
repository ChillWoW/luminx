import React, { forwardRef } from "react";
import { cn } from "../_utils";
import { ColorSwatchProps } from "./types";
import { getRadius, getShadow } from "../_theme";

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
    (
        {
            children,
            color,
            as = "div",
            shadow = "none",
            size = 25,
            radius = "sm",
            style,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const Element = as as React.ElementType;

        return (
            <Element
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center overflow-hidden",
                    classNames?.root,
                    className
                )}
                style={{
                    width: size,
                    height: size,
                    ...getRadius(radius),
                    ...getShadow(shadow),
                    ...style
                }}
                {...props}
            >
                <div
                    className={cn("absolute inset-0", classNames?.colorOverlay)}
                    style={{ backgroundColor: color }}
                />

                {children && (
                    <div className={cn("relative z-10", classNames?.child)}>
                        {children}
                    </div>
                )}
            </Element>
        );
    }
);

ColorSwatch.displayName = "ColorSwatch";

export default ColorSwatch;
