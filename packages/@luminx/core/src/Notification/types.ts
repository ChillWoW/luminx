import { CSSProperties, ReactNode } from "react";
import { LoaderProps } from "../Loader";

export type NotificationRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    radius?: NotificationRadius;
    title?: ReactNode;
    withBorder?: boolean;
    withCloseButton?: boolean;
    style?: CSSProperties;
    className?: string;
    classNames?: NotificationClassNames;
}

export interface NotificationClassNames {
    root?: string;
    icon?: string;
    title?: string;
    content?: string;
    closeIcon?: string;
}
