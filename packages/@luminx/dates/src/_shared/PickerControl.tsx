import React from "react";
import { useTheme } from "@luminx/core";

export interface PickerControlProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    inRange?: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    disabled?: boolean;
    outside?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    weekend?: boolean;
}

export function PickerControl({
    children,
    selected,
    inRange,
    isRangeStart,
    isRangeEnd,
    disabled,
    outside,
    weekend,
    size = "md",
    className,
    ...others
}: PickerControlProps) {
    const { theme, cx } = useTheme();

    const sizeClasses = {
        xs: "px-1 py-0.5 text-xs min-h-[24px]",
        sm: "px-2 py-1 text-sm min-h-[28px]",
        md: "px-2 py-1 min-h-[32px]",
        lg: "px-3 py-1.5 text-lg min-h-[36px]",
        xl: "px-4 py-2 text-xl min-h-[40px]"
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={cx(
                "rounded-md transition-colors text-center font-medium w-full flex items-center justify-center",
                sizeClasses[size],
                !disabled && !selected && !inRange && theme === "light"
                    ? "hover:bg-[var(--luminx-light-background-hover)]"
                    : "hover:bg-[var(--luminx-dark-background-hover)]",
                selected &&
                    "bg-[var(--luminx-primary)] hover:bg-[var(--luminx-primary-hover)] text-[var(--luminx-text)]",
                selected && isRangeStart && "rounded-r-none",
                selected && isRangeEnd && "rounded-l-none",
                inRange &&
                    !selected &&
                    "bg-[var(--luminx-primary-light)] text-[var(--luminx-dark-text)] rounded-none",
                outside
                    ? theme === "light"
                        ? "text-[var(--luminx-light-hint)]"
                        : "text-[var(--luminx-dark-hint)]"
                    : theme === "light"
                    ? "text-[var(--luminx-light-text)]"
                    : "text-[var(--luminx-dark-text)]",
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
            {...others}
        >
            {children}
        </button>
    );
}
