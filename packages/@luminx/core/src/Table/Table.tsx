import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useTheme } from "../_theme";
import {
    IconChevronUp,
    IconChevronDown,
    IconSelector
} from "@tabler/icons-react";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Loader } from "../Loader";
import { Pagination } from "../Pagination";
import {
    TableProps,
    TableColumn,
    TableRow,
    SortDirection,
    TableContextValue,
    TableTheadProps,
    TableTbodyProps,
    TableTfootProps,
    TableCaptionProps,
    TableTrProps,
    TableThProps,
    TableTdProps,
    TableScrollContainerProps,
    TableFilters,
    TableSort
} from "./types";
import { TableContext, useTableContext } from "./context";

// Utility functions
const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
};

const formatCellValue = (
    value: any,
    row: any,
    index: number,
    formatter?: (value: any, row: any, index: number) => React.ReactNode
): React.ReactNode => {
    if (formatter) return formatter(value, row, index);
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleDateString();
    return String(value);
};

const filterData = (
    data: TableRow[],
    filters: TableFilters,
    columns: TableColumn[]
): TableRow[] => {
    return data.filter((row) => {
        return Object.entries(filters).every(([key, filterValue]) => {
            if (!filterValue) return true;

            const column = columns.find((col) => col.key === key);
            const cellValue = getNestedValue(row, key);

            if (column?.filterType === "select") {
                return cellValue === filterValue;
            }

            return String(cellValue)
                .toLowerCase()
                .includes(String(filterValue).toLowerCase());
        });
    });
};

const sortData = (data: TableRow[], sort: TableSort | null): TableRow[] => {
    if (!sort) return data;

    return [...data].sort((a, b) => {
        const aValue = getNestedValue(a, sort.key);
        const bValue = getNestedValue(b, sort.key);

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sort.direction === "asc" ? comparison : -comparison;
    });
};

// Sub-components
function TableThead({ className, children, ...others }: TableTheadProps) {
    const { theme, cx } = useTheme();
    const { stickyHeader, stickyHeaderOffset } = useTableContext();

    const getStickyHeaderBackground = () => {
        if (theme === "light") return "bg-[var(--luminx-light-background)]";
        return "bg-[var(--luminx-dark-background)]";
    };

    const classes = cx(
        className,
        stickyHeader && "sticky top-0 z-10",
        stickyHeader && getStickyHeaderBackground()
    );

    const style = stickyHeader ? { top: `${stickyHeaderOffset}px` } : undefined;

    return (
        <thead className={classes} style={style} {...others}>
            {children}
        </thead>
    );
}

function TableTbody({ className, ...others }: TableTbodyProps) {
    return <tbody className={className} {...others} />;
}

function TableTfoot({ className, ...others }: TableTfootProps) {
    return <tfoot className={className} {...others} />;
}

function TableCaption({ className, ...others }: TableCaptionProps) {
    const { theme, cx } = useTheme();

    return (
        <caption
            className={cx(
                "mt-2 text-sm",
                theme === "light"
                    ? "text-[var(--luminx-light-text)]"
                    : "text-[var(--luminx-dark-text)]",
                className
            )}
            {...others}
        />
    );
}

function TableTr({
    className,
    isSelected,
    isHoverable = true,
    onClick,
    ...others
}: TableTrProps) {
    const { theme, cx } = useTheme();

    const classes = cx(
        isHoverable && "transition-colors duration-150",
        isHoverable && theme === "light"
            ? "hover:bg-[var(--luminx-light-background-hover)]"
            : isHoverable && "hover:bg-[var(--luminx-dark-background-hover)]",
        isSelected && theme === "light"
            ? "bg-[var(--luminx-light-primary-background)]"
            : isSelected && "bg-[var(--luminx-dark-primary-background)]",
        onClick && "cursor-pointer",
        className
    );

    return <tr className={classes} onClick={onClick} {...others} />;
}

