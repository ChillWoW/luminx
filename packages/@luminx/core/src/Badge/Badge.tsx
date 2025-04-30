import React, { forwardRef } from "react";
import { cn } from "../_utils";
import { BadgeProps } from "./types";
import { getRadius, getShadow } from "../_theme";
import "../style.css";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            children,
            variant = "filled",
            size = "md",
            radius = "xl",
            shadow = "none",
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
        const sizeClasses = {
            xs: "text-xs px-2 py-0.5",
            sm: "text-sm px-2.5 py-0.5",
            md: "text-base px-3 py-1",
            lg: "text-lg px-3.5 py-1.5",
            xl: "text-xl px-4 py-2"
        };

        const variantClasses = () => {
            const variants = {
                filled: "bg-[var(--lumin-primary)]",
                outline:
                    "bg-transparent border border-[var(--lumin-primary)] text-[var(--lumin-primary)]"
            };

            return variants[variant] || variants.filled;
        };

        const renderSection = (
            content: React.ReactNode,
            position: "left" | "right"
        ) => {
            if (!content) return null;

            return (
                <div
                    className={cn(
                        "flex items-center",
                        position === "left" ? "mr-1" : "ml-1",
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
                className={cn(
                    "inline-flex items-center whitespace-nowrap font-medium",
                    sizeClasses[size],
                    variantClasses(),
                    fullWidth && "w-full justify-center",
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
                <span className={cn(classNames?.label)}>{children}</span>
                {renderSection(rightSection, "right")}
            </Component>
        );
    }
);

Badge.displayName = "Badge";

export default Badge;
