import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useCallback
} from "react";
import {
    NotificationState,
    NotificationsStore,
    NotificationData
} from "./types";

const generateId = () => {
    if (typeof window !== "undefined" && window.crypto?.randomUUID()) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 9);
};

export type NotificationsAction =
    | { type: "SHOW"; payload: NotificationState }
    | { type: "HIDE"; payload: string }
    | { type: "UPDATE"; payload: NotificationData & { id: string } }
    | { type: "CLEAN" }
    | { type: "CLEAN_QUEUE" }
    | { type: "SET_LIMIT"; payload: number }
    | { type: "SET_POSITION"; payload: NotificationData["position"] }
    | { type: "SET_AUTO_CLOSE"; payload: number | false };

const applyShow = (
    state: NotificationsStore,
    payload: NotificationState
): NotificationsStore => {
    if (state.notifications.length < state.limit) {
        return {
            ...state,
            notifications: [...state.notifications, payload]
        };
    } else {
        return {
            ...state,
            queue: [...state.queue, payload]
        };
    }
};

const applyHide = (
    state: NotificationsStore,
    id: string
): NotificationsStore => {
    const notificationIndex = state.notifications.findIndex((n) => n.id === id);

    if (notificationIndex !== -1) {
        const newNotifications = state.notifications.filter((n) => n.id !== id);
        const nextFromQueue = state.queue[0];
        const newQueue = state.queue.slice(1);

        return {
            ...state,
            notifications: nextFromQueue
                ? [...newNotifications, nextFromQueue]
                : newNotifications,
            queue: newQueue
        };
    } else {
        return {
            ...state,
            queue: state.queue.filter((n) => n.id !== id)
        };
    }
};

const applyUpdate = (
    state: NotificationsStore,
    payload: NotificationData & { id: string }
): NotificationsStore => {
    const notificationIndex = state.notifications.findIndex(
        (n) => n.id === payload.id
    );

    if (notificationIndex !== -1) {
        const updatedNotifications = state.notifications.map((n) =>
            n.id === payload.id ? { ...n, ...payload } : n
        );
        return { ...state, notifications: updatedNotifications };
    }

    const queueIndex = state.queue.findIndex((n) => n.id === payload.id);
    if (queueIndex !== -1) {
        const updatedQueue = state.queue.map((n) =>
            n.id === payload.id ? { ...n, ...payload } : n
        );
        return { ...state, queue: updatedQueue };
    }

    return state;
};

const notificationsReducer = (
    state: NotificationsStore,
    action: NotificationsAction
): NotificationsStore => {
    switch (action.type) {
        case "SHOW":
            return applyShow(state, action.payload);
        case "HIDE":
            return applyHide(state, action.payload);
        case "UPDATE":
            return applyUpdate(state, action.payload);
        case "CLEAN":
            return { ...state, notifications: [], queue: [] };
        case "CLEAN_QUEUE":
            return { ...state, queue: [] };
        case "SET_LIMIT":
            return { ...state, limit: action.payload };
        case "SET_POSITION":
            return { ...state, position: action.payload || state.position };
        case "SET_AUTO_CLOSE":
            return { ...state, autoClose: action.payload };
        default:
            return state;
    }
};

interface NotificationsContextValue {
    state: NotificationsStore;
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
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
    null
);

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error(
            "useNotifications must be used within NotificationsProvider"
        );
    }
    return context;
};

export const useNotify = () => {
    const { show, update, hide } = useNotifications();
    return { show, update, hide };
};

interface NotificationsProviderProps {
    children: ReactNode;
    position?: NotificationData["position"];
    autoClose?: number | false;
    limit?: number;
}

export const NotificationsProvider = ({
    children,
    position = "top-right",
    autoClose = 4000,
    limit = 5
}: NotificationsProviderProps) => {
    const [state, dispatch] = useReducer(notificationsReducer, {
        notifications: [],
        queue: [],
        limit,
        position,
        autoClose
    });

    const show = useCallback(
        (notification: NotificationData): string => {
            const id = notification.id || generateId();

            const notificationState: NotificationState = {
                id,
                message: notification.message,
                title: notification.title,
                icon: notification.icon,
                loading: notification.loading,
                position: notification.position || state.position,
                autoClose:
                    notification.autoClose !== undefined
                        ? notification.autoClose
                        : state.autoClose,
                withBorder: notification.withBorder,
                withCloseButton: notification.withCloseButton,
                closeButtonSize: notification.closeButtonSize,
                style: notification.style,
                className: notification.className,
                classNames: notification.classNames,
                onClose: notification.onClose,
                onOpen: notification.onOpen
            };

            dispatch({ type: "SHOW", payload: notificationState });
            return id;
        },
        [state.position, state.autoClose]
    );

    const hide = useCallback((id: string) => {
        dispatch({ type: "HIDE", payload: id });
    }, []);

    const update = useCallback(
        (notification: NotificationData & { id: string }) => {
            dispatch({ type: "UPDATE", payload: notification });
        },
        []
    );

    const clean = useCallback(() => {
        dispatch({ type: "CLEAN" });
    }, []);

    const cleanQueue = useCallback(() => {
        dispatch({ type: "CLEAN_QUEUE" });
    }, []);

    const setLimit = useCallback((limit: number) => {
        dispatch({ type: "SET_LIMIT", payload: limit });
    }, []);

    const setAutoClose = useCallback((autoClose: number | false) => {
        dispatch({ type: "SET_AUTO_CLOSE", payload: autoClose });
    }, []);

    const updateState = useCallback(
        (callback: (state: NotificationsStore) => NotificationsStore) => {
            const newState = callback(state);
            if (newState.limit !== state.limit) {
                dispatch({ type: "SET_LIMIT", payload: newState.limit });
            }
            if (newState.position !== state.position) {
                dispatch({ type: "SET_POSITION", payload: newState.position });
            }
            if (newState.autoClose !== state.autoClose) {
                dispatch({
                    type: "SET_AUTO_CLOSE",
                    payload: newState.autoClose
                });
            }
        },
        [state]
    );

    const value: NotificationsContextValue = {
        state,
        show,
        hide,
        update,
        clean,
        cleanQueue,
        updateState,
        setLimit,
        setAutoClose
    };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
};
