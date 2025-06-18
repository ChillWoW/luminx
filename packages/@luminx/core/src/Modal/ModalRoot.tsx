import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cx } from "../_theme";

export const ModalRoot = ({ children }: { children: ReactNode }) => {
    const { zIndex, classNames, centered, fullScreen } = useModalContext();

    const z = zIndex || 200;

    return (
        <div
            className={cx(
                `fixed inset-0 p-4 flex overflow-y-auto justify-center`,
                centered ? "items-center justify-center" : "h-fit",
                fullScreen && "p-0",
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
