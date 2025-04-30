import { createContext, useContext } from "react";
import { TableContextValue } from "./types";

export const TableContext = createContext<TableContextValue>({
    horizontalSpacing: "md",
    verticalSpacing: "md",
    stickyHeader: false,
    stickyHeaderOffset: 0,
    variant: "default",
    tabularNums: false,
    layout: "auto"
});

export const useTableContext = () => useContext(TableContext);
