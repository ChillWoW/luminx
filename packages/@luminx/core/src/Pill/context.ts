import { createContext, useContext } from "react";
import { PillGroupContextType } from "./types";

export const PillGroupContext = createContext<PillGroupContextType | null>(
    null
);

export const usePillGroupContext = () => {
    const context = useContext(PillGroupContext);
    if (!context) {
        throw new Error(
            "PillGroup components must be used within a PillGroup component"
        );
    }
    return context;
};
