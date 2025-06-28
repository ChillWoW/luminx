import { ButtonHTMLAttributes, ReactNode } from "react";

export type FloatingButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type FloatingButtonPosition =
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left";
export type FloatingButtonTrigger = "click" | "hover";
export type FloatingButtonDirection = "up" | "down" | "left" | "right";
export type FloatingButtonActionVariant = "filled" | "outline" | "ghost";

export interface FloatingButtonActionProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    icon?: ReactNode;
    children?: ReactNode;
    variant?: FloatingButtonActionVariant;
    className?: string;
    style?: React.CSSProperties;
}

export interface FloatingButtonProps {
    children?:
        | React.ReactElement<FloatingButtonActionProps>
        | React.ReactElement<FloatingButtonActionProps>[];
    icon?: ReactNode;
    label?: string;
    size?: FloatingButtonSize;
    position?: FloatingButtonPosition;
    trigger?: FloatingButtonTrigger;
    direction?: FloatingButtonDirection;
    disabled?: boolean;
    opened?: boolean;
    onChange?: (opened: boolean) => void;
    defaultOpened?: boolean;
    animationDuration?: number;
    actionSpacing?: number;
    withBlur?: boolean;
    closeOnActionClick?: boolean;
    closeOnOutsideClick?: boolean;
    zIndex?: number;
    withinPortal?: boolean;
    portalTarget?: HTMLElement | string;
    withHover?: boolean;
    className?: string;
    classNames?: FloatingButtonClassNames;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export interface FloatingButtonClassNames {
    root?: string;
    button?: string;
    actions?: string;
    action?: string;
    backdrop?: string;
    label?: string;
    icon?: string;
}

export interface FloatingButtonContextValue {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    toggle: () => void;
    closeOnActionClick: boolean;
    size: FloatingButtonSize;
    direction: FloatingButtonDirection;
    animationDuration: number;
    actionSpacing: number;
    disabled: boolean;
    withHover: boolean;
    classNames?: FloatingButtonClassNames;
}
