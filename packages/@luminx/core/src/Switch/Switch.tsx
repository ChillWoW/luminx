import React, { forwardRef } from "react";
import { SwitchProps } from "./types";
import { cx } from "../_theme";
import "../style.css";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            fullWidth,
            color,
            thumbColor,
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
                                checked
                                    ? "bg-[var(--lumin-primary)]"
                                    : "bg-[var(--lumin-background)]",
                                disabled && "cursor-not-allowed",
                                classNames?.track,
                                checked && classNames?.activeTrack
                            )}
                            style={{
                                backgroundColor: color
                            }}
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
                                    "absolute rounded-full bg-white transition-transform duration-200 ease-in-out",
                                    currentSize.thumb,
                                    "top-[2px] left-[2px]",
                                    checked && currentSize.thumbTranslate,
                                    classNames?.thumb,
                                    checked && classNames?.activeThumb,
                                    "flex items-center justify-center"
                                )}
                                style={{
                                    backgroundColor: thumbColor
                                }}
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
                                        "text-[var(--lumin-text)]",
                                        disabled && "cursor-not-allowed",
                                        classNames?.label
                                    )}
                                >
                                    {label}
                                    {required && (
                                        <span
                                            className={cx(
                                                "text-[var(--lumin-error)] ml-1",
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
                                        "text-[var(--lumin-hint)] text-sm",
                                        classNames?.hint
                                    )}
                                >
                                    {hint}
                                </p>
                            )}

                            {error && (
                                <p
                                    className={cx(
                                        "text-[var(--lumin-error)] text-sm",
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
