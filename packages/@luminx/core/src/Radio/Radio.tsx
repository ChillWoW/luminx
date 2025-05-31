import React, { forwardRef, useRef, useContext } from "react";
import { RadioProps } from "./types";
import { useTheme } from "../_theme";
import { RadioGroup, RadioGroupContext } from "./RadioGroup";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            fullWidth,
            unstyled = false,
            size = "md",
            variant = "filled",

            label,
            labelPosition = "right",
            hint,
            error,

            required,
            readOnly,
            disabled,
            autoFocus,
            checked,
            defaultChecked,

            onChange,

            icon,

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
        const groupContext = useContext(RadioGroupContext);

        const localRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref ||
            inputRef ||
            localRef) as React.RefObject<HTMLInputElement>;

        // Use group context values if available
        const resolvedSize = groupContext?.size || size;
        const resolvedVariant = groupContext?.variant || variant;
        const resolvedLabelPosition =
            groupContext?.labelPosition || labelPosition;
        const resolvedDisabled = groupContext?.disabled || disabled;
        const resolvedReadOnly = groupContext?.readOnly || readOnly;
        const resolvedRequired = groupContext?.required || required;
        const resolvedName = groupContext?.name || props.name;
        const resolvedValue = props.value;
        const isChecked = groupContext?.value
            ? groupContext.value === resolvedValue
            : checked;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (resolvedReadOnly || resolvedDisabled) return;

            if (groupContext?.onChange && resolvedValue) {
                groupContext.onChange(resolvedValue as string);
            } else {
                onChange?.(e);
            }
        };

        const sizeClass = () => {
            const styles = {
                xs: "w-3 h-3",
                sm: "w-4 h-4",
                md: "w-5 h-5",
                lg: "w-6 h-6",
                xl: "w-7 h-7"
            };

            return styles[resolvedSize];
        };

        const textSizeClass = () => {
            const styles = {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
                xl: "text-xl"
            };

            return styles[resolvedSize];
        };

        const getStyles = () => {
            if (unstyled) return;

            console.log(resolvedVariant);

            const baseStyles = [
                "rounded-full border-2 transition-all duration-200",
                resolvedVariant === "filled" ? "border-transparent" : ""
            ];

            if (resolvedVariant === "filled") {
                return [
                    ...baseStyles,
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                    isChecked &&
                        "bg-[var(--luminx-primary)] border-[var(--luminx-primary)]"
                ];
            } else {
                return [
                    ...baseStyles,
                    theme === "light"
                        ? "border-[var(--luminx-light-border)] bg-transparent"
                        : "border-[var(--luminx-dark-border)] bg-transparent",
                    isChecked && "border-[var(--luminx-primary)]"
                ];
            }
        };

        const renderIcon = () => {
            if (!icon) {
                return (
                    <div
                        className={cx(
                            "transition-all duration-200 rounded-full",
                            resolvedVariant === "filled"
                                ? "bg-white"
                                : "bg-[var(--luminx-primary)]",
                            isChecked
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0",
                            sizeClass().replace(/w-\d+|h-\d+/g, (match) => {
                                const sizeMap: Record<string, string> = {
                                    "w-3": "w-1.5",
                                    "h-3": "h-1.5",
                                    "w-4": "w-2",
                                    "h-4": "h-2",
                                    "w-5": "w-2.5",
                                    "h-5": "h-2.5",
                                    "w-6": "w-3",
                                    "h-6": "h-3",
                                    "w-7": "w-3.5",
                                    "h-7": "h-3.5"
                                };
                                return sizeMap[match] || match;
                            }),
                            classNames?.icon
                        )}
                    />
                );
            }

            return (
                <div
                    className={cx(
                        "transition-all duration-200",
                        isChecked
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0",
                        classNames?.icon
                    )}
                >
                    {icon}
                </div>
            );
        };

        const renderRadio = () => (
            <div
                className={cx(
                    "relative flex items-center justify-center overflow-hidden",
                    sizeClass(),
                    resolvedDisabled && "cursor-not-allowed",
                    classNames?.body
                )}
            >
                <div
                    className={cx(
                        "flex items-center justify-center absolute top-0 left-0 w-full h-full",
                        getStyles(),
                        classNames?.inner
                    )}
                >
                    {renderIcon()}
                </div>
                <input
                    ref={resolvedRef}
                    type="radio"
                    name={resolvedName}
                    value={resolvedValue}
                    className={cx(
                        "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                        resolvedDisabled && "cursor-not-allowed",
                        resolvedReadOnly && "cursor-default",
                        classNames?.input
                    )}
                    checked={isChecked}
                    defaultChecked={defaultChecked}
                    required={resolvedRequired}
                    disabled={resolvedDisabled}
                    readOnly={resolvedReadOnly}
                    autoFocus={autoFocus}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        );

        const renderLabel = () => {
            if (!label && !hint && !error) return null;

            return (
                <div
                    className={cx(
                        "flex flex-col",
                        resolvedLabelPosition === "left" ? "mr-2" : "ml-2",
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
                                resolvedDisabled && "cursor-not-allowed",
                                classNames?.label
                            )}
                        >
                            {label}
                            {resolvedRequired && (
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
                                resolvedDisabled && "cursor-not-allowed",
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
            );
        };

        return (
            <div
                className={cx(
                    "flex items-center",
                    resolvedLabelPosition === "left" && "flex-row-reverse",
                    fullWidth && "w-full",
                    resolvedDisabled && "opacity-60",
                    className,
                    classNames?.root
                )}
                style={style}
                {...wrapperProps}
            >
                {renderRadio()}
                {renderLabel()}
            </div>
        );
    }
);

const ExtendedRadio = Object.assign(Radio, {
    Group: RadioGroup
});

ExtendedRadio.displayName = "@luminx/core/Radio";

export { ExtendedRadio as Radio };