function TableTh({
    className,
    sortable,
    sortDirection,
    onSort,
    resizable,
    width,
    minWidth,
    align = "left",
    ...others
}: TableThProps) {
    const { theme, cx } = useTheme();
    const { horizontalSpacing, verticalSpacing } = useTableContext();

    const getSpacing = (spacing: string | number) => {
        if (typeof spacing === "number") return `${spacing}px`;
        switch (spacing) {
            case "xs":
                return "0.25rem";
            case "sm":
                return "0.5rem";
            case "md":
                return "0.75rem";
            case "lg":
                return "1rem";
            case "xl":
                return "1.5rem";
            default:
                return spacing;
        }
    };

    const hSpacing = getSpacing(horizontalSpacing);
    const vSpacing = getSpacing(verticalSpacing);

    const classes = cx(
        "font-semibold relative group",
        `text-${align}`,
        sortable && "cursor-pointer select-none",
        theme === "light"
            ? "text-[var(--luminx-light-text)]"
            : "text-[var(--luminx-dark-text)]",
        className
    );

    const style = {
        padding: `${vSpacing} ${hSpacing}`,
        width,
        minWidth
    };

    const getSortIcon = () => {
        if (sortDirection === "asc") return <IconChevronUp size={16} />;
        if (sortDirection === "desc") return <IconChevronDown size={16} />;
        return <IconSelector size={16} />;
    };

    return (
        <th
            className={classes}
            style={style}
            onClick={sortable ? onSort : undefined}
            {...others}
        >
            <div className="flex items-center gap-2">
                <span>{others.children}</span>
                {sortable && (
                    <span
                        className={cx(
                            "transition-opacity",
                            sortDirection
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-50"
                        )}
                    >
                        {getSortIcon()}
                    </span>
                )}
            </div>
            {resizable && (
                <div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-transparent hover:bg-blue-500 transition-colors" />
            )}
        </th>
    );
}

function TableTd({
    className,
    align = "left",
    truncate,
    ...others
}: TableTdProps) {
    const { theme, cx } = useTheme();
    const { horizontalSpacing, verticalSpacing, tabularNums } =
        useTableContext();

    const getSpacing = (spacing: string | number) => {
        if (typeof spacing === "number") return `${spacing}px`;
        switch (spacing) {
            case "xs":
                return "0.25rem";
            case "sm":
                return "0.5rem";
            case "md":
                return "0.75rem";
            case "lg":
                return "1rem";
            case "xl":
                return "1.5rem";
            default:
                return spacing;
        }
    };

    const hSpacing = getSpacing(horizontalSpacing);
    const vSpacing = getSpacing(verticalSpacing);

    const classes = cx(
        `text-${align}`,
        tabularNums && "font-tabular",
        truncate && "truncate max-w-0",
        theme === "light"
            ? "text-[var(--luminx-light-text)]"
            : "text-[var(--luminx-dark-text)]",
        className
    );

    return (
        <td
            className={classes}
            style={{ padding: `${vSpacing} ${hSpacing}` }}
            title={
                truncate && typeof others.children === "string"
                    ? others.children
                    : undefined
            }
            {...others}
        />
    );
}

function TableScrollContainer({
    className,
    children,
    minWidth,
    maxHeight,
    ...others
}: TableScrollContainerProps) {
    const { cx } = useTheme();

    return (
        <div
            className={cx("overflow-auto luminx-scrollbar", className)}
            style={{
                minWidth:
                    typeof minWidth === "number" ? `${minWidth}px` : minWidth,
                maxHeight:
                    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
            }}
            {...others}
        >
            {children}
        </div>
    );
}

