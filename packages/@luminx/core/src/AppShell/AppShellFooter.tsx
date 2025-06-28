import { forwardRef } from "react";
import { AppShellFooterProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellFooter = forwardRef<HTMLElement, AppShellFooterProps>(
    (props, ref) => {
        const {
            children,
            height = "md",
            withBorder = false,
            className,
            style,
            ...rest
        } = props;

        const { theme, cx } = useTheme();

        const getSizeValue = (size: string | number) => {
            if (typeof size === "number") return `${size}px`;

            const sizeMap = {
                xs: "48px",
                sm: "56px",
                md: "64px",
                lg: "72px",
                xl: "80px"
            };

            return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
        };

        const getBorder = () => {
            if (!withBorder) return "";
            return theme === "light"
                ? "border-t border-[var(--luminx-light-border)]"
                : "border-t border-[var(--luminx-dark-border)]";
        };

        return (
            <footer
                ref={ref}
                className={cx(
                    "flex items-center px-4",
                    theme === "light"
                        ? "bg-[var(--luminx-light-0)]"
                        : "bg-[var(--luminx-dark-7)]",
                    getBorder(),
                    className
                )}
                style={{
                    height: getSizeValue(height),
                    ...style
                }}
                {...rest}
            >
                {children}
            </footer>
        );
    }
);

AppShellFooter.displayName = "@luminx/core/AppShell.Footer";
