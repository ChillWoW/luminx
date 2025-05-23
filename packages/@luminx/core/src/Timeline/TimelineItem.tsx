import React, { forwardRef } from "react";
import { TimelineItemProps } from "./types";
import { useTimelineContext } from "./context";
import { cx, getRadius } from "../_theme";
import "../style.css";

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
        const {
            align,
            bulletSize,
            lineWidth,
            radius,
            children: TimelineChildren
        } = useTimelineContext();

        const lineVariantClasses = {
            solid: "border-solid",
            dashed: "border-dashed",
            dotted: "border-dotted"
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
                        classNames?.bullet
                    )}
                    style={{
                        width: bulletSize,
                        height: bulletSize,
                        borderWidth: lineWidth,
                        backgroundColor: isActive
                            ? "var(--lumin-primary)"
                            : "var(--lumin-background)",
                        borderColor: isActive
                            ? "var(--lumin-primary)"
                            : "var(--lumin-background)",
                        ...getRadius(radius)
                    }}
                >
                    {bullet}
                </div>

                <div
                    className={cx(
                        "absolute top-0 bottom-0",
                        align === "left"
                            ? "border-l left-0"
                            : "border-r right-0",
                        lineVariantClasses[lineVariant],
                        "last:hidden",
                        classNames?.line
                    )}
                    style={{
                        height: "100%",
                        borderLeftWidth: align === "left" ? lineWidth : 0,
                        borderRightWidth: align === "right" ? lineWidth : 0,
                        transform: `translateX(${
                            align === "left"
                                ? bulletSize / 2 - lineWidth / 2
                                : -(bulletSize / 2 - lineWidth / 2)
                        }px)`,
                        borderColor: isActive
                            ? "var(--lumin-primary)"
                            : "var(--lumin-hint)"
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
                                classNames?.title
                            )}
                        >
                            {title}
                        </p>
                    )}

                    <div className={cx(classNames?.content)}>{children}</div>
                </div>
            </div>
        );
    }
);

TimelineItem.displayName = "@luminx/core/Timeline.Item";
