import React, { useState, useEffect } from "react";
import { cx } from "../_theme";
import { TabsList } from "./TabsList";
import { TabsTab } from "./TabsTab";
import { TabsPanel } from "./TabsPanel";
import { TabsProps } from "./types";
import { TabsContext } from "./context";

export const Tabs = ({
    defaultValue,
    value,
    onChange,
    orientation = "horizontal",
    variant = "default",
    size = "md",
    position = "top",
    withBorder = true,
    fullWidth = false,
    grow = false,
    className,
    classNames,
    children
}: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue || "");
    const currentValue = value !== undefined ? value : activeTab;

    useEffect(() => {
        if (value !== undefined) {
            setActiveTab(value);
        }
    }, [value]);

    const handleTabChange = (newValue: string) => {
        if (value === undefined) {
            setActiveTab(newValue);
        }
        onChange?.(newValue);
    };

    const contextValue = {
        value: currentValue,
        onChange: handleTabChange,
        orientation,
        variant,
        size,
        position,
        withBorder,
        fullWidth,
        grow,
        classNames
    };

    const isVertical = orientation === "vertical";

    return (
        <TabsContext.Provider value={contextValue}>
            <div
                className={cx(
                    "tabs-root",
                    isVertical ? "flex flex-row" : "flex flex-col",
                    className,
                    classNames?.root
                )}
                data-orientation={orientation}
                data-position={position}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
};

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

Tabs.displayName = "@luminx/core/Tabs";
