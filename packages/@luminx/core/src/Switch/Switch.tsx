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
            withAsterisk,

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
                    thumb: "w-4 h-4",
                    thumbTranslate: "translate-x-4",
                    trackLabel: "text-[9px]",
                    label: "text-xs"
                },
                md: {
                    track: "w-11 h-6",
                    thumb: "w-5 h-5",
                    thumbTranslate: "translate-x-5",
                    trackLabel: "text-xs",
                    label: "text-sm"
                },
                lg: {
                    track: "w-12 h-7",
                    thumb: "w-6 h-6",
                    thumbTranslate: "translate-x-5",
                    trackLabel: "text-sm",
                    label: "text-base"
                },
                xl: {
                    track: "w-14 h-8",
                    thumb: "w-7 h-7",
                    thumbTranslate: "translate-x-6",
                    trackLabel: "text-base",
                    label: "text-lg"
                }
            };

            return styles[size];
        };

        const currentSize = sizeClass();

        const getSwitchStyles = () => {
            const baseStyles = [
                "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer border",
                !disabled && "hover:border-[var(--luminx-primary-hover)]"
            ];

            const themeStyles =
                theme === "light"
                    ? [
                          "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]",
                          !disabled &&
                              "hover:bg-[var(--luminx-light-background-hover)]"
                      ]
                    : [
                          "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                          !disabled &&
                              "hover:bg-[var(--luminx-dark-background-hover)]"
                      ];

            const checkedStyles = checked
                ? [
                      "bg-[var(--luminx-primary)] border-[var(--luminx-primary)]",
                      !disabled &&
                          "hover:bg-[var(--luminx-primary-hover)] hover:border-[var(--luminx-primary-hover)]"
                  ]
                : [];

            const disabledStyles = disabled
                ? ["opacity-60 cursor-not-allowed"]
                : [];

            return cx([
                ...baseStyles,
                ...themeStyles,
                ...checkedStyles,
                ...disabledStyles
            ]);
        };

        const renderLabel = () => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        "cursor-pointer select-none",
                        currentSize.label,
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]",
                        disabled && "cursor-not-allowed",
                        classNames?.label
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        if (disabled || readOnly) return;

                        onChange?.(!checked);
                    }}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--luminx-error)] ml-1">
                            *
                        </span>
                    )}
                </label>
            );
        };

        const renderHint = () => {
            if (!hint || error) return null;

            return (
                <div
                    className={cx(
                        "text-xs mt-1",
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)]"
                            : "text-[var(--luminx-dark-hint)]",
                        disabled && "opacity-60",
                        classNames?.hint
                    )}
                >
                    {hint}
                </div>
            );
        };

        const renderError = () => {
            if (!error) return null;

            return (
                <div
                    className={cx(
                        "text-xs text-[var(--luminx-error)] mt-1",
                        classNames?.error
                    )}
                >
                    {error}
                </div>
            );
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
                                currentSize.track,
                                getSwitchStyles(),
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
                                    "top-[1px] left-[1px]",
                                    checked && currentSize.thumbTranslate,
                                    classNames?.thumb,
                                    checked && classNames?.activeThumb
                                )}
                            >
                                {thumbIcon}
                            </span>
                        </div>
                    </div>

                    {renderLabel()}
                </div>

                {renderHint()}
                {renderError()}
            </div>
        );
    }
);

Switch.displayName = "@luminx/core/Switch";
