import { cx } from "../_theme";
import { useDrawerContext } from "./context";

export const DrawerOverlay = () => {
    const {
        classNames,
        overlayOpacity,
        withOverlay,
        canClose,
        closeOnClickOutside,
        onClose,
        transitionDuration,
        opened
    } = useDrawerContext();

    const handleOverlayClick = () => {
        if (canClose && closeOnClickOutside) {
            onClose?.();
        }
    };

    if (!withOverlay) return null;

    return (
        <div
            className={cx("absolute inset-0 bg-black", classNames?.overlay)}
            style={{
                opacity: opened ? overlayOpacity : 0,
                transition: `opacity ${transitionDuration}ms ease`
            }}
            onClick={handleOverlayClick}
            aria-hidden="true"
        />
    );
};

DrawerOverlay.displayName = "@luminx/core/Drawer.Overlay";
