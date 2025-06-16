import React, { useEffect } from "react";
import { NotificationsProvider as Provider, useNotifications } from "./store";
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

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
    children,
    position = "top-right",
    autoClose = 4000,
    limit = 5,
    zIndex = 1000
}) => {
    return (
        <Provider position={position} autoClose={autoClose} limit={limit}>
            <NotificationsSetup />
            {children}
            <Notifications zIndex={zIndex} />
        </Provider>
    );
};
