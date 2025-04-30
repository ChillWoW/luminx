import React, { forwardRef, useRef, useEffect } from "react";
import { cn } from "../_utils";
import { CheckboxProps } from "./types";
import "../style.css";
import { getRadius } from "../_theme";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            radius = "md",
            fullWidth,
            unstyled = false,
            color,
            iconColor,
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

        const renderIcon = () => {
            if (!Icon) {
                return (
                    <div
                        className={cn(
                            "transition-opacity opacity-0 flex items-center justify-center",
                            (checked || indeterminate) && "opacity-100",
                            classNames?.icon
                        )}
                    >
                        {indeterminate ? (
                            <div
                                className={cn(
                                    "w-2/3 h-0.5 bg-[var(--lumin-text)]",
                                    iconColor && `bg-${iconColor}`
                                )}
                            />
                        ) : (
                            <svg
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3/4 h-3/4"
                            >
                                <path
                                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>
                );
            }

            return (
                <Icon
                    indeterminate={indeterminate}
                    className={cn(
                        "transition-opacity opacity-0",
                        (checked || indeterminate) && "opacity-100",
                        classNames?.icon
                    )}
                />
            );
        };

        return (
            <div
                className={cn(
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
                    className={cn(
                        "relative flex items-center justify-center mr-2",
                        sizeClass(),
                        disabled && "cursor-not-allowed",
                        classNames?.body
                    )}
                >
                    <div
                        className={cn(
                            "flex items-center justify-center absolute top-0 left-0 w-full h-full",
                            !unstyled && [
                                "border border-[var(--lumin-border)] bg-[var(--lumin-background)]",
                                (checked || indeterminate) && [
                                    "bg-[var(--lumin-primary)] border-[var(--lumin-primary)]"
                                ]
                            ],
                            classNames?.inner
                        )}
                        style={{
                            backgroundColor: color,
                            borderColor: color,
                            ...getRadius(radius)
                        }}
                    >
                        {renderIcon()}
                    </div>
                    <input
                        ref={resolvedRef}
                        type="checkbox"
                        className={cn(
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
                        className={cn(
                            "flex flex-col",
                            classNames?.labelWrapper
                        )}
                    >
                        {label && (
                            <label
                                className={cn(
                                    textSizeClass(),
                                    "text-[var(--lumin-text)]",
                                    disabled && "cursor-not-allowed",
                                    classNames?.label
                                )}
                            >
                                {label}
                                {required && (
                                    <span className="text-[var(--lumin-error)] ml-1">
                                        *
                                    </span>
                                )}
                            </label>
                        )}

                        {hint && !error && (
                            <div
                                className={cn(
                                    "text-[var(--lumin-hint)] text-sm",
                                    disabled && "cursor-not-allowed",
                                    classNames?.hint
                                )}
                            >
                                {hint}
                            </div>
                        )}

                        {error && (
                            <div
                                className={cn(
                                    "text-[var(--lumin-error)] text-sm",
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

Checkbox.displayName = "Checkbox";
