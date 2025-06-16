import React, { forwardRef } from "react";
import { ColorSwatchProps } from "./types";
import { cx } from "../_theme";

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
    (
        {
            children,
            color,
            component: Component = "div",
            size = 25,
            style,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const Element = Component as React.ElementType;

        return (
            <Element
                ref={ref}
                className={cx(
                    "relative inline-flex items-center justify-center rounded-full overflow-hidden",
                    classNames?.root,
                    className
                )}
                style={{
                    width: size,
                    height: size,
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
