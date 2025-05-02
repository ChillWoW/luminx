import { forwardRef } from "react";
import { TextProps } from "./types";
import { cx } from "../_theme";

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
    (
        {
            size = "md",
            weight = "normal",
            align = "left",
            lineClamp,
            truncate,
            inline,
            inherit,
            span,
            color,
            dimmed,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const Component = span ? "span" : "p";

        const sizeMap = {
            xs: "0.75rem", // 12px
            sm: "0.875rem", // 14px
            md: "1rem", // 16px
            base: "1rem", // 16px
            lg: "1.125rem", // 18px
            xl: "1.25rem", // 20px
            "2xl": "1.5rem", // 24px
            "3xl": "1.875rem", // 30px
            "4xl": "2.25rem", // 36px
            "5xl": "3rem", // 42px
            "6xl": "3.75rem", // 48px
            "7xl": "4.5rem", // 54px
            "8xl": "6rem", // 60px
            "9xl": "8rem", // 66px
            "10xl": "10rem" // 72px
        };

        const getSize = () => {
            if (typeof size === "number") {
                return `${size}px`;
            }

            return sizeMap[size as keyof typeof sizeMap] || size;
        };

        const combinedStyle: React.CSSProperties = {
            textAlign: align,
            fontWeight: weight,
            fontSize: getSize(),
            ...(dimmed ? { color: "var(--lumin-hint)" } : { color }),
            ...style
        };

        if (lineClamp) {
            combinedStyle.display = "-webkit-box";
            combinedStyle.WebkitLineClamp = lineClamp;
            combinedStyle.WebkitBoxOrient = "vertical";
            combinedStyle.overflow = "hidden";
        }

        if (truncate) {
            combinedStyle.overflow = "hidden";
            combinedStyle.textOverflow = "ellipsis";
            combinedStyle.whiteSpace = "nowrap";

            if (truncate === "start") {
                combinedStyle.direction = "rtl";
                combinedStyle.textAlign = "left";
            }
        }

        if (inline) {
            combinedStyle.display = "inline";
        }

        if (inherit) {
            combinedStyle.fontSize = "inherit";
            combinedStyle.fontWeight = "inherit";
            combinedStyle.color = "inherit";
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

Text.displayName = "@luminx/core/Text";