// Main Table component
export function Table<T extends TableRow = TableRow>({
    // Data props
    data = [],
    columns = [],

    // Layout props
    horizontalSpacing = "md",
    verticalSpacing = "md",
    layout = "auto",
    stickyHeader = false,
    stickyHeaderOffset = 0,

    // Visual props
    variant = "default",
    size = "md",
    withBorder = false,
    withColumnBorders = false,
    withRowBorders = true,
    striped = false,
    highlightOnHover = true,

    // Interactive props
    sortable = false,
    selectable = false,
    onRowClick,
    onSelectionChange,

    // Pagination props
    pagination,

    // Search and filter props
    searchable = false,
    searchPlaceholder = "Search...",
    filterable = false,

    // Loading state
    loading = false,
    loadingText = "Loading...",

    // Empty state
    emptyText = "No data available",

    // Custom renderers
    renderEmpty,
    renderLoading,

    // Styling
    className,
    classNames = {},

    // Caption
    caption,
    captionSide = "bottom",

    // Legacy support
    children,
    tabularNums = false,

    ...others
}: TableProps<T>) {
    const { theme, cx } = useTheme();

    // State management
    const [sort, setSort] = useState<TableSort | null>(null);
    const [filters, setFilters] = useState<TableFilters>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
        new Set()
    );
    const [currentPage, setCurrentPage] = useState(1);

    // Context value
    const contextValue: TableContextValue = {
        horizontalSpacing,
        verticalSpacing,
        stickyHeader,
        stickyHeaderOffset,
        variant,
        tabularNums,
        layout,
        size,
        selectable,
        sortable
    };

    // Data processing
    const processedData = useMemo(() => {
        let result = [...data];

        // Apply search
        if (searchable && searchQuery) {
            result = result.filter((row) =>
                columns.some((column) => {
                    const value = getNestedValue(row, column.key);
                    return String(value)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                })
            );
        }

        // Apply filters
        if (filterable) {
            result = filterData(result as TableRow[], filters, columns) as T[];
        }

        // Apply sorting
        if (sortable) {
            result = sortData(result as TableRow[], sort) as T[];
        }

        return result;
    }, [
        data,
        columns,
        searchQuery,
        filters,
        sort,
        searchable,
        filterable,
        sortable
    ]);

    // Pagination
    const paginatedData = useMemo(() => {
        if (!pagination) return processedData;

        const start = (currentPage - 1) * pagination.pageSize;
        const end = start + pagination.pageSize;
        return processedData.slice(start, end);
    }, [processedData, pagination, currentPage]);

    const totalPages = pagination
        ? Math.ceil(processedData.length / pagination.pageSize)
        : 1;

    // Event handlers
    const handleSort = useCallback(
        (key: string) => {
            if (!sortable) return;

            setSort((prevSort) => {
                if (prevSort?.key === key) {
                    return prevSort.direction === "asc"
                        ? { key, direction: "desc" }
                        : null;
                }
                return { key, direction: "asc" };
            });
        },
        [sortable]
    );

    const handleRowSelect = useCallback(
        (rowId: string | number, selected: boolean) => {
            setSelectedRows((prev) => {
                const newSet = new Set(prev);
                if (selected) {
                    newSet.add(rowId);
                } else {
                    newSet.delete(rowId);
                }
                return newSet;
            });
        },
        []
    );

    const handleSelectAll = useCallback(
        (selected: boolean) => {
            if (selected) {
                const allIds = paginatedData.map(
                    (row, index) => row.id ?? index
                );
                setSelectedRows(new Set(allIds));
            } else {
                setSelectedRows(new Set());
            }
        },
        [paginatedData]
    );

    // Effect for selection change callback
    useEffect(() => {
        if (onSelectionChange) {
            const selectedData = data.filter((row, index) =>
                selectedRows.has(row.id ?? index)
            );
            onSelectionChange(selectedData, Array.from(selectedRows));
        }
    }, [selectedRows, data, onSelectionChange]);

    // Styling
    const tableClasses = cx(
        "w-full border-collapse",
        layout === "fixed" && "table-fixed",
        withBorder && theme === "light"
            ? "border border-[var(--luminx-light-border)] rounded-lg overflow-hidden"
            : withBorder &&
                  "border border-[var(--luminx-dark-border)] rounded-lg overflow-hidden",
        className,
        classNames.root
    );

    const containerClasses = cx("relative", classNames.container);

    // Render functions
    const renderTableHeader = () => (
        <TableThead className={classNames.thead}>
            <TableTr className={classNames.tr} isHoverable={false}>
                {selectable && (
                    <TableTh className={cx("w-12", classNames.th)}>
                        <Checkbox
                            checked={
                                selectedRows.size === paginatedData.length &&
                                paginatedData.length > 0
                            }
                            indeterminate={
                                selectedRows.size > 0 &&
                                selectedRows.size < paginatedData.length
                            }
                            onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                    </TableTh>
                )}
                {columns.map((column) => (
                    <TableTh
                        key={column.key}
                        className={classNames.th}
                        sortable={sortable && column.sortable !== false}
                        sortDirection={
                            sort?.key === column.key
                                ? sort.direction
                                : undefined
                        }
                        onSort={() => handleSort(column.key)}
                        align={column.align}
                        width={column.width}
                        minWidth={column.minWidth}
                        resizable={column.resizable}
                    >
                        {column.title}
                    </TableTh>
                ))}
            </TableTr>
        </TableThead>
    );

    const renderTableBody = () => {
        if (loading) {
            return (
                <TableTbody className={classNames.tbody}>
                    <TableTr className={classNames.tr} isHoverable={false}>
                        <TableTd
                            className={cx("text-center py-8", classNames.td)}
                            colSpan={columns.length + (selectable ? 1 : 0)}
                        >
                            {renderLoading ? (
                                renderLoading()
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader size={20} />
                                    <span>{loadingText}</span>
                                </div>
                            )}
                        </TableTd>
                    </TableTr>
                </TableTbody>
            );
        }

        if (paginatedData.length === 0) {
            return (
                <TableTbody className={classNames.tbody}>
                    <TableTr className={classNames.tr} isHoverable={false}>
                        <TableTd
                            className={cx("text-center py-8", classNames.td)}
                            colSpan={columns.length + (selectable ? 1 : 0)}
                        >
                            {renderEmpty ? renderEmpty() : emptyText}
                        </TableTd>
                    </TableTr>
                </TableTbody>
            );
        }

        return (
            <TableTbody className={classNames.tbody}>
                {paginatedData.map((row, rowIndex) => {
                    const rowId = row.id ?? rowIndex;
                    const isSelected = selectedRows.has(rowId);

                    return (
                        <TableTr
                            key={rowId}
                            className={cx(
                                striped &&
                                    rowIndex % 2 === 1 &&
                                    theme === "light"
                                    ? "bg-[var(--luminx-light-background-hover)]"
                                    : striped &&
                                          rowIndex % 2 === 1 &&
                                          "bg-[var(--luminx-dark-background-hover)]",
                                withRowBorders && theme === "light"
                                    ? "border-b border-[var(--luminx-light-border)]"
                                    : withRowBorders &&
                                          "border-b border-[var(--luminx-dark-border)]",
                                classNames.tr
                            )}
                            isSelected={isSelected}
                            isHoverable={highlightOnHover}
                            onClick={
                                onRowClick
                                    ? () => onRowClick(row, rowIndex)
                                    : undefined
                            }
                        >
                            {selectable && (
                                <TableTd className={classNames.td}>
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={(e) =>
                                            handleRowSelect(
                                                rowId,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </TableTd>
                            )}
                            {columns.map((column) => {
                                const cellValue = getNestedValue(
                                    row,
                                    column.key
                                );
                                const formattedValue = formatCellValue(
                                    cellValue,
                                    row,
                                    rowIndex,
                                    column.render
                                );

                                return (
                                    <TableTd
                                        key={column.key}
                                        className={cx(
                                            withColumnBorders &&
                                                theme === "light"
                                                ? "border-r border-[var(--luminx-light-border)]"
                                                : withColumnBorders &&
                                                      "border-r border-[var(--luminx-dark-border)]",
                                            classNames.td
                                        )}
                                        align={column.align}
                                        truncate={column.truncate}
                                    >
                                        {formattedValue}
                                    </TableTd>
                                );
                            })}
                        </TableTr>
                    );
                })}
            </TableTbody>
        );
    };

    const renderControls = () => {
        if (!searchable && !filterable) return null;

        return (
            <div
                className={cx(
                    "flex items-center gap-4 mb-4",
                    classNames.controls
                )}
            >
                {searchable && (
                    <TextInput
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e)}
                        className="max-w-sm"
                    />
                )}
                {/* Filter controls would go here */}
            </div>
        );
    };

    const renderPagination = () => {
        if (!pagination || totalPages <= 1) return null;

        return (
            <div
                className={cx(
                    "flex justify-center mt-4",
                    classNames.pagination
                )}
            >
                <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    {...pagination}
                />
            </div>
        );
    };

    // Legacy children support
    if (children) {
        return (
            <TableContext.Provider value={contextValue}>
                <div className={containerClasses}>
                    <table className={tableClasses} {...others}>
                        {children}
                    </table>
                </div>
            </TableContext.Provider>
        );
    }

    return (
        <TableContext.Provider value={contextValue}>
            <div className={containerClasses}>
                {renderControls()}

                <TableScrollContainer className={classNames.scrollContainer}>
                    <table className={tableClasses} {...others}>
                        {caption && captionSide === "top" && (
                            <TableCaption className={classNames.caption}>
                                {caption}
                            </TableCaption>
                        )}

                        {renderTableHeader()}
                        {renderTableBody()}

                        {caption && captionSide === "bottom" && (
                            <TableCaption className={classNames.caption}>
                                {caption}
                            </TableCaption>
                        )}
                    </table>
                </TableScrollContainer>

                {renderPagination()}
            </div>
        </TableContext.Provider>
    );
}

// Attach sub-components for compound pattern support
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.Tr = TableTr;
Table.Th = TableTh;
Table.Td = TableTd;
Table.ScrollContainer = TableScrollContainer;
Table.displayName = "@luminx/core/Table";
