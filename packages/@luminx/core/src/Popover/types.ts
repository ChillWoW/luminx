import { ReactElement, ReactNode, RefObject } from "react";
import {
    UseFloatingReturn,
    FloatingContext,
    ReferenceType
} from "@floating-ui/react";

export type PopoverTrigger = "click" | "hover" | "hover-click";
export type PopoverPosition =
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";

export interface PopoverOffset {
    mainAxis?: number;
    crossAxis?: number;
}

export interface PopoverProps {
    children: ReactNode;
    defaultOpened?: boolean;
    opened?: boolean;
    onChange?: (opened: boolean) => void;
    trigger?: PopoverTrigger;
    position?: PopoverPosition;
    offset?: number | PopoverOffset;
    withArrow?: boolean;
    arrowSize?: number;
    arrowRadius?: number;
    trapFocus?: boolean;
    disabled?: boolean;
    openDelay?: number;
    closeDelay?: number;
    zIndex?: number;
    classNames?: PopoverClassNames;
}

export interface PopoverClassNames {
    root?: string;
    dropdown?: string;
    arrow?: string;
}

export interface PopoverContextType extends PopoverProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    toggle: () => void;
    refs: UseFloatingReturn<ReferenceType>["refs"];
    context: FloatingContext<ReferenceType>;
    floatingStyles: UseFloatingReturn<ReferenceType>["floatingStyles"];
    getReferenceProps: (props?: any) => any;
    getFloatingProps: (props?: any) => any;
    targetId: string;
    dropdownId: string;
    middlewareData: UseFloatingReturn<ReferenceType>["middlewareData"];
    arrowRef: RefObject<SVGSVGElement | null>;
}

export interface PopoverTargetProps {
    children: ReactElement | ReactNode;
    refProp?: string;
}

export interface PopoverDropdownProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
