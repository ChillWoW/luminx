import { ElementType, MouseEvent, ReactElement, ReactNode } from "react";
import {
    UseFloatingReturn,
    FloatingContext,
    ReferenceType
} from "@floating-ui/react";

export type MenuTrigger = "hover" | "click" | "click-hover";
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
    refs: UseFloatingReturn<ReferenceType>["refs"];
    context: FloatingContext<ReferenceType>;
    floatingStyles: UseFloatingReturn<ReferenceType>["floatingStyles"];
    getReferenceProps: (props?: any) => any;
    getFloatingProps: (props?: any) => any;
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
    [key: string]: any;
}

export interface MenuDividerProps {
    className?: string;
}
