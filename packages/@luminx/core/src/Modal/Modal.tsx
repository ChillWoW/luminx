import { forwardRef, useEffect, useState } from "react";
import { AnimationState, ModalProps } from "./types";
import { ModalContext } from "./context";
import { ModalRoot } from "./ModalRoot";
import { ModalContent } from "./ModalContent";
import { ModalTitle } from "./ModalTitle";
import { ModalBody } from "./ModalBody";
import { ModalOverlay } from "./ModalOverlay";

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
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
        centered = true,
        overlayOpacity = 0.6,
        fullScreen = false,
        withOverlay = true,
        style,
        className,
        transitionDuration = 200,
        transitionTimingFunction = "ease"
    } = props;

    const [mounted, setMounted] = useState(false);
    const [animationState, setAnimationState] = useState<AnimationState>(
        opened ? "entered" : "exited"
    );
    const [visible, setVisible] = useState(opened);

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
            setVisible(true);
            setAnimationState("entering");
            const timer = setTimeout(() => {
                setAnimationState("entered");
            }, 10);
            return () => clearTimeout(timer);
        } else if (mounted) {
            setAnimationState("exiting");
            const timer = setTimeout(() => {
                setAnimationState("exited");
                setVisible(false);
            }, transitionDuration);
            return () => clearTimeout(timer);
        }
    }, [opened, mounted, transitionDuration]);

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

    if (!mounted || !visible) return null;

    return (
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
                fullScreen,
                withOverlay,
                style,
                className,
                animationState,
                transitionDuration,
                transitionTimingFunction
            }}
        >
            <ModalRoot>
                <ModalOverlay />
                <ModalContent ref={ref}>
                    {(title || withCloseButton) && (
                        <ModalTitle>{title}</ModalTitle>
                    )}
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </ModalRoot>
        </ModalContext.Provider>
    );
});

const ModalExtended = Object.assign(Modal, {
    Overlay: ModalOverlay,
    Root: ModalRoot,
    Content: ModalContent,
    Title: ModalTitle,
    Body: ModalBody
});

ModalExtended.displayName = "@luminx/core/Modal";

export { ModalExtended as Modal };
