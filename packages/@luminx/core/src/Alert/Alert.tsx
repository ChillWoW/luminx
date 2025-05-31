import React, { forwardRef, useState } from "react";
import { AlertProps } from "./types";
import { getRadius, getShadow, useTheme } from "../_theme";
import { IconX } from "@tabler/icons-react";
import { AlertTitle } from "./AlertTitle";
import { AlertDescription } from "./AlertDescription";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            variant = "filled",
            icon,
            iconPosition = "center",
            withCloseButton = false,
            closeButtonLabel = "Close",
            onClose,
            withBorder,
            children,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [hidden, setHidden] = useState(false);

        const handleClose = () => {
            setHidden(true);
            onClose?.();
        };

        const getIconPosition = () => {
            switch (iconPosition) {
                case "start":
                    return "items-start";
                case "end":
                    return "items-end";
                default:
                    return "items-center";
            }
        };

        const getVariant = () => {
            switch (variant) {
                case "outline":
                    return theme === "light"
                        ? "border border-[var(--luminx-light-border)]"
                        : "border border-[var(--luminx-dark-border)]";
                default:
                    return theme === "light"
                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]";
            }
        };
        if (hidden) return null;

        const getBorder =
            theme === "light"
                ? "border border-[var(--luminx-light-border)]"
                : "border border-[var(--luminx-dark-border)]";

        return (
            <div
                ref={ref}
                role="alert"
                className={cx(
                    "p-3 rounded-md",
                    getVariant(),
                    withBorder && getBorder,
                    classNames?.root,
                    className
                )}
                {...props}
            >
                <div
                    className={cx(
                        "flex justify-between gap-2",
                        classNames?.wrapper
                    )}
                >
                    <div className={cx("flex gap-2", classNames?.container)}>
                        {icon && (
                            <div
                                className={cx(
                                    "flex",
                                    getIconPosition(),
                                    classNames?.icon
                                )}
                            >
                                {icon}
                            </div>
                        )}
                        <div className="flex-1">{children}</div>
                    </div>
                    {withCloseButton && (
                        <div className={classNames?.closeButton}>
                            <IconX
                                aria-label={closeButtonLabel}
                                style={{
                                    cursor: "pointer"
                                }}
                                size={18}
                                onClick={handleClose}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

const ExtendedAlert = Object.assign(Alert, {
    Title: AlertTitle,
    Description: AlertDescription
});

ExtendedAlert.displayName = "@luminx/core/Alert";

export { ExtendedAlert as Alert };
