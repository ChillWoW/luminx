import { createContext, useContext } from "react";
import { FloatingButtonContextValue } from "./types";

export const FloatingButtonContext =
    createContext<FloatingButtonContextValue | null>(null);

export const useFloatingButtonContext = () => {
    const context = useContext(FloatingButtonContext);
    if (!context) {
        throw new Error(
            "FloatingButton components must be used within FloatingButton provider"
        );
    }
    return context;
};
