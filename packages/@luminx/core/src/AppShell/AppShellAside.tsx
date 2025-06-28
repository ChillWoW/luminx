import { forwardRef } from "react";
import { AppShellAsideProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellAside = forwardRef<HTMLElement, AppShellAsideProps>(
    (props, ref) => {
        const {
            children,
            width = "md",
            withBorder = false,
            className,
            style,
            ...rest
        } = props;

        const { theme, cx } = useTheme();

        const getSizeValue = (size: string | number) => {
            if (typeof size === "number") return `${size}px`;

            const sizeMap = {
                xs: "200px",
                sm: "240px",
                md: "280px",
                lg: "320px",
                xl: "360px"
            };

            return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
        };

        const getBorder = () => {
            if (!withBorder) return "";
            return theme === "light"
                ? "border-l border-[var(--luminx-light-border)]"
                : "border-l border-[var(--luminx-dark-border)]";
        };

        return (
            <aside
                ref={ref}
                className={cx(
                    "flex flex-col p-4 overflow-auto h-full",
                    theme === "light"
                        ? "bg-[var(--luminx-light-1)]"
                        : "bg-[var(--luminx-dark-6)]",
                    getBorder(),
                    className
                )}
                style={{
                    width: getSizeValue(width),
                    ...style
                }}
                {...rest}
            >
                {children}
            </aside>
        );
    }
);

AppShellAside.displayName = "@luminx/core/AppShell.Aside";
