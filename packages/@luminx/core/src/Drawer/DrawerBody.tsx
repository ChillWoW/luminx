import { ReactNode } from "react";
import { cx } from "../_theme";
import { useDrawerContext } from "./context";

export interface DrawerBodyProps {
    children: ReactNode;
}

export const DrawerBody = ({ children }: DrawerBodyProps) => {
    const { classNames } = useDrawerContext();

    return (
        <div className={cx("flex-1 overflow-y-auto", classNames?.body)}>
            {children}
        </div>
    );
};

DrawerBody.displayName = "@luminx/core/DrawerBody";
