import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useTheme } from "../_theme";
import { PinInputProps } from "./types";

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
    (
        {
            length = 4,
            value: controlledValue,
            defaultValue = "",
            type,
            inputMode = "numeric",
            disabled = false,
            readOnly = false,
            placeholder = "○",
            mask = false,
            error,
            hint,
            label,
            withAsterisk = false,
            autoFocus = false,
            onChange,
            onComplete,
            onFocus,
            onBlur,
            classNames,
            className,
            id,
            name,
            required = false,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [values, setValues] = useState<string[]>(() => {
            const initialValue = controlledValue ?? defaultValue;
            return Array.from({ length }, (_, i) => initialValue[i] || "");
        });

        const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
        const isControlled = controlledValue !== undefined;

        useEffect(() => {
            if (isControlled) {
                const newValues = Array.from(
                    { length },
                    (_, i) => controlledValue[i] || ""
                );
                setValues(newValues);
            }
        }, [controlledValue, length, isControlled]);

        useEffect(() => {
            if (autoFocus && inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }, [autoFocus]);

        const validateInput = (value: string) => {
            if (!type) return true;

            let regex: RegExp;

            if (typeof type === "string") {
                let pattern = type;
                if (pattern.startsWith("/") && pattern.endsWith("/")) {
                    pattern = pattern.slice(1, -1);
                }
                regex = new RegExp(pattern);
            } else {
                regex = type;
            }

            return regex.test(value);
        };

        const handleChange = (index: number, newValue: string) => {
            const char = newValue.slice(-1);

            if (char && !validateInput(char)) {
                return;
            }

            const newValues = [...values];
            newValues[index] = char;

            if (!isControlled) {
                setValues(newValues);
            }

            const fullValue = newValues.join("");
            onChange?.(fullValue);

            if (char) {
                const nextIndex = index + 1;
                if (nextIndex < length && inputRefs.current[nextIndex]) {
                    inputRefs.current[nextIndex]?.focus();
                } else if (nextIndex === length) {
                    onComplete?.(fullValue);
                }
            }
        };

        const handleKeyDown = (
            index: number,
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            const { key } = event;

            if (key === "Backspace") {
                event.preventDefault();
                const newValues = [...values];

                if (values[index]) {
                    newValues[index] = "";
                } else if (index > 0) {
                    newValues[index - 1] = "";
                    inputRefs.current[index - 1]?.focus();
                }

                if (!isControlled) {
                    setValues(newValues);
                }
                onChange?.(newValues.join(""));
            } else if (key === "ArrowLeft" && index > 0) {
                event.preventDefault();
                inputRefs.current[index - 1]?.focus();
            } else if (key === "ArrowRight" && index < length - 1) {
                event.preventDefault();
                inputRefs.current[index + 1]?.focus();
            } else if (key === "Delete") {
                event.preventDefault();
                const newValues = [...values];
                newValues[index] = "";

                if (!isControlled) {
                    setValues(newValues);
                }
                onChange?.(newValues.join(""));
            }
        };

        const handlePaste = (event: React.ClipboardEvent) => {
            event.preventDefault();
            const pastedText = event.clipboardData.getData("text");
            const pastedChars = pastedText.slice(0, length).split("");

            const newValues = Array.from({ length }, (_, i) => {
                const char = pastedChars[i] || "";
                return char && validateInput(char) ? char : values[i] || "";
            });

            if (!isControlled) {
                setValues(newValues);
            }

            const fullValue = newValues.join("");
            onChange?.(fullValue);

            const nextEmptyIndex = newValues.findIndex((val) => !val);
            const focusIndex =
                nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
            inputRefs.current[focusIndex]?.focus();

            if (newValues.every((val) => val)) {
                onComplete?.(fullValue);
            }
        };

        const renderLabel = () =>
            label && (
                <label
                    className={cx(
                        "ml-1 flex items-center gap-1 text-sm mb-2",
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]",
                        disabled && "opacity-60 cursor-not-allowed",
                        classNames?.label
                    )}
                    htmlFor={id}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--luminx-error)] text-xs">
                            *
                        </span>
                    )}
                </label>
            );

        const renderError = () =>
            error && (
                <p
                    className={cx(
                        "ml-1 text-sm text-[var(--luminx-error)] mt-1",
                        classNames?.error
                    )}
                >
                    {error}
                </p>
            );

        const renderHint = () =>
            hint &&
            !error && (
                <p
                    className={cx(
                        "ml-1 text-xs mt-1",
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)]"
                            : "text-[var(--luminx-dark-hint)]",
                        classNames?.hint
                    )}
                >
                    {hint}
                </p>
            );

        return (
            <div ref={ref} className={cx("w-fit", className)} {...props}>
                {renderLabel()}

                <div
                    className={cx("flex items-center gap-2", classNames?.root)}
                    onPaste={handlePaste}
                    role="group"
                >
                    {Array.from({ length }, (_, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (el) {
                                    inputRefs.current[index] = el;
                                }
                            }}
                            type={mask ? "password" : "text"}
                            inputMode={inputMode}
                            value={values[index] || ""}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readOnly}
                            required={required && index === 0}
                            name={name && index === 0 ? name : undefined}
                            id={id && index === 0 ? id : undefined}
                            maxLength={1}
                            autoComplete="off"
                            className={cx(
                                "w-10 h-10 text-center text-lg font-medium border rounded-md transition-colors outline-none focus:outline-none focus:ring-0",
                                theme === "light"
                                    ? [
                                          "bg-[var(--luminx-light-background)]",
                                          "border-[var(--luminx-light-border)]",
                                          "text-[var(--luminx-light-text)]",
                                          "placeholder:text-[var(--luminx-light-hint)]",
                                          "focus:border-[var(--luminx-primary)]"
                                      ]
                                    : [
                                          "bg-[var(--luminx-dark-background)]",
                                          "border-[var(--luminx-dark-border)]",
                                          "text-[var(--luminx-dark-text)]",
                                          "placeholder:text-[var(--luminx-dark-hint)]",
                                          "focus:border-[var(--luminx-primary)]"
                                      ],
                                error && "border-[var(--luminx-error)]",
                                disabled && "opacity-60 cursor-not-allowed",
                                readOnly && "cursor-default",
                                classNames?.field
                            )}
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    ))}
                </div>

                {renderHint()}
                {renderError()}
            </div>
        );
    }
);

PinInput.displayName = "@luminx/core/PinInput";
