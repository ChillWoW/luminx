import { ReactNode } from "react";

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
    withCloseButton?: boolean;
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
