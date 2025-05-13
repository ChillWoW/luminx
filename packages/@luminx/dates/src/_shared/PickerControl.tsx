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
        xs: "px-1 py-0.5 text-xs",
        sm: "px-2 py-1 text-sm",
        md: "px-2 py-1",
        lg: "px-3 py-1.5 text-lg",
        xl: "px-4 py-2 text-xl"
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={cx(
                "rounded-md transition-colors",
                sizeClasses[size],
                "text-center font-medium",
                !disabled && !selected && !inRange && theme === "light"
                    ? "hover:bg-[var(--luminx-light-background-hover)]"
                    : "hover:bg-[var(--luminx-dark-background-hover)]",
                weekend && "text-[var(--luminx-error)]",
                selected &&
                    "bg-[var(--luminx-primary)] hover:bg-[var(--luminx-primary-hover)] text-[var(--luminx-text)]",
                inRange &&
                    !selected &&
                    "bg-[var(--luminx-primary-light)] text-[var(--luminx-text)]",
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
