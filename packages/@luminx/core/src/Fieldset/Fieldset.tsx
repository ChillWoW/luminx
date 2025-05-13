import { forwardRef } from "react";
import { FieldsetProps } from "./types";
import { getRadius, useTheme } from "../_theme";

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
    (
        {
            legend,
            children,
            radius = "md",
            disabled,
            classNames,
            style,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        return (
            <fieldset
                ref={ref}
                className={cx(
                    "border p-4",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)]"
                        : "border-[var(--luminx-dark-border)]",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.root
                )}
                style={{
                    ...getRadius(radius),
                    ...style
                }}
                disabled={disabled}
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
                        {legend}
                    </legend>
                )}
                <div className="space-y-2">{children}</div>
            </fieldset>
        );
    }
);

Fieldset.displayName = "@luminx/core/Fieldset";
