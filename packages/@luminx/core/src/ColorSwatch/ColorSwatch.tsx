import React, { forwardRef } from "react";
import { ColorSwatchProps } from "./types";
import { cx, getRadius, getShadow } from "../_theme";

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
    (
        {
            children,
            color,
            as = "div",
            shadow,
            size = 25,
            radius,
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
                className={cx(
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
                    className={cx("absolute inset-0", classNames?.colorOverlay)}
                    style={{ backgroundColor: color }}
                />

                {children && (
                    <div className={cx("relative z-10", classNames?.child)}>
                        {children}
                    </div>
                )}
            </Element>
        );
    }
);

ColorSwatch.displayName = "@luminx/core/ColorSwatch";

export default ColorSwatch;
