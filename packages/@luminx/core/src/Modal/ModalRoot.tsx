import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cn } from "../_utils/merge";

export const ModalRoot = ({ children }: { children: ReactNode }) => {
    const {
        zIndex,
        classNames,
        centered,
        overlayOpacity,
        canClose,
        closeOnClickOutside,
        onClose,
        fullScreen,
        withOverlay = true
    } = useModalContext();

    const handleOverlayClick = () => {
        if (canClose && closeOnClickOutside) {
            onClose?.();
        }
    };

    const z = zIndex || 200;

    return (
        <>
            {withOverlay && (
                <div
                    className={cn(
                        "fixed inset-0 bg-black",
                        classNames?.overlay
                    )}
                    style={{
                        zIndex: z,
                        opacity: overlayOpacity,
                        transition: `opacity 200ms ease`
                    }}
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}
            <div
                className={cn(
                    `fixed inset-0 p-4 flex overflow-y-auto justify-center`,
                    centered && "items-center justify-center",
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
        </>
    );
};

ModalRoot.displayName = "ModalRoot";
