import { CSSProperties, ReactNode } from "react";
import { LoaderProps } from "../Loader";
import { Radius, Shadow } from "../_theme";

export interface NotificationProps {
    children: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    loaderProps?: LoaderProps;
    onClose?: () => void;
    radius?: Radius;
    shadow?: Shadow;
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
    closeButton?: string;
}
