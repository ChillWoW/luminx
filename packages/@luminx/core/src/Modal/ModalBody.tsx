import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cx } from "../_theme";

export const ModalBody = ({ children }: { children: ReactNode }) => {
    const { classNames } = useModalContext();

    return <div className={cx(classNames?.body)}>{children}</div>;
};

ModalBody.displayName = "@luminx/core/Modal.Body";
