import React, { forwardRef } from "react";
import { EmptyStateProps } from "./types";
import { useTheme } from "../_theme";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
    (
        {
            size = "md",
            orientation = "vertical",
            icon,
            title,
            description,
            actions,
            spacing = "md",
            withBorder,
            withAnimation,
            centered = true,
            className,
            classNames,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const getSizeClasses = () => {
            const iconSizes = {
                xs: "w-8 h-8",
                sm: "w-12 h-12",
                md: "w-16 h-16",
                lg: "w-20 h-20",
                xl: "w-24 h-24"
            };

            const titleSizes = {
                xs: "text-sm",
                sm: "text-base",
                md: "text-lg",
                lg: "text-xl",
                xl: "text-2xl"
            };

            const descriptionSizes = {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
                xl: "text-xl"
            };

            return {
                icon: iconSizes[size],
                title: titleSizes[size],
                description: descriptionSizes[size]
            };
        };

        const getSpacingClasses = () => {
            const spacingMap = {
                xs: "gap-1",
                sm: "gap-2",
                md: "gap-4",
                lg: "gap-6",
                xl: "gap-8"
            };
            return spacingMap[spacing];
        };

        const getOrientationClasses = () => {
            if (orientation === "horizontal") {
                return "flex-row items-center text-left";
            }
            return "flex-col items-center text-center";
        };

        const getBorderClasses = () => {
            if (!withBorder) return "";
            return theme === "light"
                ? "border border-[var(--luminx-light-border)]"
                : "border border-[var(--luminx-dark-border)]";
        };

        const getTextClasses = () => {
            return theme === "light"
                ? "text-[var(--luminx-light-text)]"
                : "text-[var(--luminx-dark-text)]";
        };

        const sizeClasses = getSizeClasses();

        return (
            <div
                ref={ref}
                className={cx(
                    "flex",
                    centered &&
                        "justify-center items-center h-full p-4 w-full rounded-md",
                    getBorderClasses(),
                    classNames?.root,
                    className
                )}
                {...props}
            >
                <div
                    className={cx(
                        "flex",
                        getOrientationClasses(),
                        getSpacingClasses(),
                        "max-w-full",
                        withAnimation &&
                            "transition-all duration-300 ease-in-out",
                        classNames?.container
                    )}
                >
                    {icon && (
                        <div
                            className={cx(
                                "flex-shrink-0",
                                sizeClasses.icon,
                                "flex items-center justify-center",
                                theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]",
                                withAnimation && "animate-pulse",
                                classNames?.icon
                            )}
                        >
                            {icon}
                        </div>
                    )}

                    <div
                        className={cx(
                            "flex flex-col",
                            orientation === "horizontal" ? "gap-1" : "gap-2",
                            "max-w-full",
                            classNames?.content
                        )}
                    >
                        {title && (
                            <div
                                className={cx(
                                    "font-semibold",
                                    sizeClasses.title,
                                    getTextClasses(),
                                    classNames?.title
                                )}
                            >
                                {title}
                            </div>
                        )}

                        {description && (
                            <div
                                className={cx(
                                    sizeClasses.description,
                                    theme === "light"
                                        ? "text-[var(--luminx-light-hint)]"
                                        : "text-[var(--luminx-dark-hint)]",
                                    "leading-relaxed",
                                    classNames?.description
                                )}
                            >
                                {description}
                            </div>
                        )}

                        {(actions || children) && (
                            <div
                                className={cx(
                                    "flex flex-wrap gap-2",
                                    orientation === "vertical"
                                        ? "justify-center"
                                        : "justify-start",
                                    "mt-2",
                                    classNames?.actions
                                )}
                            >
                                {actions || children}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

EmptyState.displayName = "@luminx/core/EmptyState";
