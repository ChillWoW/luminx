import { forwardRef } from "react";
import { AppShellNavbarHeaderProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellNavbarHeader = forwardRef<
    HTMLDivElement,
    AppShellNavbarHeaderProps
>((props, ref) => {
    const { children, className, style, ...rest } = props;

    const { theme, cx } = useTheme();

    return (
        <div
            ref={ref}
            className={cx(
                "p-4 border-b",
                theme === "light"
                    ? "border-[var(--luminx-light-border)] bg-[var(--luminx-light-0)]"
                    : "border-[var(--luminx-dark-border)] bg-[var(--luminx-dark-7)]",
                className
            )}
            style={style}
            {...rest}
        >
            {children}
        </div>
    );
});

AppShellNavbarHeader.displayName = "@luminx/core/AppShell.NavbarHeader";
