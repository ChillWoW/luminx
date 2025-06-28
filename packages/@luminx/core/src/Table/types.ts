import React from "react";

// Core types
export type TableVariant = "default" | "vertical" | "striped";
export type TableLayout = "auto" | "fixed";
export type TableSpacing = "xs" | "sm" | "md" | "lg" | "xl" | string | number;
export type TableSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SortDirection = "asc" | "desc";
export type TableAlign = "left" | "center" | "right";

// Data types
export interface TableRow {
    id?: string | number;
    [key: string]: any;
}

export interface TableColumn<T = any> {
    key: string;
    title: React.ReactNode;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: "text" | "select" | "date" | "number";
    filterOptions?: Array<{ label: string; value: any }>;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    align?: TableAlign;
    truncate?: boolean;
    resizable?: boolean;
}

export interface TableSort {
    key: string;
    direction: SortDirection;
}

export interface TableFilters {
    [key: string]: any;
}

export interface TablePagination {
    pageSize: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    showQuickJumper?: boolean;
    showTotal?:
        | boolean
        | ((total: number, range: [number, number]) => React.ReactNode);
}

// Context
export interface TableContextValue {
    horizontalSpacing: TableSpacing;
    verticalSpacing: TableSpacing;
    stickyHeader: boolean;
    stickyHeaderOffset: number;
    variant: TableVariant;
    tabularNums: boolean;
    layout: TableLayout;
    size: TableSize;
    selectable: boolean;
    sortable: boolean;
}

// Class names
export interface TableClassNames {
    root?: string;
    container?: string;
    controls?: string;
    scrollContainer?: string;
    thead?: string;
    tbody?: string;
    tfoot?: string;
    caption?: string;
    tr?: string;
    th?: string;
    td?: string;
    pagination?: string;
}

// Main component props
export interface TableProps<T extends TableRow = TableRow>
    extends Omit<React.HTMLAttributes<HTMLTableElement>, "onSelect"> {
    // Data props
    data?: T[];
    columns?: TableColumn<T>[];

    // Layout props
    horizontalSpacing?: TableSpacing;
    verticalSpacing?: TableSpacing;
    layout?: TableLayout;
    stickyHeader?: boolean;
    stickyHeaderOffset?: number;

    // Visual props
    variant?: TableVariant;
    size?: TableSize;
    withBorder?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
    striped?: boolean;
    highlightOnHover?: boolean;

    // Interactive props
    sortable?: boolean;
    selectable?: boolean;
    onRowClick?: (row: T, index: number) => void;
    onSelectionChange?: (
        selectedRows: T[],
        selectedIds: (string | number)[]
    ) => void;

    // Pagination props
    pagination?: TablePagination;

    // Search and filter props
    searchable?: boolean;
    searchPlaceholder?: string;
    filterable?: boolean;

    // Loading state
    loading?: boolean;
    loadingText?: string;

    // Empty state
    emptyText?: string;

    // Custom renderers
    renderEmpty?: () => React.ReactNode;
    renderLoading?: () => React.ReactNode;

    // Styling
    className?: string;
    classNames?: TableClassNames;

    // Caption
    caption?: React.ReactNode;
    captionSide?: "top" | "bottom";

    // Legacy support
    children?: React.ReactNode;
    tabularNums?: boolean;
}

// Sub-component props
export interface TableTheadProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableTbodyProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableTfootProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableCaptionProps
    extends React.HTMLAttributes<HTMLTableCaptionElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableTrProps
    extends React.HTMLAttributes<HTMLTableRowElement> {
    className?: string;
    children?: React.ReactNode;
    isSelected?: boolean;
    isHoverable?: boolean;
}

export interface TableThProps
    extends React.ThHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children?: React.ReactNode;
    sortable?: boolean;
    sortDirection?: SortDirection;
    onSort?: () => void;
    resizable?: boolean;
    width?: string | number;
    minWidth?: string | number;
    align?: TableAlign;
}

export interface TableTdProps
    extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children?: React.ReactNode;
    align?: TableAlign;
    truncate?: boolean;
}

export interface TableScrollContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    minWidth?: number | string;
    maxHeight?: number | string;
}

// Legacy data format support
export interface TableData {
    head?: React.ReactNode[];
    body: React.ReactNode[][];
    foot?: React.ReactNode[];
    caption?: React.ReactNode;
}
