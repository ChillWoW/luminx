import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cx } from "../_theme";

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
        withOverlay = true,
        animationState,
        transitionDuration = 200,
        transitionTimingFunction = "ease"
    } = useModalContext();

    const handleOverlayClick = () => {
        if (canClose && closeOnClickOutside) {
            onClose?.();
        }
    };

    const z = zIndex || 200;

    const getOpacity = () => {
        switch (animationState) {
            case "entering":
            case "exiting":
                return 0;
            case "entered":
                return overlayOpacity;
            default:
                return 0;
        }
    };

    return (
        <>
            {withOverlay && (
                <div
                    className={cx(
                        "fixed inset-0 bg-black",
                        classNames?.overlay
                    )}
                    style={{
                        zIndex: z,
                        opacity: getOpacity(),
                        transition: `opacity ${transitionDuration}ms ${transitionTimingFunction}`
                    }}
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}
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
        </>
    );
};

ModalRoot.displayName = "@luminx/core/Modal.Root";
