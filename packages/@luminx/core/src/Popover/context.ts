import { createContext, useContext } from "react";
import { PopoverContextType } from "./types";

export const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error(
            "Popover components must be used within a Popover component"
        );
    }
    return context;
};
