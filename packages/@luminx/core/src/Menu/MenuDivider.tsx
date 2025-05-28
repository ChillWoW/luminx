import React from "react";
import { useTheme } from "../_theme";
import { MenuDividerProps } from "./types";
import { useMenu } from "./context";

export const MenuDivider = ({ className }: MenuDividerProps) => {
    const { theme, cx } = useTheme();
    const { classNames } = useMenu();

    return (
        <div
            className={cx(
                "my-1 h-px",
                theme === "light"
                    ? "bg-[var(--luminx-light-border)]"
                    : "bg-[var(--luminx-dark-border)]",
                className,
                classNames?.divider
            )}
            role="separator"
        />
    );
};

MenuDivider.displayName = "@luminx/core/Menu.Divider";
