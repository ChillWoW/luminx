import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { InputProps } from "./types";
import { useTheme } from "../_theme";

export const Input = ({
    // Component type
    component = "input",

    // Appearance
    fullWidth,
    unstyled = false,

    // Content
    label,
    hint,
    error,
    success,
    placeholder,
    withAsterisk,

    // State
    required,
    readOnly,
    disabled,
    autoFocus,

    // Input attributes
    type = "text",
    minLength,
    maxLength,
    pattern,

    // Select/Textarea specific props
    options,
    rows = 3,
    cols,
    resize = "vertical",

    // Custom sections
    leftSection,
    rightSection,

    // Handlers
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onEnterPress,

    // Refs and styling
    value: controlledValue,
    inputRef,
    containerRef,
    inputWrapperOrder = ["label", "input", "hint", "error", "success"],
    debounce,

    // Styling classnames
    className,
    classNames,
    ...props
}: InputProps) => {
    const { theme, cx } = useTheme();

    const [localValue, setLocalValue] = useState(controlledValue ?? "");

    useEffect(() => {
        if (controlledValue !== undefined) {
            setLocalValue(controlledValue);
        }
    }, [controlledValue]);

    useEffect(() => {
        if (!debounce || !onChange) return;

        const timeout = setTimeout(() => {
            onChange(localValue);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [localValue, debounce, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange?.(newValue);
    };

    const renderSection = (
        content: React.ReactNode,
        side: "left" | "right"
    ) => {
        if (!content) return null;

        const baseClasses = "flex items-center justify-center h-full";
        const colorClasses =
            theme === "light"
                ? "text-[var(--luminx-light-section)]"
                : "text-[var(--luminx-dark-section)]";
        const sideClasses = side === "left" ? "pl-2" : "pr-2";
        const sectionClasses =
            side === "left"
                ? classNames?.leftSection
                : classNames?.rightSection;

        return (
            <div
                className={cx(
                    baseClasses,
                    colorClasses,
                    sideClasses,
                    sectionClasses,
                    disabled && "opacity-60 cursor-not-allowed"
                )}
            >
                {content}
            </div>
        );
    };

    const renderLabel = () =>
        label && (
            <label
                className={cx(
                    "ml-1 flex items-center gap-1 text-sm",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)]"
                        : "text-[var(--luminx-dark-text)]",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.label
                )}
            >
                {label}
                {withAsterisk && (
                    <span
                        className={cx(
                            "text-[var(--luminx-error)] text-xs",
                            classNames?.required
                        )}
                    >
                        *
                    </span>
                )}
            </label>
        );

    const renderHint = () =>
        hint &&
        !error &&
        !success && (
            <p
                className={cx(
                    "ml-1 text-xs",
                    theme === "light"
                        ? "text-[var(--luminx-light-hint)]"
                        : "text-[var(--luminx-dark-hint)]",
                    classNames?.hint
                )}
            >
                {hint}
            </p>
        );

    const renderError = () =>
        error && (
            <p
                className={cx(
                    "ml-1 text-sm text-[var(--luminx-error)]",
                    classNames?.error
                )}
            >
                {error}
            </p>
        );

    const renderSuccess = () =>
        success &&
        !error && (
            <p
                className={cx(
                    "ml-1 text-sm text-[var(--luminx-success)]",
                    classNames?.success
                )}
            >
                {success}
            </p>
        );

    const renderFormControl = () => (
        <div
            ref={containerRef}
            className={cx(
                "flex items-center overflow-hidden transition-colors rounded-md",
                !unstyled && [
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] border border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] border border-[var(--luminx-dark-border)]",
                    error && "border-[var(--luminx-error)]",
                    !readOnly && "focus-within:border-[var(--luminx-primary)]",
                    !error && success && "border-[var(--luminx-success)]",
                    disabled && "opacity-60 cursor-not-allowed"
                ],
                fullWidth && "w-full",
                classNames?.container
            )}
        >
            {leftSection && renderSection(leftSection, "left")}

            <div className="flex-1 flex items-center">
                {renderComponentByType()}
            </div>

            {rightSection && renderSection(rightSection, "right")}
        </div>
    );

    const renderComponentByType = () => {
        if (typeof component === "object") {
            return React.cloneElement(component as React.ReactElement, {
                // @ts-ignore
                value:
                    controlledValue !== undefined
                        ? controlledValue
                        : localValue,
                onChange: handleChange,
                ref: inputRef,
                ...props
            });
        }

        const baseStyles = cx(
            !unstyled &&
                "w-full border-none bg-transparent outline-none px-3 py-2 flex items-center justify-center h-full leading-normal",
            !unstyled && theme === "light"
                ? "placeholder:[color:var(--luminx-light-placeholder)] placeholder:text-sm"
                : "placeholder:[color:var(--luminx-dark-placeholder)] placeholder:text-sm",
            disabled && "opacity-60 cursor-not-allowed"
        );

        switch (component) {
            case "select":
                return (
                    <select
                        ref={inputRef as React.Ref<HTMLSelectElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange as any}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (onEnterPress && e.key === "Enter") {
                                onEnterPress(e as any);
                            }
                        }}
                        className={cx(
                            baseStyles,
                            "appearance-none",
                            theme === "light"
                                ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                                : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                            classNames?.input
                        )}
                        required={required}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "textarea":
                const isAutoSize = (props as any).autoSize;

                if (isAutoSize) {
                    return (
                        <TextareaAutosize
                            ref={inputRef as React.Ref<HTMLTextAreaElement>}
                            autoFocus={autoFocus}
                            disabled={disabled}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            aria-invalid={!!error}
                            aria-label={props.ariaLabel}
                            aria-describedby={props.ariaDescribedBy}
                            aria-controls={props.ariaControls}
                            name={props.name}
                            required={required}
                            value={
                                controlledValue !== undefined
                                    ? controlledValue
                                    : localValue
                            }
                            onChange={handleChange as any}
                            onFocus={onFocus as any}
                            onBlur={onBlur as any}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLTextAreaElement>
                            ) => {
                                onKeyDown?.(e as any);
                                if (
                                    onEnterPress &&
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {
                                    e.preventDefault();
                                    onEnterPress(e as any);
                                }
                            }}
                            minRows={(props as any).minRows || rows}
                            maxRows={(props as any).maxRows}
                            className={cx(
                                baseStyles,
                                "resize-none",
                                theme === "light"
                                    ? "text-[var(--luminx-light-text)]"
                                    : "text-[var(--luminx-dark-text)]",
                                classNames?.input
                            )}
                        />
                    );
                }

                return (
                    <textarea
                        ref={inputRef as React.Ref<HTMLTextAreaElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        required={required}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange as any}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (
                                onEnterPress &&
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                onEnterPress(e as any);
                            }
                        }}
                        rows={rows}
                        cols={cols}
                        className={cx(
                            baseStyles,
                            "resize-" + resize,
                            theme === "light"
                                ? "text-[var(--luminx-light-text)]"
                                : "text-[var(--luminx-dark-text)]",
                            classNames?.input
                        )}
                    />
                );

            case "input":
            default:
                return (
                    <input
                        type={type}
                        ref={inputRef as React.Ref<HTMLInputElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        inputMode={props.inputMode}
                        required={required}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (onEnterPress && e.key === "Enter") {
                                onEnterPress(e as any);
                            }
                        }}
                        minLength={minLength}
                        maxLength={maxLength}
                        pattern={pattern}
                        className={cx(
                            baseStyles,
                            "[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm",
                            theme === "light"
                                ? "text-[var(--luminx-light-text)]"
                                : "text-[var(--luminx-dark-text)]",
                            classNames?.input
                        )}
                        {...props}
                    />
                );
        }
    };

    const renderMap = {
        label: renderLabel,
        input: renderFormControl,
        hint: renderHint,
        error: renderError,
        success: renderSuccess
    } as const;

    return (
        <div
            className={cx(
                !unstyled && "flex flex-col items-start space-y-1",
                !unstyled && theme === "light"
                    ? "text-[var(--luminx-light-text)]"
                    : "text-[var(--luminx-dark-text)]",
                fullWidth && "w-full",
                classNames?.wrapper,
                className
            )}
        >
            {inputWrapperOrder.map((key) => (
                <React.Fragment key={key}>
                    {renderMap[key as keyof typeof renderMap]?.()}
                </React.Fragment>
            ))}
        </div>
    );
};
