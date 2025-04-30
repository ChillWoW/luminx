import { CSSProperties, ReactNode } from "react";

export type ModalPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ModalRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ModalShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";

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
    padding?: ModalPadding;
    radius?: ModalRadius;
    shadow?: ModalShadow;
    size?: ModalSize;
    title?: ReactNode;
    withCloseButton?: boolean;
    withOverlay?: boolean;
    overlayOpacity?: number;
    withinPortal?: boolean;
    zIndex?: number;
    style?: CSSProperties;
    className?: string;
    classNames?: ModalClassNames;
}

export interface ModalClassNames {
    root?: string;
    overlay?: string;
    content?: string;
    title?: string;
    closeButton?: string;
    body?: string;
}
