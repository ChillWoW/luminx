import { forwardRef, ReactNode } from "react";
import { NotificationProps } from "./types";
import { cx, getRadius } from "../_theme";
import { XIcon } from "../_icons";
import { Loader } from "../Loader";

const renderTitle = (title: ReactNode, className?: string) => {
    if (!title) return null;
    return (
        <div className={cx("text-sm font-semibold mb-1", className)}>
            {title}
        </div>
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
            radius = "md",
            title,
            icon,
            loading,
            loaderProps = {
                size: 32,
                color: "var(--lumin-text)"
            },
            onClose,
            withBorder,
            withCloseButton = true,
            style,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const handleClose = () => {
            if (!onClose) return;
            onClose();
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={cx(
                    "p-3 bg-[var(--lumin-background)] text-[--lumin-text]",
                    withBorder && "border border-[var(--lumin-border)]",
                    className
                )}
                style={{
                    ...getRadius(radius),
                    ...style
                }}
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
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-[var(--lumin-secondary)] rounded-full"
                            >
                                <XIcon
                                    size={12}
                                    className={classNames?.closeIcon}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Notification.displayName = "@luminx/core/Notification";
