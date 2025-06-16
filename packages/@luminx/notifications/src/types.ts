import { ReactNode } from "react";
import { NotificationProps } from "@luminx/core";

export type NotificationPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";

export interface NotificationData
    extends Omit<NotificationProps, "children" | "onClose"> {
    id?: string;
    message: ReactNode;
    position?: NotificationPosition;
    autoClose?: number | false;
    onClose?: () => void;
    onOpen?: () => void;
}

export interface NotificationState {
    id: string;
    message: ReactNode;
    title?: ReactNode;
    icon?: ReactNode;
    loading?: boolean;
    position: NotificationPosition;
    autoClose: number | false;
    withBorder?: boolean;
    withCloseButton?: boolean;
    closeButtonSize?: number;
    style?: React.CSSProperties;
    className?: string;
    classNames?: NotificationProps["classNames"];
    onClose?: () => void;
    onOpen?: () => void;
}

export interface NotificationsStore {
    notifications: NotificationState[];
    queue: NotificationState[];
    limit: number;
    position: NotificationPosition;
    autoClose: number | false;
}

export interface NotificationsProviderProps {
    children: ReactNode;
    position?: NotificationPosition;
    autoClose?: number | false;
    limit?: number;
    zIndex?: number;
}
