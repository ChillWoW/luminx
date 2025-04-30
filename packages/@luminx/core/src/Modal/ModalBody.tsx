import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cn } from "../_utils";

export const ModalBody = ({ children }: { children: ReactNode }) => {
    const { classNames } = useModalContext();

    return <div className={cn(classNames?.body)}>{children}</div>;
};

ModalBody.displayName = "ModalBody";
