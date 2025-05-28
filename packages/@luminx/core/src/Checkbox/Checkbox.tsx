import React, { forwardRef, useRef, useEffect } from "react";
import { CheckboxProps } from "./types";
import "../style.css";
import { getRadius, getShadow, useTheme } from "../_theme";
import { IconCheck } from "@tabler/icons-react";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            radius,
            shadow,
            fullWidth,
            unstyled = false,
            size = "md",

            label,
            hint,
            error,
            indeterminate = false,

            required,
            readOnly,
            disabled,
            autoFocus,
            checked,
            defaultChecked,

            onChange,

            icon: Icon,

            inputRef,
            style,

            wrapperProps,

            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const localRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref ||
            inputRef ||
            localRef) as React.RefObject<HTMLInputElement>;

        useEffect(() => {
            if (resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, resolvedRef]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;
            onChange?.(e);
        };

        const sizeClass = () => {
            const styles = {
                xs: "w-3 h-3",
                sm: "w-4 h-4",
                md: "w-5 h-5",
                lg: "w-6 h-6",
                xl: "w-7 h-7"
            };

            return styles[size];
        };

        const textSizeClass = () => {
            const styles = {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
                xl: "text-xl"
            };

            return styles[size];
        };

        const getStyles = () => {
            if (unstyled) return;

            return [
                theme === "light"
                    ? "border-[var(--luminx-light-border)] bg-[var(--luminx-light-background)]"
                    : "border-[var(--luminx-dark-border)] bg-[var(--luminx-dark-background)]",
                (checked || indeterminate) &&
                    "bg-[var(--luminx-primary)] border-[var(--luminx-primary)]"
            ];
        };

        const renderIcon = () => {
            if (!Icon) {
                return (
                    <div
                        className={cx(
                            "transition-opacity opacity-0 flex items-center justify-center",
                            (checked || indeterminate) && "opacity-100",
                            classNames?.icon
                        )}
                    >
                        {indeterminate ? (
                            <div className="w-2 h-0.5 bg-[var(--luminx-dark-text)]" />
                        ) : (
                            <IconCheck size={16} />
                        )}
                    </div>
                );
            }

            return (
                <Icon
                    indeterminate={indeterminate}
                    className={cx(
                        "transition-opacity opacity-0",
                        (checked || indeterminate) && "opacity-100",
                        classNames?.icon
                    )}
                />
            );
        };

        return (
            <div
                className={cx(
                    "flex items-center",
                    fullWidth && "w-full",
                    disabled && "opacity-60",
                    className,
                    classNames?.root
                )}
                style={style}
                {...wrapperProps}
            >
                <div
                    className={cx(
                        "relative flex items-center justify-center mr-2",
                        sizeClass(),
                        disabled && "cursor-not-allowed",
                        classNames?.body
                    )}
                >
                    <div
                        className={cx(
                            "flex items-center justify-center absolute top-0 left-0 w-full h-full",
                            getStyles(),
                            classNames?.inner
                        )}
                        style={{
                            ...getRadius(radius),
                            ...getShadow(shadow)
                        }}
                    >
                        {renderIcon()}
                    </div>
                    <input
                        ref={resolvedRef}
                        type="checkbox"
                        className={cx(
                            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                            disabled && "cursor-not-allowed",
                            readOnly && "cursor-default",
                            classNames?.input
                        )}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoFocus={autoFocus}
                        onChange={handleChange}
                        {...props}
                    />
                </div>

                {(label || hint || error) && (
                    <div
                        className={cx(
                            "flex flex-col",
                            classNames?.labelWrapper
                        )}
                    >
                        {label && (
                            <label
                                className={cx(
                                    textSizeClass(),
                                    theme === "light"
                                        ? "text-[var(--luminx-light-text)]"
                                        : "text-[var(--luminx-dark-text)]",
                                    disabled && "cursor-not-allowed",
                                    classNames?.label
                                )}
                            >
                                {label}
                                {required && (
                                    <span className="text-[var(--luminx-error)] ml-1">
                                        *
                                    </span>
                                )}
                            </label>
                        )}

                        {hint && !error && (
                            <div
                                className={cx(
                                    "text-sm",
                                    theme === "light"
                                        ? "text-[var(--luminx-light-hint)]"
                                        : "text-[var(--luminx-dark-hint)]",
                                    disabled && "cursor-not-allowed",
                                    classNames?.hint
                                )}
                            >
                                {hint}
                            </div>
                        )}

                        {error && (
                            <div
                                className={cx(
                                    "text-[var(--luminx-error)] text-sm",
                                    classNames?.error
                                )}
                            >
                                {error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "@luminx/core/Checkbox";
