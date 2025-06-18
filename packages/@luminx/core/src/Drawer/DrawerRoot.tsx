import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { cx } from "../_theme";

export const DrawerRoot = ({ children }: { children: ReactNode }) => {
    const { zIndex, classNames, opened } = useDrawerContext();

    const z = zIndex || 200;

    return (
        <>
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

DrawerRoot.displayName = "@luminx/core/Drawer.Root";
