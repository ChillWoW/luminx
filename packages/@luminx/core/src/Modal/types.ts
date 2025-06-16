import { CSSProperties, ReactNode } from "react";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
export type AnimationState = "entering" | "entered" | "exiting" | "exited";

export interface ModalProps {
    children: React.ReactNode;
    opened: boolean;
    onClose: () => void;
    canClose?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    centered?: boolean;
    fullScreen?: boolean;
    lockScroll?: boolean;
    size?: ModalSize;
    title?: ReactNode;
    withCloseButton?: boolean;
    withOverlay?: boolean;
    overlayOpacity?: number;
    zIndex?: number;
    style?: CSSProperties;
    className?: string;
    classNames?: ModalClassNames;
    transitionDuration?: number;
    transitionTimingFunction?: string;
}

export interface ModalClassNames {
    root?: string;
    overlay?: string;
    content?: string;
    title?: string;
    closeButton?: string;
    body?: string;
}

export interface ModalContextValue extends Partial<ModalProps> {
    animationState?: AnimationState;
}
