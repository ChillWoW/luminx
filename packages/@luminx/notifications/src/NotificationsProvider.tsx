import React, { useEffect } from "react";
import {
    NotificationsProvider as StoreProvider,
    useNotifications
} from "./store";
import { setGlobalNotificationsHandler } from "./notificationsApi";
import { Notifications } from "./Notifications";
import { NotificationsProviderProps } from "./types";
import "./style.css";

const NotificationsSetup: React.FC = () => {
    const notificationsContext = useNotifications();

    useEffect(() => {
        setGlobalNotificationsHandler(notificationsContext);

        return () => {
            setGlobalNotificationsHandler(null);
        };
    }, [notificationsContext]);

    return null;
};

// Context-only provider that doesn't render any UI
export const NotificationsContextProvider: React.FC<{
    children: React.ReactNode;
    position?: NotificationsProviderProps["position"];
    autoClose?: NotificationsProviderProps["autoClose"];
    limit?: NotificationsProviderProps["limit"];
}> = ({ children, position = "top-right", autoClose = 4000, limit = 5 }) => {
    return (
        <StoreProvider position={position} autoClose={autoClose} limit={limit}>
            <NotificationsSetup />
            {children}
        </StoreProvider>
    );
};

// Full provider that includes the Notifications component (existing behavior)
export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
    children,
    position = "top-right",
    autoClose = 4000,
    limit = 5,
    zIndex = 1000
}) => {
    return (
        <NotificationsContextProvider
            position={position}
            autoClose={autoClose}
            limit={limit}
        >
            {children}
            <Notifications zIndex={zIndex} />
        </NotificationsContextProvider>
    );
};
