import React, { forwardRef } from "react";
import { cn, ComponentLoader } from "../_utils";
import { ButtonProps } from "./types";
import { getRadius } from "../_theme";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            type = "button",
            as = "button",
            leftSection,
            rightSection,
            variant = "filled",
            radius = "md",
            size = "sm",
            color,
            disabled,
            active,
            hover = true,
            loading,
            loadingPosition = "left",
            loader,
            fullWidth,
            href,
            target,
            align = "center",
            style,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const sizeClasses = () => {
            const styles = {
                xs: "text-xs px-3 py-1.5",
                sm: "text-sm px-3.5 py-2",
                md: "text-base px-4 py-2.5",
                lg: "text-lg px-5 py-3",
                xl: "text-xl px-6 py-3.5"
            };
            return styles[size] || styles.sm;
        };

        const variantClasses = () => {
            if (variant === "unstyled") return "";

            const styles = {
                filled: `bg-[var(--lumin-background)] border border-[var(--lumin-border)] hover:bg-[var(--lumin-background-hover)] ${
                    active && "bg-[var(--lumin-background-hover)]"
                }`,
                outline: `bg-transparent border border-[var(--lumin-border)] hover:border-[var(--lumin-border-hover)] ${
                    active && "border-[var(--lumin-border-hover)]"
                }`
            };

            return styles[variant] || styles.filled;
        };

        const renderSection = (
            content: React.ReactNode,
            side: "left" | "right"
        ) => {
            if (!content) return null;

            const baseClasses = "flex items-center justify-center h-full";
            const sectionClasses =
                side === "left"
                    ? classNames?.leftSection
                    : classNames?.rightSection;

            return (
                <div
                    className={cn(
                        baseClasses,
                        "text-[var(--lumin-section)]",
                        disabled && "opacity-60 cursor-not-allowed",
                        disabled && classNames?.sectionDisabled,
                        sectionClasses
                    )}
                >
                    {content}
                </div>
            );
        };

        const renderLoader = () => {
            if (!loading) return null;

            return loader || <ComponentLoader />;
        };

        const getAlign = () => {
            if (align === "left") return "justify-start";
            if (align === "right") return "justify-end";
            return "justify-center";
        };

        const Element = as as React.ElementType;

        return (
            <Element
                className={cn(
                    "text-[var(--lumin-text)] inline-flex items-center gap-2 font-medium cursor-pointer relative whitespace-nowrap select-none transition-colors duration-200",
                    sizeClasses(),
                    variantClasses(),
                    fullWidth && "w-full",
                    (disabled || loading) && "opacity-60 cursor-not-allowed",
                    (disabled || loading) && classNames?.disabled,
                    classNames?.root,
                    className
                )}
                style={{
                    backgroundColor: color,
                    ...getRadius(radius),
                    ...style
                }}
                disabled={disabled || loading}
                ref={ref}
                href={href}
                target={target}
                {...props}
            >
                {renderSection(
                    loading && loadingPosition === "left"
                        ? renderLoader()
                        : leftSection,
                    "left"
                )}
                <div className={cn("flex-1 flex items-center", getAlign())}>
                    {children}
                </div>
                {renderSection(
                    loading && loadingPosition === "right"
                        ? renderLoader()
                        : rightSection,
                    "right"
                )}
            </Element>
        );
    }
);

Button.displayName = "@luminx/core/Button";
