import { LoaderProps } from "../Loader";
import { ReactNode } from "react";

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    title?: ReactNode;
    withBorder?: boolean;
    withCloseButton?: boolean;
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
