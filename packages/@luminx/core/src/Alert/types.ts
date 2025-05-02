import { ReactNode } from "react";
import { Padding, Shadow } from "../_theme";

export type AlertRadius =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl";
export type AlertVariant = "filled" | "outline";
export type IconPosition = "start" | "center" | "end";

export interface AlertClassNames {
    root?: string;
    wrapper?: string;
    container?: string;
    icon?: string;
    closeButton?: string;
}

export interface AlertProps {
    variant?: AlertVariant;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    radius?: AlertRadius;
    shadow?: Shadow;
    padding?: Padding;
    withCloseButton?: boolean;
    closeButtonLabel?: string;
    onClose?: () => void;
    withBorder?: boolean;
    children?: ReactNode;
    className?: string;
    classNames?: AlertClassNames;
}

export interface AlertTitleProps {
    children: ReactNode;
    className?: string;
}

export interface AlertDescriptionProps {
    children: ReactNode;
    className?: string;
}
