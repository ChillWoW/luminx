import React from "react";
import { cn } from "../_utils";
import { useTabs } from "./context";
import { TabsPanelProps } from "./types";
import "../style.css";

export const TabsPanel = ({
    value,
    children,
    className,
    keepMounted = false
}: TabsPanelProps) => {
    const { value: activeValue, withBorder, classNames } = useTabs();
    const isActive = activeValue === value;

    if (!isActive && !keepMounted) {
        return null;
    }

    return (
        <div
            role="tabpanel"
            aria-hidden={!isActive}
            className={cn(
                "p-4",
                withBorder && "border-t-0 border-[var(--lumin-border)]",
                !isActive && "hidden",
                classNames?.panel,
                className
            )}
        >
            {children}
        </div>
    );
};

TabsPanel.displayName = "TabsPanel";
