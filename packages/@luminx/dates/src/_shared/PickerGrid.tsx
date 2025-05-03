import React from "react";
import { cx } from "../_theme";

export interface PickerGridProps {
    children: React.ReactNode;
    columns?: number;
    className?: string;
}

export function PickerGrid({
    children,
    columns = 3,
    className
}: PickerGridProps) {
    const getColumnClass = () => {
        switch (columns) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            case 5:
                return "grid-cols-5";
            case 6:
                return "grid-cols-6";
            default:
                return "grid-cols-3";
        }
    };

    return (
        <div className={cx("grid gap-2", getColumnClass(), className)}>
            {children}
        </div>
    );
}
