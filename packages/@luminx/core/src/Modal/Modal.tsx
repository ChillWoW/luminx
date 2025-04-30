import { forwardRef, useEffect, useState } from "react";
import { ModalProps } from "./types";
import { ModalContext } from "./context";
import { ModalRoot } from "./ModalRoot";
import { Portal } from "../Portal";
import { ModalContent } from "./ModalContent";
import { ModalTitle } from "./ModalTitle";
import { ModalBody } from "./ModalBody";

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const {
        children,
        opened,
        onClose,
        withinPortal = true,
        canClose = true,
        closeOnEscape = true,
        lockScroll = true,
        title,
        withCloseButton = true,
        closeOnClickOutside = true,
        classNames,
        shadow = "sm",
        size = "md",
        radius = "md",
        padding = "md",
        zIndex,
        centered = true,
        overlayOpacity = 0.6,
        fullScreen = false,
        withOverlay = true,
        style,
        className
    } = props;

    const [mounted, setMounted] = useState(false);

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

    if (!mounted || !opened) return null;

    const Component = (
        <ModalContext.Provider
            value={{
                zIndex,
                classNames,
                centered,
                overlayOpacity,
                canClose,
                closeOnClickOutside,
                onClose,
                withCloseButton,
                size,
                radius,
                shadow,
                padding,
                fullScreen,
                withOverlay,
                style,
                className
            }}
        >
            <ModalRoot>
                <ModalContent ref={ref}>
                    {(title || withCloseButton) && (
                        <ModalTitle>{title}</ModalTitle>
                    )}
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </ModalRoot>
        </ModalContext.Provider>
    );

    return withinPortal ? <Portal>{Component}</Portal> : Component;
});

const ModalExtended = Object.assign(Modal, {
    Root: ModalRoot,
    Content: ModalContent,
    Title: ModalTitle,
    Body: ModalBody
});

ModalExtended.displayName = "Modal";

export { ModalExtended as Modal };
