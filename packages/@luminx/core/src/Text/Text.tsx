import { forwardRef } from "react";
import { TextProps } from "./types";
import { cx, useTheme } from "../_theme";

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
    (
        {
            size = "md",
            weight = "normal",
            align,
            lineClamp,
            truncate,
            inline,
            inherit,
            italic,
            underline,
            span,
            dimmed,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();
        const Component = span ? "span" : "p";

        const getSizeClass = () => {
            if (typeof size === "number") return `text-[${size}px]`;

            const map = {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                base: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
                "4xl": "text-4xl",
                "5xl": "text-5xl",
                "6xl": "text-6xl",
                "7xl": "text-7xl",
                "8xl": "text-8xl",
                "9xl": "text-9xl",
                "10xl": "text-[10rem]"
            };

            return map[size as keyof typeof map] || `text-[${size}]`;
        };

        const getWeightClass = () => {
            if (typeof weight === "number") return `font-[${weight}]`;

            const map = {
                thin: "font-thin",
                extralight: "font-extralight",
                light: "font-light",
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                extrabold: "font-extrabold",
                black: "font-black",
                100: "font-thin",
                200: "font-extralight",
                300: "font-light",
                400: "font-normal",
                500: "font-medium",
                600: "font-semibold",
                700: "font-bold",
                800: "font-extrabold",
                900: "font-black"
            };

            return map[weight as keyof typeof map] || `font-[${weight}]`;
        };

        const getAlignClass = () => {
            const map = {
                left: "text-left",
                center: "text-center",
                right: "text-right",
                justify: "text-justify",
                start: "text-start",
                end: "text-end"
            };

            return map[align as keyof typeof map] || "";
        };

        const getLineClampClass = () => {
            if (!lineClamp) return "";
            return `line-clamp-${lineClamp}`;
        };

        const getTruncateClass = () => {
            if (!truncate) return "";

            return truncate === "start" ? "truncate rtl text-left" : "truncate";
        };

        const classes = cx(
            theme === "light"
                ? "text-[var(--luminx-light-text)]"
                : "text-[var(--luminx-dark-text)]",

            dimmed &&
                (theme === "light"
                    ? "text-[var(--luminx-light-hint)]"
                    : "text-[var(--luminx-dark-hint)]"),

            !inherit && getSizeClass(),
            !inherit && getWeightClass(),
            !inherit && getAlignClass(),

            getLineClampClass(),
            getTruncateClass(),
            inline && "inline",
            inherit && "text-inherit font-inherit",
            italic && "italic",
            underline && "underline",

            className
        );

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    }
);

Text.displayName = "@luminx/core/Text";
