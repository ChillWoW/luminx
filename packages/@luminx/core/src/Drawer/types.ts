import { CSSProperties, ReactNode } from "react";

export type DrawerPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type DrawerRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type DrawerShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
    children: React.ReactNode;
    opened: boolean;
    onClose: () => void;
    canClose?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    lockScroll?: boolean;
    padding?: DrawerPadding;
    radius?: DrawerRadius;
    shadow?: DrawerShadow;
    size?: DrawerSize;
    title?: ReactNode;
    withCloseButton?: boolean;
    withOverlay?: boolean;
    overlayOpacity?: number;
    withinPortal?: boolean;
    zIndex?: number;
    position?: DrawerPosition;
    offset?: number;
    transitionDuration?: number;
    style?: CSSProperties;
    className?: string;
    classNames?: DrawerClassNames;
}

export interface DrawerClassNames {
    root?: string;
    overlay?: string;
    content?: string;
    title?: string;
    closeButton?: string;
    body?: string;
    header?: string;
}
