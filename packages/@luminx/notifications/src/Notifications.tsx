import React from "react";
import { useNotifications } from "./store";
import { NotificationContainer } from "./NotificationContainer";

interface NotificationsProps {
    zIndex?: number;
}

export const Notifications: React.FC<NotificationsProps> = React.memo(
    ({ zIndex = 1000 }) => {
        const { state, hide } = useNotifications();

        return (
            <NotificationContainer
                notifications={state.notifications}
                position={state.position}
                onHide={hide}
                zIndex={zIndex}
            />
        );
    }
);

Notifications.displayName = "Notifications";
