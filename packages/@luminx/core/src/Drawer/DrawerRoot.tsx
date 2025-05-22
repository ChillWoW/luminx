import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { cx } from "../_theme";

export const DrawerRoot = ({ children }: { children: ReactNode }) => {
    const {
        zIndex,
        classNames,
        withOverlay,
        overlayOpacity,
        canClose,
        closeOnClickOutside,
        onClose,
        opened,
        transitionDuration = 300
    } = useDrawerContext();

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
                    className={cx(
                        "fixed inset-0 bg-black",
                        classNames?.overlay
                    )}
                    style={{
                        zIndex: z,
                        opacity: opened ? overlayOpacity : 0,
                        transition: `opacity ${transitionDuration}ms ease`,
                        pointerEvents: opened ? "auto" : "none"
                    }}
                    onClick={handleOverlayClick}
                    aria-hidden="true"
                />
            )}
            <div
                className={cx(
                    "fixed inset-0 flex overflow-hidden",
                    classNames?.root
                )}
                style={{
                    zIndex: z + 1,
                    pointerEvents: opened ? "auto" : "none"
                }}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </>
    );
};

DrawerRoot.displayName = "DrawerRoot";
