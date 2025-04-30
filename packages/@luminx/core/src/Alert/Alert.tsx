import React, { forwardRef, useState } from "react";
import {
    AlertProps,
    AlertTitleProps,
    AlertDescriptionProps,
    IconPosition
} from "./types";
import { getRadius, getShadow } from "../_theme";

interface AlertComponent extends React.ForwardRefExoticComponent<AlertProps> {
    Title: React.ForwardRefExoticComponent<AlertTitleProps>;
    Description: React.ForwardRefExoticComponent<AlertDescriptionProps>;
}

const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`text-sm font-semibold mb-1 ${className || ""}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AlertTitle.displayName = "Alert.Title";

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={`text-sm ${className || ""}`} {...props}>
                {children}
            </div>
        );
    }
);

AlertDescription.displayName = "Alert.Description";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            variant = "filled",
            icon,
            iconPosition = "start",
            radius = "md",
            shadow = "none",
            withCloseButton = false,
            closeButtonLabel = "Close",
            onClose,
            children,
            className = "",
            ...props
        },
        ref
    ) => {
        const [hidden, setHidden] = useState(false);

        const handleClose = () => {
            setHidden(true);
            onClose?.();
        };

        const variantClasses = {
            filled: `bg-[var(--lumin-primary)] text-[var(--lumin-text)]`,
            outline: `border border-[var(--lumin-primary)] text-[var(--lumin-primary)]`
        };

        const iconPositionClasses = {
            start: "items-start",
            center: "items-center",
            end: "items-end"
        };

        if (hidden) return null;

        return (
            <div
                ref={ref}
                role="alert"
                className={`p-4 ${variantClasses[variant]} ${className}`}
                style={{
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                {...props}
            >
                <div className="flex gap-3">
                    {icon && (
                        <div
                            className={`flex ${iconPositionClasses[iconPosition]} mt-0.5`}
                        >
                            {icon}
                        </div>
                    )}
                    <div className="flex-1">{children}</div>
                    {withCloseButton && (
                        <button
                            onClick={handleClose}
                            aria-label={closeButtonLabel}
                            className="self-start text-current opacity-70 hover:opacity-100 transition-opacity"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        );
    }
) as AlertComponent;

Alert.displayName = "Alert";

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export { Alert, AlertTitle, AlertDescription };
