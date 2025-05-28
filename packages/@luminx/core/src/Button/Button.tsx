import React, { forwardRef } from "react";
import { ComponentLoader } from "../_utils";
import { ButtonProps } from "./types";
import { getRadius, useTheme } from "../_theme";

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
        const { theme, cx } = useTheme();

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

        const getVariant = () => {
            const isLight = theme === "light";
            const isOutline = variant === "outline";

            const light = {
                outline:
                    "border border-[var(--luminx-light-border)] text-[var(--luminx-light-text)] hover:border-[var(--luminx-light-border-hover)]",
                solid: "bg-[var(--luminx-light-background)] hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]",
                active: {
                    outline: "border-[var(--luminx-light-border-hover)]",
                    solid: "bg-[var(--luminx-light-background-hover)]"
                }
            };

            const dark = {
                outline:
                    "border border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)] hover:border-[var(--luminx-dark-border-hover)]",
                solid: "bg-[var(--luminx-dark-background)] hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                active: {
                    outline: "border-[var(--luminx-dark-border-hover)]",
                    solid: "bg-[var(--luminx-dark-background-hover)]"
                }
            };

            const palette = isLight ? light : dark;
            const base = isOutline ? palette.outline : palette.solid;
            const activeClass = active
                ? isOutline
                    ? palette.active.outline
                    : palette.active.solid
                : "";

            return `${base} ${activeClass}`.trim();
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
                    className={cx(
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
                className={cx(
                    "inline-flex items-center gap-2 font-medium cursor-pointer relative whitespace-nowrap select-none transition-colors duration-200",
                    sizeClasses(),
                    getVariant(),
                    fullWidth && "w-full",
                    (disabled || loading) && "opacity-60 cursor-not-allowed",
                    (disabled || loading) && classNames?.disabled,
                    classNames?.root,
                    className
                )}
                style={{
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
                <div className={cx("flex-1 flex items-center", getAlign())}>
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
