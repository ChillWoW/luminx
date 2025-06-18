import React from "react";
import { useTheme } from "@luminx/core";

export interface PickerControlProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    inRange?: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    disabled?: boolean;
    weekend?: boolean;
}

export function PickerControl({
    children,
    selected,
    inRange,
    isRangeStart,
    isRangeEnd,
    disabled,
    weekend,
    className,
    ...others
}: PickerControlProps) {
    const { theme, cx } = useTheme();

    return (
        <button
            type="button"
            disabled={disabled}
            className={cx(
                "rounded-md transition-colors text-center font-medium w-full flex items-center justify-center px-2 py-1 min-h-[32px] text-sm text-[var(--luminx-dark-text)]",
                weekend && "text-[var(--luminx-red-3)]",
                !selected &&
                    !disabled &&
                    !inRange &&
                    (theme === "light"
                        ? "hover:bg-[var(--luminx-light-background-hover)]"
                        : "hover:bg-[var(--luminx-dark-background-hover)]"),
                selected &&
                    "bg-[var(--luminx-primary)] text-[var(--luminx-dark-text)]",
                selected && isRangeStart && "rounded-r-none",
                selected && isRangeEnd && "rounded-l-none",
                inRange &&
                    !selected &&
                    "bg-[var(--luminx-primary-light)] text-[var(--luminx-dark-text)] rounded-none",
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
            {...others}
        >
            {children}
        </button>
    );
}
