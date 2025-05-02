import React, { forwardRef } from "react";
import { BadgeProps } from "./types";
import { getRadius, getShadow, cx } from "../_theme";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            children,
            variant = "filled",
            size = "sm",
            radius = "xl",
            shadow,
            leftSection,
            rightSection,
            fullWidth = false,
            className,
            classNames,
            component: Component = "div",
            ...props
        },
        ref
    ) => {
        const getSize = () => {
            switch (size) {
                case "xs":
                    return "text-xs px-2 py-0.5";
                case "md":
                    return "text-base px-3 py-1.5";
                case "lg":
                    return "text-lg px-4 py-2";
                case "xl":
                    return "text-xl px-5 py-2.5";
                default:
                    return "text-sm px-2.5 py-1";
            }
        };

        const getVariant = () => {
            switch (variant) {
                case "outline":
                    return "border border-[var(--lumin-primary)] text-[var(--lumin-text)]";
                default:
                    return "bg-[var(--lumin-primary)] text-[var(--lumin-text)]";
            }
        };

        const renderSection = (
            content: React.ReactNode,
            position: "left" | "right"
        ) => {
            if (!content) return null;

            const getPosition = () => {
                switch (position) {
                    case "right":
                        return "ml-2";
                    default:
                        return "mr-2";
                }
            };

            return (
                <div
                    className={cx(
                        "inline-flex items-center",
                        getPosition(),
                        classNames?.section
                    )}
                >
                    {content}
                </div>
            );
        };

        return (
            <Component
                ref={ref}
                className={cx(
                    "inline-flex items-center whitespace-nowrap font-medium w-fit",
                    getVariant(),
                    getSize(),
                    fullWidth && "lumin-badge-root-fw",
                    classNames?.root,
                    className
                )}
                style={{
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                {...props}
            >
                {renderSection(leftSection, "left")}
                <span className={cx(classNames?.label)}>{children}</span>
                {renderSection(rightSection, "right")}
            </Component>
        );
    }
);

Badge.displayName = "@luminx/core/Badge";
