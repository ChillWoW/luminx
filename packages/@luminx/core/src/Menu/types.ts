import { ElementType, MouseEvent, ReactElement, ReactNode } from "react";
import { TransitionProps } from "../Transition";

export type MenuTrigger = "hover" | "click" | "click-hover";
export type MenuRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type MenuShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type MenuPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type MenuPosition =
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "top"
    | "top-start"
    | "top-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";

export interface MenuProps {
    children: React.ReactNode;
    defaultOpened?: boolean;
    opened?: boolean;
    onChange?: (opened: boolean) => void;
    trigger?: MenuTrigger;
    radius?: MenuRadius;
    shadow?: MenuShadow;
    position?: MenuPosition;
    width?: number | string;
    offset?: number;
    zIndex?: number;
    openDelay?: number;
    closeDelay?: number;
    trapFocus?: boolean;
    withinPortal?: boolean;
    portalTarget?: HTMLElement | string;
    itemTabIndex?: number;
    transitionProps?: TransitionProps;
    classNames?: MenuClassNames;
}

export interface MenuClassNames {
    root?: string;
    dropdown?: string;
    arrow?: string;
    overlay?: string;
    divider?: string;
    label?: string;
    item?: string;
    itemLabel?: string;
    itemSection?: string;
}

export interface MenuContextType extends MenuProps {
    toggle: () => void;
    setOpened: (opened: boolean) => void;
    setTargetElement: (element: HTMLElement | null) => void;
    targetElement: HTMLElement | null;
    targetId: string;
    dropdownId: string;
    classNames?: MenuClassNames;
}

export interface MenuTargetProps {
    children: ReactElement;
}

export interface MenuDropdownProps {
    children: ReactNode;
    className?: string;
    padding?: MenuPadding;
}

export type MenuLabelPosition = "left" | "center" | "right";
export interface MenuLabelProps {
    children: ReactNode;
    className?: string;
    centered?: boolean;
    position?: MenuLabelPosition;
}

export interface MenuItemProps {
    children: ReactNode;
    key?: string;
    disabled?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    component?: ElementType | string;
    radius?: MenuRadius;
    [key: string]: any;
}

export interface MenuDividerProps {
    className?: string;
}
