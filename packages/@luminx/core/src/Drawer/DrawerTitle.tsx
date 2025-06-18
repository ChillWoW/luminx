import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { useTheme } from "../_theme";
import { IconX } from "@tabler/icons-react";

export const DrawerTitle = ({ children }: { children: ReactNode }) => {
    const { theme, cx } = useTheme();
    const { classNames, canClose, onClose, withCloseButton } =
        useDrawerContext();

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
            {withCloseButton && canClose && (
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
                    <IconX size={20} />
                </button>
            )}
        </div>
    );
};

DrawerTitle.displayName = "@luminx/core/Drawer.Title";
