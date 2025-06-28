import { forwardRef } from "react";
import { AppShellNavbarFooterProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellNavbarFooter = forwardRef<
    HTMLDivElement,
    AppShellNavbarFooterProps
>((props, ref) => {
    const { children, className, style, ...rest } = props;

    const { theme, cx } = useTheme();

    return (
        <div
            ref={ref}
            className={cx(
                "p-4 border-t",
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

AppShellNavbarFooter.displayName = "@luminx/core/AppShell.NavbarFooter";
