import { forwardRef, useEffect, useState } from "react";
import { DrawerProps } from "./types";
import { DrawerContext } from "./context";
import { DrawerRoot } from "./DrawerRoot";
import { DrawerContent } from "./DrawerContent";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerBody } from "./DrawerBody";

const Drawer = forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
    const {
        children,
        opened,
        onClose,
        canClose = true,
        closeOnEscape = true,
        lockScroll = true,
        title,
        withCloseButton = true,
        closeOnClickOutside = true,
        classNames,
        size = "md",
        zIndex,
        position = "left",
        offset = 0,
        overlayOpacity = 0.6,
        withOverlay = true,
        style,
        className,
        transitionDuration = 250
    } = props;

    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (canClose && closeOnEscape) {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [canClose, onClose, closeOnEscape]);

    useEffect(() => {
        if (opened) {
            setMounted(true);
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
            const timer = setTimeout(() => {
                if (!opened) setMounted(false);
            }, transitionDuration);
            return () => clearTimeout(timer);
        }
    }, [opened, transitionDuration]);

    useEffect(() => {
        if (!lockScroll) return;

        if (opened) {
            const originalStyle = window.getComputedStyle(
                document.body
            ).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [opened, lockScroll]);

    if (!mounted) return null;

    const contextValue = {
        zIndex,
        classNames,
        overlayOpacity,
        canClose,
        closeOnClickOutside,
        onClose,
        withCloseButton,
        size,
        withOverlay,
        position,
        offset,
        style,
        className,
        opened: visible,
        transitionDuration
    };

    return (
        <DrawerContext.Provider value={contextValue}>
            <DrawerRoot>
                <DrawerContent ref={ref}>
                    {(title || withCloseButton) && (
                        <DrawerTitle>{title}</DrawerTitle>
                    )}
                    <DrawerBody>{children}</DrawerBody>
                </DrawerContent>
            </DrawerRoot>
        </DrawerContext.Provider>
    );
});

const DrawerExtended = Object.assign(Drawer, {
    Root: DrawerRoot,
    Content: DrawerContent,
    Title: DrawerTitle,
    Body: DrawerBody
});

DrawerExtended.displayName = "@luminx/core/Drawer";

export { DrawerExtended as Drawer };
