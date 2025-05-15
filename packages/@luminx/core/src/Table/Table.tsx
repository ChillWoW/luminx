import { useTheme } from "../_theme";
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

function TableTr({ className, ...others }: TableTrProps) {
    return <tr className={className} {...others} />;
}

function TableTh({ className, ...others }: TableThProps) {
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
        "text-left font-semibold",
        theme === "light"
            ? "text-[var(--luminx-light-text)]"
            : "text-[var(--luminx-dark-text)]",
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
        tabularNums && "font-tabular",
        theme === "light"
            ? "text-[var(--luminx-light-text)]"
            : "text-[var(--luminx-dark-text)]",
        className
    );

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
    classNames,
    ...others
}: TableProps) {
    const { theme, cx } = useTheme();

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
        "w-full border-collapse",
        variant === "striped" && "border-separate border-spacing-0",
        layout === "fixed" && "table-fixed",
        withTableBorder && theme === "light"
            ? "border border-[var(--luminx-light-border)] rounded-md overflow-hidden"
            : withTableBorder &&
                  "border border-[var(--luminx-dark-border)] rounded-md overflow-hidden",
        withColumnBorders && theme === "light"
            ? "[&_th]:border-x [&_th]:border-[var(--luminx-light-border)] [&_td]:border-x [&_td]:border-[var(--luminx-light-border)]"
            : withColumnBorders &&
                  "[&_th]:border-x [&_th]:border-[var(--luminx-dark-border)] [&_td]:border-x [&_td]:border-[var(--luminx-dark-border)]",
        withRowBorders && theme === "light"
            ? "[&_tr]:border-b [&_tr]:border-[var(--luminx-light-border)]"
            : withRowBorders &&
                  "[&_tr]:border-b [&_tr]:border-[var(--luminx-dark-border)]",
        variant === "striped" && theme === "light"
            ? "[&_tr:nth-child(even)]:bg-[var(--luminx-light-background-hover)]"
            : variant === "striped" &&
                  "[&_tr:nth-child(even)]:bg-[var(--luminx-dark-background-hover)]",
        variant === "vertical" && theme === "light"
            ? "[&_th]:border-r [&_th]:border-[var(--luminx-light-border)] [&_th]:border-r-2 [&_th]:bg-[var(--luminx-light-background-hover)]"
            : variant === "vertical" &&
                  "[&_th]:border-r [&_th]:border-[var(--luminx-dark-border)] [&_th]:border-r-2 [&_th]:bg-[var(--luminx-dark-background-hover)]",
        className,
        classNames?.root
    );

    if (data) {
        const { head, body, foot, caption } = data;

        return (
            <TableContext.Provider value={contextValue}>
                <table className={classes} {...others}>
                    {caption && captionSide === "top" && (
                        <TableCaption className={classNames?.caption}>
                            {caption}
                        </TableCaption>
                    )}

                    {head && (
                        <TableThead className={classNames?.thead}>
                            <TableTr className={classNames?.tr}>
                                {head.map((item, index) => (
                                    <TableTh
                                        key={index}
                                        className={classNames?.th}
                                    >
                                        {item}
                                    </TableTh>
                                ))}
                            </TableTr>
                        </TableThead>
                    )}

                    <TableTbody className={classNames?.tbody}>
                        {body.map((row, rowIndex) => (
                            <TableTr key={rowIndex} className={classNames?.tr}>
                                {row.map((cell, cellIndex) => (
                                    <TableTd
                                        key={cellIndex}
                                        className={classNames?.td}
                                    >
                                        {cell}
                                    </TableTd>
                                ))}
                            </TableTr>
                        ))}
                    </TableTbody>

                    {foot && (
                        <TableTfoot className={classNames?.tfoot}>
                            <TableTr className={classNames?.tr}>
                                {foot.map((item, index) => (
                                    <TableTh
                                        key={index}
                                        className={classNames?.th}
                                    >
                                        {item}
                                    </TableTh>
                                ))}
                            </TableTr>
                        </TableTfoot>
                    )}

                    {caption && captionSide === "bottom" && (
                        <TableCaption className={classNames?.caption}>
                            {caption}
                        </TableCaption>
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
