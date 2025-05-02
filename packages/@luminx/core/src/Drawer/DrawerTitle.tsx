import { ReactNode } from "react";
import { cx } from "../_theme";
import { XIcon } from "../_icons";
import { useDrawerContext } from "./context";

export const DrawerTitle = ({ children }: { children: ReactNode }) => {
    const { classNames, canClose, onClose, withCloseButton } =
        useDrawerContext();

    return (
        <div className="flex items-center justify-between mb-2">
            <p className={cx("text-base font-medium", classNames?.title)}>
                {children}
            </p>
            {withCloseButton && (
                <button
                    type="button"
                    className={cx(
                        "flex items-center justify-center hover:bg-[var(--lumin-secondary)] text-[var(--lumin-text)] p-4 rounded-full transition-colors",
                        "h-6 w-6",
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

DrawerTitle.displayName = "DrawerTitle";
