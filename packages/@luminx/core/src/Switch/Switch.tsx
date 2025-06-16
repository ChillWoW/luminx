import React, { forwardRef } from "react";
import { SwitchProps } from "./types";
import { useTheme } from "../_theme";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            fullWidth,
            size = "md",

            label,
            hint,
            error,

            required,
            readOnly,
            disabled,
            checked,
            defaultChecked,

            onChange,

            onLabel,
            offLabel,
            thumbIcon,

            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled && !readOnly && onChange) {
                onChange(event.target.checked);
            }
        };

        const sizeClass = () => {
            const styles = {
                xs: {
                    track: "w-8 h-4",
                    thumb: "w-3 h-3",
                    thumbTranslate: "translate-x-4",
                    trackLabel: "text-[8px]",
                    label: "text-xs"
                },
                sm: {
                    track: "w-9 h-5",
                    thumb: "w-3.5 h-3.5",
                    thumbTranslate: "translate-x-4",
                    trackLabel: "text-[9px]",
                    label: "text-sm"
                },
                md: {
                    track: "w-11 h-6",
                    thumb: "w-5 h-5",
                    thumbTranslate: "translate-x-5",
                    trackLabel: "text-xs",
                    label: "text-base"
                },
                lg: {
                    track: "w-12 h-7",
                    thumb: "w-6 h-6",
                    thumbTranslate: "translate-x-5",
                    trackLabel: "text-sm",
                    label: "text-lg"
                },
                xl: {
                    track: "w-14 h-8",
                    thumb: "w-7 h-7",
                    thumbTranslate: "translate-x-6",
                    trackLabel: "text-base",
                    label: "text-xl"
                }
            };

            return styles[size];
        };

        const currentSize = sizeClass();

        const getCheckedColor = () => {
            if (checked) return "bg-[var(--luminx-primary)]";

            return theme === "light"
                ? "bg-[var(--luminx-light-background)]"
                : "bg-[var(--luminx-dark-background)]";
        };

        return (
            <div
                className={cx(
                    "flex flex-col gap-1",
                    fullWidth && "w-full",
                    className,
                    classNames?.root
                )}
            >
                <div
                    className={cx(
                        "flex items-center gap-2",
                        disabled && "opacity-60 cursor-not-allowed",
                        classNames?.wrapper
                    )}
                >
                    <div
                        className={cx("relative inline-flex", classNames?.body)}
                    >
                        <input
                            ref={ref}
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            defaultChecked={defaultChecked}
                            disabled={disabled}
                            readOnly={readOnly}
                            required={required}
                            onChange={handleChange}
                            {...props}
                        />

                        <div
                            className={cx(
                                "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer",
                                currentSize.track,
                                getCheckedColor(),
                                disabled && "cursor-not-allowed",
                                classNames?.track,
                                checked && classNames?.activeTrack
                            )}
                            onClick={
                                !disabled && !readOnly
                                    ? () => onChange?.(!checked)
                                    : undefined
                            }
                            role="switch"
                            aria-checked={checked}
                        >
                            {(onLabel || offLabel) && (
                                <div
                                    className={cx(
                                        "absolute inset-0 flex items-center justify-center text-white font-medium",
                                        currentSize.trackLabel,
                                        classNames?.trackLabel
                                    )}
                                >
                                    {checked ? onLabel : offLabel}
                                </div>
                            )}

                            <span
                                className={cx(
                                    "absolute rounded-full transition-transform duration-200 ease-in-out bg-[var(--luminx-white)] flex items-center justify-center",
                                    thumbIcon
                                        ? "bg-[var(--luminx-white)] text-[var(--luminx-black)] ring-0"
                                        : "ring-[var(--luminx-white)]",
                                    currentSize.thumb,
                                    "top-[2px] left-[2px]",
                                    checked && currentSize.thumbTranslate,
                                    classNames?.thumb,
                                    checked && classNames?.activeThumb
                                )}
                            >
                                {thumbIcon}
                            </span>
                        </div>
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
                                        currentSize.label,
                                        theme === "light"
                                            ? "text-[var(--luminx-light-text)]"
                                            : "text-[var(--luminx-dark-text)]",
                                        disabled && "cursor-not-allowed",
                                        classNames?.label
                                    )}
                                >
                                    {label}
                                    {required && (
                                        <span
                                            className={cx(
                                                "text-[var(--luminx-error)] ml-1",
                                                classNames?.required
                                            )}
                                            aria-hidden="true"
                                        >
                                            *
                                        </span>
                                    )}
                                </label>
                            )}

                            {hint && !error && (
                                <p
                                    className={cx(
                                        "text-sm",
                                        theme === "light"
                                            ? "text-[var(--luminx-light-hint)]"
                                            : "text-[var(--luminx-dark-hint)]",
                                        classNames?.hint
                                    )}
                                >
                                    {hint}
                                </p>
                            )}

                            {error && (
                                <p
                                    className={cx(
                                        "text-[var(--luminx-error)] text-sm",
                                        classNames?.error
                                    )}
                                >
                                    {error}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Switch.displayName = "@luminx/core/Switch";
