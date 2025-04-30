import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { cn } from "../_utils";

export const DrawerRoot = ({ children }: { children: ReactNode }) => {
    const {
        zIndex,
        classNames,
        withOverlay,
        overlayOpacity,
        canClose,
        closeOnClickOutside,
        onClose
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
                    "fixed inset-0 flex overflow-hidden",
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

DrawerRoot.displayName = "DrawerRoot";
