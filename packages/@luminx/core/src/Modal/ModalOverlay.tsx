import { cx } from "../_theme";
import { useModalContext } from "./context";

export const ModalOverlay = () => {
    const {
        zIndex,
        classNames,
        overlayOpacity,
        withOverlay,
        canClose,
        closeOnClickOutside,
        onClose,
        fullScreen,
        animationState,
        transitionDuration,
        transitionTimingFunction
    } = useModalContext();

    const handleOverlayClick = () => {
        if (canClose && closeOnClickOutside) {
            onClose?.();
        }
    };

    const getOpacity = () => {
        switch (animationState) {
            case "entering":
                return 0;
            case "entered":
                return overlayOpacity;
            case "exiting":
                return 0;
            case "exited":
            default:
                return 0;
        }
    };

    const getTargetOpacity = () => {
        switch (animationState) {
            case "entering":
            case "entered":
                return overlayOpacity;
            case "exiting":
            case "exited":
            default:
                return 0;
        }
    };

    if (!withOverlay || fullScreen) return null;

    return (
        <div
            className={cx("absolute inset-0 bg-black", classNames?.overlay)}
            style={{
                opacity: getTargetOpacity(),
                transition:
                    animationState === "entering"
                        ? `opacity ${transitionDuration}ms ${transitionTimingFunction}`
                        : `opacity ${transitionDuration}ms ${transitionTimingFunction}`
            }}
            onClick={handleOverlayClick}
            aria-hidden="true"
        />
    );
};

ModalOverlay.displayName = "@luminx/core/Modal.Overlay";
