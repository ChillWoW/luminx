import { createContext, useContext } from "react";
import { ListContextValue } from "./types";

export const ListContext = createContext<ListContextValue>({
    spacing: 0,
    center: false,
    icon: null,
    size: "md"
});

export const useListContext = () => useContext(ListContext);
