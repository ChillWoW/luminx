import { useTheme } from "@luminx/core";
import React from "react";

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
    const { cx } = useTheme();

    const columnClassMap = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6"
    } as const;

    const columnClass =
        columnClassMap[columns as keyof typeof columnClassMap] || "grid-cols-3";

    return (
        <div className={cx("grid gap-2", columnClass, className)}>
            {children}
        </div>
    );
}
