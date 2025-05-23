import { cx } from "../_theme";
import {
    TableProps,
    TableTheadProps,
    TableTbodyProps,
    TableTfootProps,
    TableCaptionProps,
    TableTrProps,
    TableThProps,
    TableTdProps,
    TableScrollContainerProps,
    TableContextValue
} from "./types";
import { TableContext, useTableContext } from "./context";
import "../style.css";

function TableThead({ className, children, ...others }: TableTheadProps) {
    const { stickyHeader, stickyHeaderOffset } = useTableContext();

    const classes = cx(
        className,
        stickyHeader && "sticky top-0 z-10 bg-[var(--lumin-background)]"
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
    return (
        <caption
            className={cx("mt-2 text-sm text-[var(--lumin-text)]", className)}
            {...others}
        />
    );
}

function TableTr({ className, ...others }: TableTrProps) {
    return <tr className={className} {...others} />;
}

function TableTh({ className, ...others }: TableThProps) {
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
        "text-left font-semibold text-[var(--lumin-text)]",
        className
    );

    return (
        <th
            className={classes}
            style={{ padding: `${vSpacing} ${hSpacing}` }}
            {...others}
        />
    );
}

function TableTd({ className, ...others }: TableTdProps) {
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

    const classes = cx(tabularNums && "font-tabular", className);

    return (
        <td
            className={classes}
            style={{ padding: `${vSpacing} ${hSpacing}` }}
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
    return (
        <div
            className={cx("overflow-auto", className)}
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

export function Table({
    children,
    data,
    horizontalSpacing = "md",
    verticalSpacing = "md",
    captionSide = "bottom",
    stickyHeader = false,
    stickyHeaderOffset = 0,
    variant = "default",
    tabularNums = false,
    layout = "auto",
    withTableBorder = false,
    withColumnBorders = false,
    withRowBorders = false,
    className,
    ...others
}: TableProps) {
    const contextValue: TableContextValue = {
        horizontalSpacing,
        verticalSpacing,
        stickyHeader,
        stickyHeaderOffset,
        variant,
        tabularNums,
        layout
    };

    const classes = cx(
        "w-full border-collapse text-[var(--lumin-text)]",
        variant === "striped" && "border-separate border-spacing-0",
        layout === "fixed" && "table-fixed",
        withTableBorder &&
            "border border-[var(--lumin-border)] rounded-md overflow-hidden",
        withColumnBorders &&
            "[&_th]:border-x [&_th]:border-[var(--lumin-border)] [&_td]:border-x [&_td]:border-[var(--lumin-border)]",
        withRowBorders && "[&_tr]:border-b [&_tr]:border-[var(--lumin-border)]",
        variant === "striped" &&
            "[&_tr:nth-child(even)]:bg-[var(--lumin-background)]",
        variant === "vertical" &&
            "[&_th]:border-r [&_th]:border-[var(--lumin-border)] [&_th]:border-r-2 [&_th]:bg-[var(--lumin-background)]",
        className
    );

    if (data) {
        const { head, body, foot, caption } = data;

        return (
            <TableContext.Provider value={contextValue}>
                <table className={classes} {...others}>
                    {caption && captionSide === "top" && (
                        <TableCaption>{caption}</TableCaption>
                    )}

                    {head && (
                        <TableThead>
                            <TableTr>
                                {head.map((item, index) => (
                                    <TableTh key={index}>{item}</TableTh>
                                ))}
                            </TableTr>
                        </TableThead>
                    )}

                    <TableTbody>
                        {body.map((row, rowIndex) => (
                            <TableTr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableTd key={cellIndex}>{cell}</TableTd>
                                ))}
                            </TableTr>
                        ))}
                    </TableTbody>

                    {foot && (
                        <TableTfoot>
                            <TableTr>
                                {foot.map((item, index) => (
                                    <TableTh key={index}>{item}</TableTh>
                                ))}
                            </TableTr>
                        </TableTfoot>
                    )}

                    {caption && captionSide === "bottom" && (
                        <TableCaption>{caption}</TableCaption>
                    )}
                </table>
            </TableContext.Provider>
        );
    }

    return (
        <TableContext.Provider value={contextValue}>
            <table className={classes} {...others}>
                {children}
            </table>
        </TableContext.Provider>
    );
}

Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.Tr = TableTr;
Table.Th = TableTh;
Table.Td = TableTd;
Table.ScrollContainer = TableScrollContainer;
Table.displayName = "@luminx/core/Table";
