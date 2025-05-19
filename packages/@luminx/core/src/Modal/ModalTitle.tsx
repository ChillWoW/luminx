import { ReactNode } from "react";
import { useTheme } from "../_theme";
import { XIcon } from "../_icons";
import { useModalContext } from "./context";

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
            <p className={cx("text-base font-medium", classNames?.title)}>
                {children}
            </p>
            {withCloseButton && (
                <button
                    type="button"
                    className={cx(
                        "flex items-center justify-center hover:bg-[var(--luminx-primary-light)] p-2 rounded-full transition-colors",
                        classNames?.closeButton
                    )}
                    aria-label="Close"
                    onClick={() => {
                        if (!canClose) return;
                        onClose?.();
                    }}
                >
                    <XIcon size={12} />
                </button>
            )}
        </div>
    );
};

ModalTitle.displayName = "@luminx/core/Modal.Title";
