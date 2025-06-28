import { forwardRef } from "react";
import { FieldsetProps } from "./types";
import { useTheme } from "../_theme";

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
    ({ legend, children, disabled, classNames, style, ...props }, ref) => {
        const { theme, cx } = useTheme();

        return (
            <fieldset
                ref={ref}
                className={cx(
                    "border p-4 rounded-md",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)]"
                        : "border-[var(--luminx-dark-border)]",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.root
                )}
                style={{
                    ...style
                }}
                disabled={disabled}
                aria-disabled={disabled}
                {...props}
            >
                {legend && (
                    <legend
                        className={cx(
                            "px-2 text-sm font-medium",
                            theme === "light"
                                ? "text-[var(--luminx-light-hint)]"
                                : "text-[var(--luminx-dark-hint)]",
                            disabled && "opacity-60",
                            classNames?.legend
                        )}
                    >
                        <span>{legend}</span>
                    </legend>
                )}
                <div className={cx("space-y-2", classNames?.body)}>
                    {children}
                </div>
            </fieldset>
        );
    }
);

Fieldset.displayName = "@luminx/core/Fieldset";
