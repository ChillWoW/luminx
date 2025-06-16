import { CSSProperties, ReactNode } from "react";
import { LoaderProps } from "../Loader";

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    title?: ReactNode;
    withBorder?: boolean;
    withCloseButton?: boolean;
    closeButtonSize?: number;
    style?: CSSProperties;
    className?: string;
    classNames?: NotificationClassNames;
}

export interface NotificationClassNames {
    root?: string;
    icon?: string;
    title?: string;
    content?: string;
    closeButton?: string;
}
