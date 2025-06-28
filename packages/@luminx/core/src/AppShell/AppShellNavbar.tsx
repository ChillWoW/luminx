import { forwardRef } from "react";
import { AppShellNavbarProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellNavbar = forwardRef<HTMLElement, AppShellNavbarProps>(
    (props, ref) => {
        const {
            children,
            width = "md",
            collapsed = false,
            withBorder = false,
            header,
            footer,
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
                ? "border-r border-[var(--luminx-light-border)]"
                : "border-r border-[var(--luminx-dark-border)]";
        };

        if (collapsed) return null;

        return (
            <nav
                ref={ref}
                className={cx(
                    "flex flex-col h-full",
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
                {header && <div className="flex-shrink-0">{header}</div>}

                <div className="flex-1 overflow-auto">{children}</div>

                {footer && <div className="flex-shrink-0">{footer}</div>}
            </nav>
        );
    }
);

AppShellNavbar.displayName = "@luminx/core/AppShell.Navbar";
