import React from "react";
import { PillProps } from "./types";
import { PillGroup } from "./PillGroup";
import { getRadius, getShadow, useTheme } from "../_theme";
import { IconX } from "@tabler/icons-react";

export const Pill = ({
    size = "md",
    withRemoveButton = false,
    disabled = false,
    onRemove,
    classNames,
    className,
    children,
    ...props
}: PillProps) => {
    const { theme, cx } = useTheme();

    const sizeStyles = {
        xs: "text-xs px-1.5 py-0.5",
        sm: "text-sm px-2 py-0.5",
        md: "text-base px-2 py-1",
        lg: "text-lg px-2.5 py-1.5",
        xl: "text-xl px-3 py-2"
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(e);
    };

    return (
        <div
            className={cx(
                "flex items-center border w-fit rounded-full",
                theme === "light"
                    ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)] text-[var(--luminx-light-text)]"
                    : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)] text-[var(--luminx-dark-text)]",
                sizeStyles[size],
                disabled && "opacity-60 cursor-not-allowed",
                classNames?.root,
                className
            )}
            style={{}}
            {...props}
        >
            <span className={classNames?.label}>{children}</span>

            {withRemoveButton && (
                <button
                    type="button"
                    onClick={handleRemove}
                    disabled={disabled}
                    className={cx(
                        "ml-1 flex items-center justify-center",
                        classNames?.remove
                    )}
                    aria-label="Remove"
                >
                    <IconX size={16} />
                </button>
            )}
        </div>
    );
};

Pill.Group = PillGroup;
Pill.displayName = "@luminx/core/Pill";
