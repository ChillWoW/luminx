import React, { useState } from "react";
import { cx } from "../_theme";
import { PaginationProps } from "./types";
import { FirstIcon, LastIcon, NextIcon, PreviousIcon } from "../_icons";

export const Pagination = ({
    total,
    page,
    onChange,
    siblings = 1,
    boundaries = 1,
    className,
    classNames,
    disabled = false,
    size = "md",
    withControls = true,
    withEdges,
    withPages = true,
    label,
    ...props
}: PaginationProps) => {
    const [internalPage, setInternalPage] = useState(page || 1);

    const currentPage = page ?? internalPage;

    const handlePageChange = (newPage: number) => {
        if (
            !disabled &&
            newPage >= 1 &&
            newPage <= total &&
            newPage !== currentPage
        ) {
            if (onChange) {
                onChange(newPage);
            } else {
                setInternalPage(newPage);
            }
        }
    };

    const getRange = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const getPageNumbers = () => {
        const totalNumbers = siblings * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (total <= totalBlocks) {
            return getRange(1, total);
        }

        const leftSiblingIndex = Math.max(
            currentPage - siblings,
            1 + boundaries
        );
        const rightSiblingIndex = Math.min(
            currentPage + siblings,
            total - boundaries
        );

        const shouldShowLeftDots = leftSiblingIndex > boundaries + 1;
        const shouldShowRightDots = rightSiblingIndex < total - boundaries;

        const leftBoundary = getRange(1, boundaries);
        const rightBoundary = getRange(total - boundaries + 1, total);

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblings;
            return [...getRange(1, leftItemCount), "...", ...rightBoundary];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblings;
            return [
                ...leftBoundary,
                "...",
                ...getRange(total - rightItemCount + 1, total)
            ];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            return [
                ...leftBoundary,
                "...",
                ...getRange(leftSiblingIndex, rightSiblingIndex),
                "...",
                ...rightBoundary
            ];
        }

        return getRange(1, total);
    };

    const getSize = () => {
        const styles = {
            xs: {
                minWidth: "min-w-[24px]",
                height: "h-[24px]",
                fontSize: "text-xs"
            },
            sm: {
                minWidth: "min-w-[28px]",
                height: "h-[28px]",
                fontSize: "text-sm"
            },
            md: {
                minWidth: "min-w-[32px]",
                height: "h-[32px]",
                fontSize: "text-base"
            },
            lg: {
                minWidth: "min-w-[40px]",
                height: "h-[40px]",
                fontSize: "text-lg"
            },
            xl: {
                minWidth: "min-w-[48px]",
                height: "h-[48px]",
                fontSize: "text-xl"
            }
        };

        return styles[size] || styles.md;
    };

    const currentSize = getSize();

    const paginationClass = "flex items-center gap-2";
    const paginationButtonClass = cx(
        "flex items-center justify-center cursor-pointer user-select-none px-[8px] rounded-md",
        "border border-[var(--lumin-border)] bg-[var(--lumin-background)] text-[var(--lumin-text)]",
        "hover:bg-[var(--lumin-background-hover)] transition-colors duration-200",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        currentSize.minWidth,
        currentSize.height,
        currentSize.fontSize,
        classNames?.control
    );
    const paginationButtonActiveClass = cx(
        "bg-[var(--lumin-primary)] text-white border-[var(--lumin-primary)] hover:bg-[var(--lumin-primary-hover)]",
        classNames?.active
    );
    const paginationButtonDisabledClass = "cursor-not-allowed";
    const prevNextButtonClass = cx(paginationButtonClass, classNames?.control);
    const dotsClass = cx(
        "border-transparent bg-transparent cursor-default",
        "hover:bg-transparent hover:border-transparent",
        classNames?.dots
    );

    return (
        <div
            className={cx(paginationClass, className, classNames?.root)}
            role="navigation"
            aria-label="Pagination"
        >
            {withEdges && (
                <button
                    className={prevNextButtonClass}
                    onClick={() => handlePageChange(1)}
                    disabled={disabled || currentPage === 1}
                    aria-label="Go to first page"
                    title="First page"
                >
                    <FirstIcon size={18} />
                </button>
            )}

            {withControls && (
                <button
                    className={prevNextButtonClass}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={disabled || currentPage === 1}
                    aria-label="Go to previous page"
                    title="Previous page"
                >
                    <PreviousIcon size={18} />
                </button>
            )}

            {withPages ? (
                getPageNumbers().map((pageNumber, i) => (
                    <button
                        key={i}
                        className={cx(
                            paginationButtonClass,
                            pageNumber === currentPage &&
                                paginationButtonActiveClass,
                            pageNumber === "..." && dotsClass,
                            disabled && paginationButtonDisabledClass
                        )}
                        onClick={() =>
                            pageNumber !== "..." &&
                            handlePageChange(Number(pageNumber))
                        }
                        disabled={disabled || pageNumber === "..."}
                        aria-current={
                            pageNumber === currentPage ? "page" : undefined
                        }
                        aria-label={
                            pageNumber === "..."
                                ? "More pages"
                                : `Page ${pageNumber}`
                        }
                        title={
                            pageNumber === "..."
                                ? "More pages"
                                : `Page ${pageNumber}`
                        }
                    >
                        {pageNumber}
                    </button>
                ))
            ) : (
                <div
                    className={cx(
                        "flex items-center text-[var(--lumin-hint)] px-2 font-medium",
                        classNames?.label
                    )}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {label || `${currentPage} of ${total}`}
                </div>
            )}

            {withControls && (
                <button
                    className={prevNextButtonClass}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={disabled || currentPage === total}
                    aria-label="Go to next page"
                    title="Next page"
                >
                    <NextIcon size={18} />
                </button>
            )}

            {withEdges && (
                <button
                    className={prevNextButtonClass}
                    onClick={() => handlePageChange(total)}
                    disabled={disabled || currentPage === total}
                    aria-label="Go to last page"
                    title="Last page"
                >
                    <LastIcon size={18} />
                </button>
            )}
        </div>
    );
};

Pagination.displayName = "@luminx/core/Pagination";
