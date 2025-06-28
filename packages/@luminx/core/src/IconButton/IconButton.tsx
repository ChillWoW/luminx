import { forwardRef } from "react";
import { IconButtonProps } from "./types";
import { useTheme } from "../_theme";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            onClick,
            children,
            variant = "filled",
            size = "sm",
            disabled,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const sizeClasses = () => {
            const styles = {
                xs: "text-xs p-1",
                sm: "text-sm p-1.5",
                md: "text-base p-2",
                lg: "text-lg p-2.5",
                xl: "text-xl p-3"
            };
            return styles[size] || styles.sm;
        };

        const getVariant = () => {
            const isLight = theme === "light";
            const isOutline = variant === "outline";
            const isGhost = variant === "ghost";

            const light = {
                outline:
                    "border border-[var(--luminx-light-border)] text-[var(--luminx-light-text)] hover:border-[var(--luminx-light-border-hover)] hover:bg-[var(--luminx-light-background-hover)]",
                solid: "bg-[var(--luminx-light-background)] hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]",
                ghost: "hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
            };

            const dark = {
                outline:
                    "border border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)] hover:border-[var(--luminx-dark-border-hover)] hover:bg-[var(--luminx-dark-background-hover)]",
                solid: "bg-[var(--luminx-dark-background)] hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                ghost: "hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]"
            };

            const palette = isLight ? light : dark;
            return isOutline
                ? palette.outline
                : isGhost
                ? palette.ghost
                : palette.solid;
        };

        const handleClick = () => {
            if (!disabled) {
                onClick?.();
            }
        };

        const button = (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className={cx(
                    "inline-flex w-fit items-center justify-center rounded-md cursor-pointer transition-all duration-150 select-none active:translate-y-0.5",
                    sizeClasses(),
                    getVariant(),
                    disabled &&
                        "opacity-60 cursor-not-allowed active:translate-y-0",
                    disabled && classNames?.disabled,
                    classNames?.root,
                    className
                )}
                {...props}
            >
                <span className={cx("flex items-center", classNames?.icon)}>
                    {children}
                </span>
            </button>
        );

        return button;
    }
);

IconButton.displayName = "@luminx/core/IconButton";
