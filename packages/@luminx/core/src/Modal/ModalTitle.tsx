import { ReactNode } from "react";
import { useTheme } from "../_theme";
import { useModalContext } from "./context";
import { CloseButton } from "../CloseButton";

export const ModalTitle = ({ children }: { children: ReactNode }) => {
    const { theme, cx } = useTheme();

    const { classNames, canClose, onClose, withCloseButton } =
        useModalContext();

    return (
        <div
            className={cx(
                "flex items-center justify-between mb-2",
                theme === "light"
                    ? "text-[var(--luminx-light-text)]"
                    : "text-[var(--luminx-dark-text)]"
            )}
        >
            <p className={cx("text-sm", classNames?.title)}>{children}</p>
            {withCloseButton && canClose && (
                <CloseButton
                    onClick={() => {
                        if (!canClose) return;
                        onClose?.();
                    }}
                />
            )}
        </div>
    );
};

ModalTitle.displayName = "@luminx/core/Modal.Title";
