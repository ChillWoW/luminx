import React, { forwardRef } from "react";
import { ColorSwatchProps } from "./types";
import { cx } from "../_theme";

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
    (
        {
            children,
            color,
            component: Component = "div",
            backgroundGrid = true,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const Element = Component as React.ElementType;

        const transparencyGridStyle = {
            backgroundImage: `
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)
            `,
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 4px 4px",
            backgroundColor: "#ffffff"
        };

        return (
            <Element
                ref={ref}
                className={cx(
                    "relative inline-flex items-center justify-center rounded-full overflow-hidden w-6 h-6",
                    classNames?.root,
                    className
                )}
                style={backgroundGrid && transparencyGridStyle}
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
