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

    const childrenArray = React.Children.toArray(children);

    const rows: React.ReactNode[][] = [];
    for (let i = 0; i < childrenArray.length; i += columns) {
        rows.push(childrenArray.slice(i, i + columns));
    }

    return (
        <div className={cx("flex flex-col gap-2", className)}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((child, colIndex) => (
                        <div
                            key={colIndex}
                            className="flex-1"
                            style={{ minWidth: 0 }}
                        >
                            {child}
                        </div>
                    ))}
                    {row.length < columns &&
                        Array.from({ length: columns - row.length }).map(
                            (_, emptyIndex) => (
                                <div
                                    key={`empty-${emptyIndex}`}
                                    className="flex-1"
                                />
                            )
                        )}
                </div>
            ))}
        </div>
    );
}
