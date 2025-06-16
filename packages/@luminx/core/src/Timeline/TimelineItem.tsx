import React, { forwardRef } from "react";
import { TimelineItemProps } from "./types";
import { useTimelineContext } from "./context";
import { useTheme } from "../_theme";

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
    (
        {
            className,
            classNames,
            title,
            bullet,
            lineVariant = "solid",
            isActive = false,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const {
            align,
            bulletSize,
            lineWidth,
            children: TimelineChildren
        } = useTimelineContext();

        const lineVariantClasses = {
            solid: "border-solid",
            dashed: "border-dashed",
            dotted: "border-dotted"
        };

        const bulletColors = {
            active: "bg-[var(--luminx-primary)] border-[var(--luminx-primary)] text-[var(--luminx-dark-text)]",
            inactive:
                theme === "light"
                    ? "bg-[var(--luminx-light-background-hover)] border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                    : "bg-[var(--luminx-dark-background-hover)] border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]"
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "relative pb-6 last:pb-0",
                    align === "left" ? "pl-8" : "pr-8",
                    className,
                    classNames?.root
                )}
                {...props}
            >
                <div
                    className={cx(
                        "absolute top-0 flex items-center justify-center z-10 rounded-full overflow-hidden",
                        align === "left" ? "left-0" : "right-0",
                        bulletColors[isActive ? "active" : "inactive"],
                        classNames?.bullet
                    )}
                    style={{
                        width: bulletSize,
                        height: bulletSize,
                        borderWidth: lineWidth
                    }}
                >
                    {bullet}
                </div>

                <div
                    className={cx(
                        "absolute top-0 bottom-0 h-full",
                        align === "left"
                            ? "border-l left-0"
                            : "border-r right-0",
                        lineVariantClasses[lineVariant],
                        theme === "light"
                            ? "border-[var(--luminx-light-border)]"
                            : "border-[var(--luminx-dark-border)]",
                        "last:hidden",
                        classNames?.line
                    )}
                    style={{
                        borderLeftWidth: align === "left" ? lineWidth : 0,
                        borderRightWidth: align === "right" ? lineWidth : 0,
                        transform: `translateX(${
                            align === "left"
                                ? bulletSize / 2 - lineWidth / 2
                                : -(bulletSize / 2 - lineWidth / 2)
                        }px)`
                    }}
                />

                <div
                    className={cx(
                        "flex flex-col",
                        align === "right" && "items-end",
                        classNames?.itemBody
                    )}
                >
                    {title && (
                        <p
                            className={cx(
                                "text-sm font-medium",
                                theme === "light"
                                    ? "text-[var(--luminx-light-text)]"
                                    : "text-[var(--luminx-dark-text)]",
                                classNames?.title
                            )}
                        >
                            {title}
                        </p>
                    )}

                    <div
                        className={cx(
                            theme === "light"
                                ? "text-[var(--luminx-light-hint)]"
                                : "text-[var(--luminx-dark-hint)]",
                            classNames?.content
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

TimelineItem.displayName = "@luminx/core/Timeline.Item";
