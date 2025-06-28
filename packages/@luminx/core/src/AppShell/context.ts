import { createContext, useContext } from "react";
import { AppShellContextType } from "./types";

export const AppShellContext = createContext<AppShellContextType | null>(null);

export const useAppShellContext = () => {
    const context = useContext(AppShellContext);
    if (!context) {
        throw new Error(
            "AppShell components must be used within AppShell provider"
        );
    }
    return context;
};
