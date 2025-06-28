import { forwardRef, ReactNode } from "react";
import { NotificationProps } from "./types";
import { useTheme, cx } from "../_theme";
import { Loader } from "../Loader";
import { CloseButton } from "../CloseButton";

const renderTitle = (title: ReactNode, className?: string) => {
    if (!title) return null;
    return (
        <div className={cx("text-sm font-medium mb-1", className)}>{title}</div>
    );
};

const renderContent = (content: ReactNode, className?: string) => {
    if (!content) return null;
    return <div className={cx("text-sm", className)}>{content}</div>;
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
    (
        {
            children,
            title,
            icon,
            loading,
            loaderProps = {
                size: 20,
                stroke: 2
            },
            onClose,
            withBorder,
            withCloseButton = true,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();

        const handleClose = () => {
            if (!onClose) return;
            onClose();
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={cx(
                    "p-3 rounded-md shadow-md",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)] border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)] border-[var(--luminx-dark-border)]",
                    withBorder && "border",
                    className
                )}
                {...props}
            >
                <div className="flex gap-3">
                    <div className={cx("flex items-center", classNames?.icon)}>
                        {loading ? <Loader {...loaderProps} /> : icon}
                    </div>
                    <div
                        className={cx("flex-1", !title && "flex items-center")}
                    >
                        {renderTitle(title, classNames?.title)}
                        {renderContent(
                            children,
                            cx(classNames?.content, !title && "py-0.5")
                        )}
                    </div>
                    {withCloseButton && (
                        <div className="flex items-center">
                            <CloseButton onClick={handleClose} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Notification.displayName = "@luminx/core/Notification";
