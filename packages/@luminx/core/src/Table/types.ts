import React from "react";

export type TableVariant = "default" | "vertical" | "striped";
export type TableLayout = "auto" | "fixed";
export type TableSpacing = "xs" | "sm" | "md" | "lg" | "xl" | string | number;

export interface TableContextValue {
    horizontalSpacing: TableSpacing;
    verticalSpacing: TableSpacing;
    stickyHeader: boolean;
    stickyHeaderOffset: number;
    variant: TableVariant;
    tabularNums: boolean;
    layout: TableLayout;
}

export interface TableData {
    head?: React.ReactNode[];
    body: React.ReactNode[][];
    foot?: React.ReactNode[];
    caption?: React.ReactNode;
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    data?: TableData;
    horizontalSpacing?: TableSpacing;
    verticalSpacing?: TableSpacing;
    captionSide?: "top" | "bottom";
    stickyHeader?: boolean;
    stickyHeaderOffset?: number;
    variant?: TableVariant;
    tabularNums?: boolean;
    layout?: TableLayout;
    withTableBorder?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
    className?: string;
    classNames?: TableClassNames;
    children?: React.ReactNode;
}

export interface TableClassNames {
    root?: string;
    thead?: string;
    tbody?: string;
    tfoot?: string;
    caption?: string;
    tr?: string;
    th?: string;
    td?: string;
}

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
}

export interface TableThProps
    extends React.ThHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableTdProps
    extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children?: React.ReactNode;
}

export interface TableScrollContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    minWidth?: number | string;
    maxHeight?: number | string;
}
