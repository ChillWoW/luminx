import { forwardRef } from "react";
import { AppShellMainProps } from "./types";
import { useTheme } from "../_theme";

export const AppShellMain = forwardRef<HTMLElement, AppShellMainProps>(
    (props, ref) => {
        const { children, className, style, ...rest } = props;

        const { theme, cx } = useTheme();

        return (
            <main
                ref={ref}
                className={cx(
                    "flex-1 p-4 overflow-auto",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    className
                )}
                style={style}
                {...rest}
            >
                {children}
            </main>
        );
    }
);

AppShellMain.displayName = "@luminx/core/AppShell.Main";
