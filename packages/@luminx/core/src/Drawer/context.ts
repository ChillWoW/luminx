import { createContext, useContext } from "react";
import { DrawerProps } from "./types";

export const DrawerContext = createContext<Partial<DrawerProps> | null>(null);

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("Drawer components must be used within a Drawer");
    }
    return context;
};
