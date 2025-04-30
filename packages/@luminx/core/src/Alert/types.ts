import { ReactNode } from "react";

export type AlertRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type AlertVariant = "filled" | "outline";
export type IconPosition = "start" | "center" | "end";
export type AlertShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface AlertProps {
    variant?: AlertVariant;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    radius?: AlertRadius;
    shadow?: AlertShadow;
    withCloseButton?: boolean;
    closeButtonLabel?: string;
    onClose?: () => void;
    children?: ReactNode;
    className?: string;
}

export interface AlertTitleProps {
    children: ReactNode;
    className?: string;
}

export interface AlertDescriptionProps {
    children: ReactNode;
    className?: string;
}
