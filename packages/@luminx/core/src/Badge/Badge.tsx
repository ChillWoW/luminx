import React, { forwardRef } from "react";
import { BadgeProps } from "./types";
import { getRadius, getShadow, useTheme } from "../_theme";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            children,
            variant = "filled",
            size = "sm",
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
        const { theme, cx } = useTheme();

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
                    return "border border-[var(--luminx-primary)] text-[var(--luminx-dark-text)]";
                default:
                    return "bg-[var(--luminx-primary)] text-[var(--luminx-dark-text)]";
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

        const Element = Component as React.ElementType | "div";

        return (
            <Element
                ref={ref}
                className={cx(
                    "inline-flex items-center whitespace-nowrap font-medium w-fit rounded-xl",
                    getVariant(),
                    getSize(),
                    fullWidth && "w-full",
                    classNames?.root,
                    className
                )}
                {...props}
            >
                {renderSection(leftSection, "left")}
                <span className={cx(classNames?.label)}>{children}</span>
                {renderSection(rightSection, "right")}
            </Element>
        );
    }
);

Badge.displayName = "@luminx/core/Badge";
