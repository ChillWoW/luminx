import { forwardRef, useEffect, useRef, useState } from "react";
import { Input, InputProps, useTheme } from "@luminx/core";
import { DatePicker } from "../DatePicker";
import { useDatesContext } from "../DatesProvider";
import type { DateValue, DateRangeValue } from "../_shared/types";
import type { DateInputProps } from "./types";
import { Transition } from "@luminx/core";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    Placement,
    size
} from "@floating-ui/react";

export const DateInput = forwardRef<
    HTMLInputElement,
    DateInputProps<DateValue | DateRangeValue>
>(
    (
        {
            format,
            defaultValue = null,
            value,
            onChange,
            placeholder = "Select date",
            label,
            minDate,
            maxDate,
            allowDeselect = true,
            disabled = false,
            error,
            clearable = false,
            type = "default",
            position = "bottom",
            zIndex = 9999,
            offset: offsetProp = 5,
            initialOpened = false,
            onDropdownOpen,
            onDropdownClose,
            withTransition = true,
            transitionProps = {},
            middlewares = {
                shift: true,
                flip: true
            },
            className,
            classNames,
            ...others
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [isOpen, setIsOpen] = useState(initialOpened);
        const [localValue, setLocalValue] = useState<
            DateValue | DateRangeValue
        >(value ?? defaultValue);
        const { formatDate, parseDate } = useDatesContext();

        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        const { x, y, strategy, refs, context } = useFloating({
            placement: position as Placement,
            open: isOpen,
            onOpenChange: (open) => {
                setIsOpen(open);
                if (open) {
                    onDropdownOpen?.();
                } else {
                    onDropdownClose?.();
                }
            },
            middleware: [
                offset(offsetProp),
                ...(middlewares?.flip ? [flip()] : []),
                ...(middlewares?.shift ? [shift({ padding: 8 })] : []),
                size({
                    apply({ rects, elements }) {
                        Object.assign(elements.floating.style, {
                            minWidth: `${Math.max(
                                rects.reference.width,
                                280
                            )}px`
                        });
                    }
                })
            ],
            whileElementsMounted: autoUpdate
        });

        const click = useClick(context, {
            enabled: !disabled
        });

        const dismiss = useDismiss(context);
        const role = useRole(context, { role: "dialog" });

        const { getReferenceProps, getFloatingProps } = useInteractions([
            click,
            dismiss,
            role
        ]);

        const handleInputRef = (element: HTMLInputElement) => {
            inputRef.current = element;
            refs.setReference(element);

            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        const handleContainerRef = (element: HTMLDivElement) => {
            containerRef.current = element;
            refs.setReference(element);
        };

        useEffect(() => {
            if (value !== undefined) {
                setLocalValue(value);
            }
        }, [value]);

        const handleDateChange = (newValue: DateValue | DateRangeValue) => {
            setLocalValue(newValue);
            onChange?.(newValue);
            if (type === "default") {
                setIsOpen(false);
            }
        };

        const handleInputChange = (inputValue: string) => {
            if (!inputValue) {
                const emptyValue =
                    type === "range" ? ([null, null] as DateRangeValue) : null;
                setLocalValue(emptyValue);
                onChange?.(emptyValue);
                return;
            }

            if (type === "default") {
                const dateObj = parseDate(inputValue, format);
                if (dateObj) {
                    setLocalValue(dateObj);
                    onChange?.(dateObj);
                }
            }
        };

        const getDisplayValue = () => {
            if (!localValue) return "";

            if (type === "range" && Array.isArray(localValue)) {
                const [start, end] = localValue;
                if (!start && !end) return "";
                if (start && !end)
                    return start ? formatDate(start, format) : "";
                if (!start && end) return end ? formatDate(end, format) : "";
                return `${start ? formatDate(start, format) : ""} - ${
                    end ? formatDate(end, format) : ""
                }`;
            }

            return localValue ? formatDate(localValue as Date, format) : "";
        };

        const displayValue = getDisplayValue();

        // Helper function to get the date to navigate to
        const getNavigationDate = () => {
            if (!localValue) return undefined;

            if (type === "range" && Array.isArray(localValue)) {
                const [start, end] = localValue;
                // For range, prefer the start date, fall back to end date
                return start || end || undefined;
            }

            return localValue as Date;
        };

        const navigationDate = getNavigationDate();

        const dropdownContent = (
            <div
                className={cx(
                    "border overflow-hidden rounded-md p-2",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                    classNames?.dropdown
                )}
            >
                {type === "range" ? (
                    <DatePicker
                        type="range"
                        value={localValue as DateRangeValue}
                        onChange={
                            handleDateChange as (value: DateRangeValue) => void
                        }
                        date={navigationDate}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                ) : (
                    <DatePicker
                        type="default"
                        value={localValue as DateValue}
                        onChange={
                            handleDateChange as (value: DateValue) => void
                        }
                        date={navigationDate}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                )}
            </div>
        );

        const renderDropdown = () => {
            if (withTransition) {
                return (
                    <Transition
                        mounted={isOpen}
                        transition="fade-down"
                        duration={200}
                        timingFunction="ease-out"
                        {...transitionProps}
                    >
                        {dropdownContent}
                    </Transition>
                );
            }

            return isOpen ? dropdownContent : null;
        };

        const inputProps: Partial<InputProps> = {
            label,
            value: displayValue,
            onChange: handleInputChange,
            placeholder,
            readOnly: true,
            disabled,
            error,
            inputRef: handleInputRef,
            containerRef: handleContainerRef,
            ...getReferenceProps(),
            ...others
        };

        return (
            <div className={cx("relative", classNames?.root, className)}>
                <Input {...inputProps} classNames={classNames} />

                {isOpen && (
                    <div
                        ref={refs.setFloating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            zIndex: zIndex || 9999
                        }}
                        {...getFloatingProps()}
                    >
                        {renderDropdown()}
                    </div>
                )}
            </div>
        );
    }
);

DateInput.displayName = "DateInput";
