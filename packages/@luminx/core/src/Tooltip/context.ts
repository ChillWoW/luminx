import { createContext } from "react";

export const TooltipGroupContext = createContext<{
    openDelay?: number;
    closeDelay?: number;
}>({});
