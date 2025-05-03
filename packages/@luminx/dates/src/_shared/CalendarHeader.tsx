import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "../style.css";

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
    return (
        <div className="flex items-center justify-between mb-3 select-none">
            <button
                className="flex items-center justify-center p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-[var(--lumin-dates-text)] hover:bg-[var(--lumin-dates-background-hover)]"
                disabled={previousDisabled}
                onClick={onPrevious}
                aria-label={previousLabel}
            >
                <IconChevronLeft />
            </button>

            <button
                className="w-full font-medium text-[var(--lumin-dates-text)] hover:bg-[var(--lumin-dates-background-hover)] px-2 py-1 rounded-md"
                onClick={onLabelClick}
                aria-label="Change view"
            >
                {label}
            </button>

            <button
                className="flex items-center justify-center p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-[var(--lumin-dates-text)] hover:bg-[var(--lumin-dates-background-hover)]"
                disabled={nextDisabled}
                onClick={onNext}
                aria-label={nextLabel}
            >
                <IconChevronRight />
            </button>
        </div>
    );
}
