import { NotificationData, NotificationsStore } from "./types";

type NotificationsHandler = {
    show: (notification: NotificationData) => string;
    hide: (id: string) => void;
    update: (notification: NotificationData & { id: string }) => void;
    clean: () => void;
    cleanQueue: () => void;
    updateState: (
        callback: (state: NotificationsStore) => NotificationsStore
    ) => void;
    setLimit: (limit: number) => void;
    setAutoClose: (autoClose: number | false) => void;
} | null;

let globalNotificationsHandler: NotificationsHandler = null;

export const setGlobalNotificationsHandler = (
    handler: NotificationsHandler
) => {
    globalNotificationsHandler = handler;
};

const checkHandler = (methodName: string) => {
    if (!globalNotificationsHandler) {
        const message = `Notifications system not initialized. Make sure to render NotificationsProvider.`;

        if (
            typeof process !== "undefined" &&
            process.env.NODE_ENV !== "production"
        ) {
            throw new Error(message);
        }

        console.warn(message);
        return false;
    }
    return true;
};

export const notifications = {
    show: (notification: NotificationData): string => {
        if (!checkHandler("show")) return "";
        return globalNotificationsHandler!.show(notification);
    },

    hide: (id: string): void => {
        if (!checkHandler("hide")) return;
        globalNotificationsHandler!.hide(id);
    },

    update: (notification: NotificationData & { id: string }): void => {
        if (!checkHandler("update")) return;
        globalNotificationsHandler!.update(notification);
    },

    clean: (): void => {
        if (!checkHandler("clean")) return;
        globalNotificationsHandler!.clean();
    },

    cleanQueue: (): void => {
        if (!checkHandler("cleanQueue")) return;
        globalNotificationsHandler!.cleanQueue();
    },

    updateState: (
        callback: (state: NotificationsStore) => NotificationsStore
    ): void => {
        if (!checkHandler("updateState")) return;
        globalNotificationsHandler!.updateState(callback);
    },

    setLimit: (limit: number): void => {
        if (!checkHandler("setLimit")) return;
        globalNotificationsHandler!.setLimit(limit);
    },

    setAutoClose: (autoClose: number | false): void => {
        if (!checkHandler("setAutoClose")) return;
        globalNotificationsHandler!.setAutoClose(autoClose);
    }
};

export const notify = {
    success: (message: string, opts?: Partial<NotificationData>) =>
        notifications.show({
            message,
            title: "Success",
            ...opts
        }),

    error: (message: string, opts?: Partial<NotificationData>) =>
        notifications.show({
            message,
            title: "Error",
            ...opts
        }),

    warning: (message: string, opts?: Partial<NotificationData>) =>
        notifications.show({
            message,
            title: "Warning",
            ...opts
        }),

    info: (message: string, opts?: Partial<NotificationData>) =>
        notifications.show({
            message,
            title: "Info",
            ...opts
        }),

    loading: (message: string, opts?: Partial<NotificationData>) =>
        notifications.show({
            message,
            loading: true,
            autoClose: false,
            ...opts
        })
};

export const showNotification = notifications.show;
export const hideNotification = notifications.hide;
export const updateNotification = notifications.update;
export const cleanNotifications = notifications.clean;
export const cleanNotificationsQueue = notifications.cleanQueue;
export const updateNotificationsState = notifications.updateState;
