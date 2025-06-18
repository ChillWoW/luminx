import { forwardRef } from "react";
import { SeparatorProps } from "./types";
import { useTheme } from "../_theme";

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
    (
        {
            orientation = "horizontal",
            variant = "solid",
            label,
            labelPosition = "center",
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const getBaseStyles = () => {
            const baseColor =
                theme === "light"
                    ? "border-[var(--luminx-light-border)]"
                    : "border-[var(--luminx-dark-border)]";

            if (orientation === "vertical") {
                return cx(
                    "h-full w-px border-l",
                    variant === "dashed" && "border-dashed",
                    variant === "dotted" && "border-dotted",
                    baseColor
                );
            }

            return cx(
                "w-full h-px border-t",
                variant === "dashed" && "border-dashed",
                variant === "dotted" && "border-dotted",
                baseColor
            );
        };

        if (!label) {
            return (
                <div
                    ref={ref}
                    className={cx(getBaseStyles(), className)}
                    role="separator"
                    aria-orientation={orientation}
                    {...props}
                />
            );
        }

        if (orientation === "vertical") {
            return (
                <div
                    ref={ref}
                    className={cx(
                        "flex flex-col items-center h-full",
                        className
                    )}
                    role="separator"
                    aria-orientation={orientation}
                    {...props}
                >
                    {labelPosition !== "left" && (
                        <div
                            className={cx(
                                "flex-1 w-px border-l",
                                variant === "dashed" && "border-dashed",
                                variant === "dotted" && "border-dotted",
                                theme === "light"
                                    ? "border-[var(--luminx-light-border)]"
                                    : "border-[var(--luminx-dark-border)]"
                            )}
                        />
                    )}
                    <span
                        className={cx(
                            "px-2 py-1 text-xs font-medium whitespace-nowrap",
                            theme === "light"
                                ? "text-[var(--luminx-light-hint)]"
                                : "text-[var(--luminx-dark-hint)]"
                        )}
                    >
                        {label}
                    </span>
                    {labelPosition !== "right" && (
                        <div
                            className={cx(
                                "flex-1 w-px border-l",
                                variant === "dashed" && "border-dashed",
                                variant === "dotted" && "border-dotted",
                                theme === "light"
                                    ? "border-[var(--luminx-light-border)]"
                                    : "border-[var(--luminx-dark-border)]"
                            )}
                        />
                    )}
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={cx("flex items-center w-full", className)}
                role="separator"
                aria-orientation={orientation}
                {...props}
            >
                {labelPosition !== "left" && (
                    <div
                        className={cx(
                            "flex-1 h-px border-t",
                            variant === "dashed" && "border-dashed",
                            variant === "dotted" && "border-dotted",
                            theme === "light"
                                ? "border-[var(--luminx-light-border)]"
                                : "border-[var(--luminx-dark-border)]"
                        )}
                    />
                )}
                <span
                    className={cx(
                        "px-3 py-1 text-xs font-medium whitespace-nowrap",
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)]"
                            : "text-[var(--luminx-dark-hint)]"
                    )}
                >
                    {label}
                </span>
                {labelPosition !== "right" && (
                    <div
                        className={cx(
                            "flex-1 h-px border-t",
                            variant === "dashed" && "border-dashed",
                            variant === "dotted" && "border-dotted",
                            theme === "light"
                                ? "border-[var(--luminx-light-border)]"
                                : "border-[var(--luminx-dark-border)]"
                        )}
                    />
                )}
            </div>
        );
    }
);

Separator.displayName = "@luminx/core/Separator";
