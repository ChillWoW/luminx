import React, { forwardRef } from "react";
import { FloatingButtonActionProps } from "./types";
import { useFloatingButtonContext } from "./context";
import { useTheme } from "../_theme";
import { Tooltip } from "../Tooltip";

export const FloatingButtonAction = forwardRef<
    HTMLButtonElement,
    FloatingButtonActionProps
>(
    (
        {
            children,
            icon,
            variant = "filled",
            disabled,
            onClick,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const {
            closeOnActionClick,
            setOpened,
            size,
            disabled: parentDisabled,
            classNames,
            withHover
        } = useFloatingButtonContext();
        const { theme, cx } = useTheme();

        const isDisabled = disabled || parentDisabled;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (isDisabled) return;

            onClick?.(event);

            if (closeOnActionClick) {
                setOpened(false);
            }
        };

        const getSizeClasses = () => {
            const styles = {
                xs: "w-8 h-8 text-xs",
                sm: "w-10 h-10 text-sm",
                md: "w-12 h-12 text-base",
                lg: "w-14 h-14 text-lg",
                xl: "w-16 h-16 text-xl"
            };
            return styles[size] || styles.md;
        };

        const getVariant = () => {
            const isLight = theme === "light";
            const isOutline = variant === "outline";
            const isGhost = variant === "ghost";

            const light = {
                outline:
                    "border border-[var(--luminx-light-border)] text-[var(--luminx-light-text)] hover:border-[var(--luminx-light-border-hover)]",
                solid: "bg-[var(--luminx-light-background)] hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)] shadow-lg",
                ghost: "hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
            };

            const dark = {
                outline:
                    "border border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)] hover:border-[var(--luminx-dark-border-hover)]",
                solid: "bg-[var(--luminx-dark-background)] hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)] shadow-lg",
                ghost: "hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]"
            };

            const palette = isLight ? light : dark;
            return isOutline
                ? palette.outline
                : isGhost
                ? palette.ghost
                : palette.solid;
        };

        const actionButton = (
            <button
                ref={ref}
                className={cx(
                    "inline-flex items-center justify-center rounded-full font-medium cursor-pointer transition-all duration-200 active:scale-95",
                    withHover && "hover:scale-110",
                    getSizeClasses(),
                    getVariant(),
                    isDisabled &&
                        "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
                    classNames?.action,
                    className
                )}
                disabled={isDisabled}
                onClick={handleClick}
                style={style}
                {...props}
            >
                {icon && (
                    <span
                        className={cx(
                            "flex items-center justify-center",
                            classNames?.icon
                        )}
                    >
                        {icon}
                    </span>
                )}
                {!icon && children && (
                    <span
                        className={cx(
                            "flex items-center justify-center",
                            classNames?.label
                        )}
                    >
                        {children}
                    </span>
                )}
            </button>
        );

        if (children) {
            return (
                <Tooltip label={children} position="left">
                    {actionButton}
                </Tooltip>
            );
        }

        return actionButton;
    }
);

FloatingButtonAction.displayName = "@luminx/core/FloatingButton.Action";
