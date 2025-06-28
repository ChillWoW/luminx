import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cx } from "../_theme";

export const ModalRoot = ({ children }: { children: ReactNode }) => {
    const { zIndex, classNames, centered } = useModalContext();

    const z = zIndex || 200;

    return (
        <div
            className={cx(
                `fixed inset-0 flex overflow-y-auto justify-center`,
                centered ? "items-center justify-center" : "h-fit",
                classNames?.root
            )}
            style={{
                zIndex: z + 1
            }}
            role="dialog"
            aria-modal="true"
        >
            {children}
        </div>
    );
};

ModalRoot.displayName = "@luminx/core/Modal.Root";
