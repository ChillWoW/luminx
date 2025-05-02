import React from "react";
import { PillProps } from "./types";
import { PillGroup } from "./PillGroup";
import { XIcon } from "../_icons";
import { cx, getRadius, getShadow } from "../_theme";
import "../style.css";

export const Pill = ({
    size = "md",
    withRemoveButton = false,
    disabled = false,
    radius = "full",
    shadow,
    onRemove,
    classNames,
    className,
    children,
    ...props
}: PillProps) => {
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
                "flex items-center bg-[var(--lumin-background)] border border-[var(--lumin-border)] w-fit",
                sizeStyles[size],
                disabled && "opacity-60 cursor-not-allowed",
                classNames?.root,
                className
            )}
            style={{
                ...getRadius(radius),
                ...getShadow(shadow)
            }}
            {...props}
        >
            <span className={cx("text-[var(--lumin-text)]", classNames?.label)}>
                {children}
            </span>

            {withRemoveButton && (
                <button
                    type="button"
                    onClick={handleRemove}
                    disabled={disabled}
                    className={cx(
                        "ml-1 flex items-center justify-center text-[var(--lumin-hint)] hover:text-[var(--lumin-text)] transition-colors",
                        "h-4 w-4",
                        classNames?.remove
                    )}
                    aria-label="Remove"
                >
                    <XIcon size={10} />
                </button>
            )}
        </div>
    );
};

Pill.Group = PillGroup;
Pill.displayName = "@luminx/core/Pill";
