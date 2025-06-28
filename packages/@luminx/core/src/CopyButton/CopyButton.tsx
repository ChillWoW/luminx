import React, { forwardRef, useState } from "react";
import { CopyButtonProps } from "./types";
import { useTheme } from "../_theme";
import { Tooltip } from "../Tooltip";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
    (
        {
            content,
            copyText = "Copy",
            copiedText = "Copied!",
            copiedDuration = 2000,
            icon,
            copiedIcon,
            variant = "ghost",
            size = "sm",
            disabled,
            withTooltip = true,
            className,
            classNames,
            onCopy,
            onCopyError,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(content);
                setCopied(true);
                onCopy?.(content);

                setTimeout(() => setCopied(false), copiedDuration);
            } catch (error) {
                onCopyError?.(error as Error);
            }
        };

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

        const getIconSize = () => {
            const sizes = {
                xs: 14,
                sm: 16,
                md: 18,
                lg: 20,
                xl: 22
            };
            return sizes[size] || sizes.sm;
        };

        const renderIcon = () => {
            const iconSize = getIconSize();

            if (copied) {
                return copiedIcon || <IconCopyCheck size={iconSize} />;
            }

            return icon || <IconCopy size={iconSize} />;
        };

        const button = (
            <button
                ref={ref}
                type="button"
                onClick={handleCopy}
                disabled={disabled}
                className={cx(
                    "inline-flex items-center justify-center rounded-md cursor-pointer transition-all duration-150 select-none active:translate-y-0.5",
                    sizeClasses(),
                    getVariant(),
                    disabled && "opacity-60 cursor-not-allowed",
                    disabled && classNames?.disabled,
                    classNames?.root,
                    className
                )}
                aria-label={copied ? copiedText : copyText}
                {...props}
            >
                <span className={cx("flex items-center", classNames?.icon)}>
                    {renderIcon()}
                </span>
            </button>
        );

        if (!withTooltip) {
            return button;
        }

        return (
            <Tooltip label={copied ? copiedText : copyText}>{button}</Tooltip>
        );
    }
);

CopyButton.displayName = "@luminx/core/CopyButton";

export { CopyButton };
