import { forwardRef } from "react";

import { TimelineItemProps } from "./types";
import { useTimelineContext } from "./context";
import { useTheme } from "../_theme";

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
    (
        {
            title,
            description,
            bullet,
            active: itemActive,
            isLast = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const { borderVariant, size, align, classNames } = useTimelineContext();

        const isActive = itemActive !== undefined ? itemActive : false;

        const sizeClasses = {
            sm: {
                bullet: "w-6 h-6 text-xs",
                content: align === "left" ? "ml-10" : "mr-10",
                line: align === "left" ? "ml-3" : "mr-3"
            },
            md: {
                bullet: "w-8 h-8 text-sm",
                content: align === "left" ? "ml-12" : "mr-12",
                line: align === "left" ? "ml-4" : "mr-4"
            },
            lg: {
                bullet: "w-10 h-10 text-base",
                content: align === "left" ? "ml-14" : "mr-14",
                line: align === "left" ? "ml-5" : "mr-5"
            }
        };

        const borderClasses = {
            solid: "border-solid",
            dashed: "border-dashed",
            dotted: "border-dotted"
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "relative pb-8 last:pb-0",
                    align === "right" ? "flex flex-row-reverse" : "",
                    classNames?.item,
                    className
                )}
                {...props}
            >
                {!isLast && (
                    <div
                        className={cx(
                            "absolute top-0 bottom-0 w-0.5",
                            align === "left"
                                ? "border-l-2"
                                : "border-r-2 right-0",
                            borderClasses[borderVariant],
                            isActive
                                ? theme === "light"
                                    ? "border-[var(--luminx-light-border-hover)]"
                                    : "border-[var(--luminx-dark-border-hover)]"
                                : theme === "light"
                                ? "border-[var(--luminx-light-border)]"
                                : "border-[var(--luminx-dark-border)]",
                            sizeClasses[size].line,
                            classNames?.line
                        )}
                    />
                )}

                <div
                    className={cx(
                        "absolute top-0 flex items-center justify-center",
                        "rounded-full border-2 font-medium",
                        align === "right" ? "right-0" : "",
                        sizeClasses[size].bullet,
                        isActive
                            ? theme === "light"
                                ? "bg-[var(--luminx-primary)] border-[var(--luminx-primary)] text-white"
                                : "bg-[var(--luminx-primary)] border-[var(--luminx-primary)] text-white"
                            : theme === "light"
                            ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                            : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]",
                        classNames?.bullet,
                        isActive && classNames?.activeBullet
                    )}
                >
                    {bullet}
                </div>

                <div
                    className={cx(
                        "flex flex-col",
                        sizeClasses[size].content,
                        align === "right" ? "text-right" : "",
                        classNames?.wrapper
                    )}
                >
                    {title && (
                        <h3
                            className={cx(
                                "font-semibold mb-1",
                                size === "sm"
                                    ? "text-sm"
                                    : size === "md"
                                    ? "text-base"
                                    : "text-lg",
                                isActive
                                    ? theme === "light"
                                        ? "text-[var(--luminx-light-text)]"
                                        : "text-[var(--luminx-dark-text)]"
                                    : theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]",
                                classNames?.title
                            )}
                        >
                            {title}
                        </h3>
                    )}

                    {description && (
                        <p
                            className={cx(
                                "text-sm mb-2",
                                theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]",
                                classNames?.description
                            )}
                        >
                            {description}
                        </p>
                    )}

                    {children && (
                        <div
                            className={cx(
                                "text-sm",
                                theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]",
                                classNames?.content
                            )}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TimelineItem.displayName = "@luminx/core/Timeline.Item";
