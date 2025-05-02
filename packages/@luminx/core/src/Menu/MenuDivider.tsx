import React from "react";
import { cx } from "../_theme";
import { MenuDividerProps } from "./types";
import { useMenu } from "./context";
import "../style.css";

export const MenuDivider = ({ className }: MenuDividerProps) => {
    const { classNames } = useMenu();

    return (
        <div
            className={cx(
                "my-1 h-px bg-[var(--lumin-border)]",
                className,
                classNames?.divider
            )}
            role="separator"
        />
    );
};

MenuDivider.displayName = "@luminx/core/Menu.Divider";
