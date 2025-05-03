import React from "react";
import { cx } from "../_theme";
import "../style.css";

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
                !disabled &&
                    !selected &&
                    !inRange &&
                    "hover:bg-[var(--lumin-dates-background-hover)]",
                weekend && "text-[var(--lumin-dates-error)]",
                selected &&
                    "bg-[var(--lumin-dates-primary)] hover:bg-[var(--lumin-dates-primary-hover)] text-[var(--lumin-dates-text)]",
                inRange &&
                    !selected &&
                    "bg-[var(--lumin-dates-secondary)] text-[var(--lumin-dates-text)]",
                outside
                    ? "text-[var(--lumin-dates-hint)]"
                    : "text-[var(--lumin-dates-text)]",
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
            {...others}
        >
            {children}
        </button>
    );
}
