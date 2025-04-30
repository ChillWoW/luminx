import { createContext, useContext } from "react";
import { ModalProps } from "./types";

export const ModalContext = createContext<Partial<ModalProps> | null>(null);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Modal components must be used within a Modal");
    }
    return context;
};
