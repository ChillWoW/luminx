import React, { useEffect, useRef, useState, useMemo } from "react";
import { Notification, Transition } from "@luminx/core";
import { NotificationState } from "./types";

export const getTransitionForPosition = (
    position: NotificationState["position"]
) => {
    switch (position) {
        case "top-left":
            return "slide-right";
        case "top-center":
            return "slide-down";
        case "bottom-left":
            return "slide-left";
        case "bottom-right":
            return "slide-left";
        case "bottom-center":
            return "slide-up";
        default:
            return "slide-left";
    }
};

interface NotificationItemProps {
    notification: NotificationState;
    onHide: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    notification,
    onHide
}) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mounted, setMounted] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(notification.autoClose);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        if (notification.onOpen) {
            notification.onOpen();
        }
    }, [notification.onOpen]);

    useEffect(() => {
        if (notification.autoClose === false || notification.autoClose <= 0) {
            return;
        }

        if (isPaused) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            return;
        }

        const timeToWait =
            typeof remainingTime === "number"
                ? remainingTime
                : notification.autoClose;
        startTimeRef.current = Date.now();

        timeoutRef.current = setTimeout(() => {
            setMounted(false);
        }, timeToWait);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [notification.autoClose, isPaused, remainingTime]);

    const handleMouseEnter = () => {
        if (notification.autoClose !== false && notification.autoClose > 0) {
            setIsPaused(true);
            if (timeoutRef.current) {
                const elapsed = Date.now() - startTimeRef.current;
                const remaining =
                    typeof remainingTime === "number"
                        ? remainingTime - elapsed
                        : notification.autoClose - elapsed;
                setRemainingTime(Math.max(0, remaining));
            }
        }
    };

    const handleMouseLeave = () => {
        if (notification.autoClose !== false && notification.autoClose > 0) {
            setIsPaused(false);
        }
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (typeof document !== "undefined") {
                if (document.visibilityState === "hidden") {
                    handleMouseEnter();
                } else {
                    handleMouseLeave();
                }
            }
        };

        if (typeof document !== "undefined") {
            document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            return () => {
                document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                );
            };
        }
    }, []);

    const handleClose = () => {
        if (notification.onClose) {
            notification.onClose();
        }
        setMounted(false);
    };

    const handleExited = () => {
        onHide(notification.id);
    };

    return (
        <Transition
            mounted={mounted}
            transition={getTransitionForPosition(notification.position)}
            duration={300}
            timingFunction="ease-out"
            keepMounted={false}
            onExited={handleExited}
        >
            <div
                className="mb-3"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Notification
                    title={notification.title}
                    icon={notification.icon}
                    loading={notification.loading}
                    withBorder={notification.withBorder}
                    withCloseButton={notification.withCloseButton}
                    closeButtonSize={notification.closeButtonSize}
                    style={notification.style}
                    className={notification.className}
                    classNames={notification.classNames}
                    onClose={handleClose}
                >
                    {notification.message}
                </Notification>
            </div>
        </Transition>
    );
};

interface NotificationContainerProps {
    notifications: NotificationState[];
    position: NotificationState["position"];
    onHide: (id: string) => void;
    zIndex?: number;
}

const getPositionStyles = (position: NotificationState["position"]) => {
    const baseStyles = "fixed";

    switch (position) {
        case "top-left":
            return `${baseStyles} top-0 left-0 ml-2 mt-2`;
        case "top-center":
            return `${baseStyles} top-0 left-1/2 transform -translate-x-1/2 mt-2`;
        case "bottom-left":
            return `${baseStyles} bottom-0 left-0 ml-2 mb-2`;
        case "bottom-right":
            return `${baseStyles} bottom-0 right-0 mr-2 mb-2`;
        case "bottom-center":
            return `${baseStyles} bottom-0 left-1/2 transform -translate-x-1/2 mb-2`;
        default:
            return `${baseStyles} top-0 right-0 mr-2 mt-2`;
    }
};

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
    notifications,
    position,
    onHide,
    zIndex = 1000
}) => {
    const notificationsByPosition = useMemo(() => {
        return notifications.reduce((acc, notification) => {
            const pos = notification.position;
            if (!acc[pos]) {
                acc[pos] = [];
            }
            acc[pos].push(notification);
            return acc;
        }, {} as Record<string, NotificationState[]>);
    }, [notifications]);

    return (
        <>
            {Object.entries(notificationsByPosition).map(([pos, notifs]) => (
                <div
                    key={pos}
                    className={getPositionStyles(
                        pos as NotificationState["position"]
                    )}
                    style={{ zIndex }}
                >
                    <div className="pointer-events-auto w-80 max-w-sm">
                        {notifs.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onHide={onHide}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};
