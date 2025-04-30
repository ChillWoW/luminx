import { ReactNode } from "react";
import { cn } from "../_utils";
import { XIcon } from "../_icons";
import { useModalContext } from "./context";

export const ModalTitle = ({ children }: { children: ReactNode }) => {
    const { classNames, canClose, onClose, withCloseButton } =
        useModalContext();

    return (
        <div className="flex items-center justify-between mb-2">
            <p className={cn("text-base font-medium", classNames?.title)}>
                {children}
            </p>
            {withCloseButton && (
                <button
                    type="button"
                    className={cn(
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

ModalTitle.displayName = "ModalTitle";
