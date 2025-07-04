import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTheme } from "@luminx/core";

export interface CalendarHeaderProps {
    label: string;
    nextLabel?: string;
    previousLabel?: string;
    nextDisabled?: boolean;
    previousDisabled?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    onLabelClick?: () => void;
}

export function CalendarHeader({
    label,
    nextLabel,
    previousLabel,
    nextDisabled,
    previousDisabled,
    onNext,
    onPrevious,
    onLabelClick
}: CalendarHeaderProps) {
    const { theme, cx } = useTheme();

    return (
        <div className="flex items-center justify-between mb-3 select-none">
            <button
                className={cx(
                    "flex items-center justify-center p-1 rounded-md disabled:opacity-60 disabled:cursor-not-allowed",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)] hover:bg-[var(--luminx-light-background-hover)]"
                        : "text-[var(--luminx-dark-text)] hover:bg-[var(--luminx-dark-background-hover)]"
                )}
                disabled={previousDisabled}
                onClick={onPrevious}
                aria-label={previousLabel}
            >
                <IconChevronLeft size={18} />
            </button>

            <button
                className={cx(
                    "flex items-center justify-center w-fit font-medium px-3 py-1 rounded-md text-sm",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)] hover:bg-[var(--luminx-light-background-hover)]"
                        : "text-[var(--luminx-dark-text)] hover:bg-[var(--luminx-dark-background-hover)]"
                )}
                onClick={onLabelClick}
            >
                {label}
            </button>

            <button
                className={cx(
                    "flex items-center justify-center p-1 rounded-md disabled:opacity-60 disabled:cursor-not-allowed",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)] hover:bg-[var(--luminx-light-background-hover)]"
                        : "text-[var(--luminx-dark-text)] hover:bg-[var(--luminx-dark-background-hover)]"
                )}
                disabled={nextDisabled}
                onClick={onNext}
                aria-label={nextLabel}
            >
                <IconChevronRight size={18} />
            </button>
        </div>
    );
}
