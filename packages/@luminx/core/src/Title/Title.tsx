import { forwardRef } from "react";
import { TitleProps, TitleSize } from "./types";
import { cx } from "../_theme";

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
    (
        {
            order = 1,
            size,
            textWrap = "wrap",
            lineClamp,
            align,
            weight,
            color,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const Component = `h${order}` as
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6";

        const sizeMap = {
            h1: "2.5rem", // 40px
            h2: "2rem", // 32px
            h3: "1.5rem", // 24px
            h4: "1.25rem", // 20px
            h5: "1.125rem", // 18px
            h6: "1rem" // 16px
        };

        const headingSize = size
            ? sizeMap[size]
            : sizeMap[`h${order}` as TitleSize];

        const combinedStyle: React.CSSProperties = {
            fontSize: headingSize,
            textAlign: align,
            fontWeight: weight || (order <= 2 ? "bold" : "semibold"),
            whiteSpace: textWrap === "nowrap" ? "nowrap" : "normal",
            textWrap:
                textWrap !== "wrap" && textWrap !== "nowrap"
                    ? textWrap
                    : undefined,
            color,
            ...style
        };

        if (lineClamp) {
            combinedStyle.display = "-webkit-box";
            combinedStyle.WebkitLineClamp = lineClamp;
            combinedStyle.WebkitBoxOrient = "vertical";
            combinedStyle.overflow = "hidden";
        }

        return (
            <Component
                ref={ref}
                className={cx(className)}
                style={combinedStyle}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
