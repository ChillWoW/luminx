import { ReactNode } from "react";
import { cn } from "../_utils";
import { useDrawerContext } from "./context";

export interface DrawerBodyProps {
    children: ReactNode;
}

export const DrawerBody = ({ children }: DrawerBodyProps) => {
    const { classNames } = useDrawerContext();

    return (
        <div className={cn("flex-1 overflow-y-auto", classNames?.body)}>
            {children}
        </div>
    );
};

DrawerBody.displayName = "DrawerBody";
