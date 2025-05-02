import React from "react";
import { Radius, Shadow } from "../_theme";

export type PillSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: PillSize;
    withRemoveButton?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    radius?: Radius;
    shadow?: Shadow;
    classNames?: PillClassNames;
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

export interface PillClassNames {
    root?: string;
    label?: string;
    remove?: string;
}

export interface PillGroupProps {
    children?: React.ReactNode;
    size?: PillSize;
    withRemoveButton?: boolean;
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    radius?: Radius;
    shadow?: Shadow;
    className?: string;
}

export interface PillGroupContextType {
    size?: PillSize;
    withRemoveButton?: boolean;
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    radius?: Radius;
    shadow?: Shadow;
    disabled?: boolean;
}
