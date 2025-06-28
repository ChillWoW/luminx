import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { useTheme } from "../_theme";
import { CloseButton } from "../CloseButton";

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

DrawerTitle.displayName = "@luminx/core/Drawer.Title";
