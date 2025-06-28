import React from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsPosition = "top" | "bottom" | "left" | "right";
export type TabsVariant = "default" | "pills" | "segmented" | "underline";
export type TabsSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TabsClassNames {
    root?: string;
    list?: string;
    tab?: string;
    tabActive?: string;
    tabIcon?: string;
    tabLabel?: string;
    tabDescription?: string;
    tabRightSection?: string;
    indicator?: string;
    panel?: string;
}

export interface TabsContextType {
    value: string;
    onChange: (value: string) => void;
    orientation: TabsOrientation;
    variant: TabsVariant;
    size: TabsSize;
    position: TabsPosition;
    withBorder: boolean;
    fullWidth: boolean;
    grow: boolean;
    classNames?: TabsClassNames;
}

export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    orientation?: TabsOrientation;
    variant?: TabsVariant;
    size?: TabsSize;
    position?: TabsPosition;
    withBorder?: boolean;
    fullWidth?: boolean;
    grow?: boolean;
    className?: string;
    classNames?: TabsClassNames;
    children: React.ReactNode;
}

export interface TabsTabProps {
    value: string;
    label: React.ReactNode;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    registerTab?: (value: string, element: HTMLElement | null) => void;
}

export interface TabsListProps {
    className?: string;
    children: React.ReactNode;
}

// Tabs.Panel props
export interface TabsPanelProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    keepMounted?: boolean;
}
