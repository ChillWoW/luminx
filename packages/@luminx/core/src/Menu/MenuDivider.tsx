import React from "react";
import { cn } from "../_utils";
import { MenuDividerProps } from "./types";
import { useMenu } from "./context";

export const MenuDivider = ({ className }: MenuDividerProps) => {
    const { classNames } = useMenu();

    return (
        <div
            className={cn(
                "my-1 h-px bg-[var(--lumin-border)]",
                className,
                classNames?.divider
            )}
            role="separator"
        />
    );
};

MenuDivider.displayName = "Menu.Divider";
