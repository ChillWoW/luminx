import React, { useEffect, useRef, useState } from "react";
import { cn } from "../_utils";
import { InputProps } from "./types";
import "../style.css";
import { getShadow } from "../_theme";
import { getRadius } from "../_theme";

export const Input = ({
    // Component type
    component = "input",

    // Appearance
    radius = "md",
    shadow = "sm",
    fullWidth,
    unstyled = false,

    // Content
    label,
    hint,
    error,
    success,
    placeholder,

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
    leftSectionPadding,
    rightSection,
    rightSectionPadding,

    // Handlers
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onEnterPress,

    // Refs and styling
    value: controlledValue,
    inputRef,
    inputWrapperOrder = ["label", "input", "hint", "error", "success"],
    debounce,
    style,

    // Styling classnames
    className,
    classNames,
    ...props
}: InputProps) => {
    const [localValue, setLocalValue] = useState(controlledValue ?? "");
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (controlledValue !== undefined) {
            setLocalValue(controlledValue);
        }
    }, [controlledValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (debounce && onChange) {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                onChange(newValue);
            }, debounce);
        } else if (onChange) {
            onChange(newValue);
        }
    };

    const renderSection = (
        content: React.ReactNode,
        side: "left" | "right"
    ) => {
        if (!content) return null;

        const baseClasses =
            "flex items-center justify-center h-full text-[var(--lumin-section)]";
        const sideClasses =
            side === "left"
                ? leftSectionPadding
                    ? `pl-${leftSectionPadding}`
                    : "pl-2"
                : rightSectionPadding
                ? `pr-${rightSectionPadding}`
                : "pr-2";
        const sectionClasses =
            side === "left"
                ? classNames?.leftSection
                : classNames?.rightSection;

        return (
            <div
                className={cn(
                    baseClasses,
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
                className={cn(
                    "ml-1 flex items-center gap-1",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.label
                )}
            >
                {label}
                {required && (
                    <span
                        className={cn(
                            "text-[var(--lumin-error)]",
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
                className={cn(
                    "ml-1 text-sm text-[var(--lumin-hint)]",
                    classNames?.hint
                )}
            >
                {hint}
            </p>
        );

    const renderError = () =>
        error && (
            <p
                className={cn(
                    "ml-1 text-sm text-[var(--lumin-error)]",
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
                className={cn(
                    "ml-1 text-sm text-[var(--lumin-success)]",
                    classNames?.success
                )}
            >
                {success}
            </p>
        );

    const renderFormControl = () => (
        <div
            className={cn(
                "flex items-center overflow-hidden transition-colors",
                !unstyled && [
                    "bg-[var(--lumin-background)] border border-[var(--lumin-border)]",
                    error && "border-[var(--lumin-error)]",
                    "focus-within:border-[var(--lumin-primary)]",
                    !error && success && "border-[var(--lumin-success)]",
                    disabled && "opacity-60 cursor-not-allowed"
                ],
                fullWidth && "w-full",
                classNames?.container
            )}
            style={{
                ...getRadius(radius),
                ...getShadow(shadow),
                ...style
            }}
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

        const baseStyles = cn(
            !unstyled &&
                "w-full border-none bg-transparent outline-none text-white px-3 py-2 placeholder:[color:var(--lumin-placeholder)] leading-none",
            disabled && "opacity-60 cursor-not-allowed"
        );

        // Handle standard components
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
                        className={cn(
                            baseStyles,
                            "appearance-none bg-[var(--lumin-background)]",
                            classNames?.input
                        )}
                        style={style}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "textarea":
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
                        className={cn(
                            baseStyles,
                            "resize-" + resize,
                            classNames?.input
                        )}
                        style={style}
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
                        className={cn(
                            baseStyles,
                            "[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            classNames?.input
                        )}
                        style={style}
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
            className={cn(
                !unstyled &&
                    "flex flex-col items-start text-[var(--lumin-text)] space-y-1",
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
