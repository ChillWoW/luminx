import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../Input";
import { SelectOption, SelectOptionGroup, SelectProps } from "./types";
import { useTheme } from "../_theme";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { Transition } from "../Transition";
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
    size,
    inline
} from "@floating-ui/react";

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    (
        {
            data = [],
            value,
            onChange,
            multiple = false,

            placeholder,
            fullWidth,

            position = "bottom",
            maxHeight = 250,
            zIndex = 9999,
            stayOpenOnSelect = false,
            offset: offsetProp = 5,

            searchable = false,
            clearable = false,
            allowDeselect = true,
            disabled,
            readOnly,

            searchValue,
            onSearchChange,
            filter,
            noResults = "No results found",

            dropdownIcon,
            clearIcon,
            checkIcon,
            checkIconPosition = "start",
            withCheckIcon = true,

            initialOpened = false,
            onDropdownOpen,
            onDropdownClose,

            withTransition = true,
            transitionProps = {},

            middlewares = {
                shift: true,
                flip: true,
                inline: false
            },

            classNames,

            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [isOpen, setIsOpen] = useState(initialOpened);
        const [selectedValue, setSelectedValue] = useState<string | string[]>(
            multiple
                ? Array.isArray(value)
                    ? value
                    : value
                    ? [value]
                    : []
                : (Array.isArray(value) ? value[0] : value) || ""
        );
        const [search, setSearch] = useState(searchValue || "");

        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        const { x, y, strategy, refs, middlewareData, context } = useFloating({
            placement: position as Placement,
            open: isOpen,
            onOpenChange: setIsOpen,
            middleware: [
                offset(offsetProp),
                ...(middlewares?.flip ? [flip()] : []),
                ...(middlewares?.shift ? [shift({ padding: 8 })] : []),
                ...(middlewares?.inline ? [inline()] : []),
                size({
                    apply({ rects, elements }) {
                        Object.assign(elements.floating.style, {
                            minWidth: `${rects.reference.width}px`
                        });
                    }
                })
            ],
            whileElementsMounted: autoUpdate
        });

        const click = useClick(context, {
            enabled: !disabled && !readOnly
        });

        const dismiss = useDismiss(context);
        const role = useRole(context, { role: "listbox" });

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

        const processedData = useMemo(() => {
            if (!data.length) return [];

            const processed: SelectOption[] = [];

            for (const item of data) {
                if (typeof item === "string") {
                    processed.push({ value: item, label: item });
                } else if ("value" in item) {
                    processed.push(item as SelectOption);
                } else if ("group" in item) {
                    const group = item as SelectOptionGroup;
                    group.items.forEach((groupItem) => {
                        if (typeof groupItem === "string") {
                            processed.push({
                                value: groupItem,
                                label: groupItem,
                                group: group.group
                            });
                        } else {
                            processed.push({
                                ...groupItem,
                                group: group.group
                            });
                        }
                    });
                }
            }

            return processed;
        }, [data]);

        const filteredOptions = useMemo(() => {
            if (!search) return processedData;

            if (filter) {
                return filter({ options: processedData, search });
            }

            return processedData.filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase())
            );
        }, [processedData, search, filter]);

        const groupedOptions = useMemo(() => {
            const groups: Record<string, SelectOption[]> = {};
            const noGroup: SelectOption[] = [];

            filteredOptions.forEach((option) => {
                if (option.group) {
                    if (!groups[option.group]) {
                        groups[option.group] = [];
                    }
                    groups[option.group].push(option);
                } else {
                    noGroup.push(option);
                }
            });

            return { groups, noGroup };
        }, [filteredOptions]);

        useEffect(() => {
            if (value !== undefined) {
                if (multiple) {
                    setSelectedValue(
                        Array.isArray(value) ? value : value ? [value] : []
                    );
                } else {
                    setSelectedValue(
                        Array.isArray(value) ? value[0] || "" : value || ""
                    );
                }
            }
        }, [value, multiple]);

        useEffect(() => {
            if (searchValue !== undefined) {
                setSearch(searchValue);
            }
        }, [searchValue]);

        useEffect(() => {
            if (isOpen) {
                onDropdownOpen?.();
                if (searchable) {
                    setTimeout(() => inputRef.current?.focus(), 0);
                }
            } else {
                onDropdownClose?.();
                if (searchable) {
                    setSearch("");
                    if (searchValue === undefined) {
                        onSearchChange?.("");
                    }
                }
            }
        }, [
            isOpen,
            searchable,
            searchValue,
            onDropdownOpen,
            onDropdownClose,
            onSearchChange
        ]);

        const handleOptionClick = (option: SelectOption) => {
            if (multiple) {
                const currentValues = Array.isArray(selectedValue)
                    ? selectedValue
                    : [];
                const newValue = option.value;
                const isSelected = currentValues.includes(newValue);

                let newValues: string[];
                if (isSelected && allowDeselect) {
                    newValues = currentValues.filter((v) => v !== newValue);
                } else if (!isSelected) {
                    newValues = [...currentValues, newValue];
                } else {
                    newValues = currentValues;
                }

                setSelectedValue(newValues);

                const selectedOptions = newValues
                    .map((val) =>
                        processedData.find((opt) => opt.value === val)
                    )
                    .filter(Boolean) as SelectOption[];

                onChange?.(newValues, selectedOptions);

                if (!stayOpenOnSelect && !multiple) {
                    setIsOpen(false);
                }
            } else {
                const newValue = option.value;
                const currentValue = Array.isArray(selectedValue)
                    ? selectedValue[0]
                    : selectedValue;

                if (allowDeselect && currentValue === newValue) {
                    setSelectedValue("");
                    onChange?.("", undefined);
                } else {
                    setSelectedValue(newValue);
                    onChange?.(newValue, option);
                }

                if (!stayOpenOnSelect) {
                    setIsOpen(false);
                }
            }
        };

        const handleInputChange = (value: string) => {
            setSearch(value);

            if (searchValue === undefined) {
                onSearchChange?.(value);
            }

            if (!isOpen) {
                setIsOpen(true);
            }
        };

        const handleClear = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (multiple) {
                setSelectedValue([]);
                onChange?.([], []);
            } else {
                setSelectedValue("");
                onChange?.("", undefined);
            }
        };

        const handleRemoveValue = (
            valueToRemove: string,
            e: React.MouseEvent
        ) => {
            e.stopPropagation();
            if (multiple && Array.isArray(selectedValue)) {
                const newValues = selectedValue.filter(
                    (v) => v !== valueToRemove
                );
                setSelectedValue(newValues);

                const selectedOptions = newValues
                    .map((val) =>
                        processedData.find((opt) => opt.value === val)
                    )
                    .filter(Boolean) as SelectOption[];

                onChange?.(newValues, selectedOptions);
            }
        };

        const handleToggleDropdown = () => {
            if (disabled || readOnly) return;
            setIsOpen(!isOpen);
        };

        const displayValue = useMemo(() => {
            if (searchable && isOpen) {
                return search;
            }

            if (multiple) {
                return ""; // For multiple selection, we'll show pills instead
            }

            const currentValue = Array.isArray(selectedValue)
                ? selectedValue[0]
                : selectedValue;
            if (!currentValue) return "";

            const selectedOption = processedData.find(
                (option) => option.value === currentValue
            );
            return selectedOption ? selectedOption.label : "";
        }, [
            selectedValue,
            processedData,
            searchable,
            isOpen,
            search,
            multiple
        ]);

        const renderMultipleValues = () => {
            if (
                !multiple ||
                !Array.isArray(selectedValue) ||
                selectedValue.length === 0
            ) {
                return null;
            }

            return (
                <div className="flex flex-wrap gap-1 p-1">
                    {selectedValue.map((val) => {
                        const option = processedData.find(
                            (opt) => opt.value === val
                        );
                        if (!option) return null;

                        return (
                            <div
                                key={val}
                                className={cx(
                                    "flex items-center gap-1 px-2 py-1 text-xs rounded",
                                    theme === "light"
                                        ? "bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
                                        : "bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                                    classNames?.multiSelectValue
                                )}
                            >
                                <span>{option.label}</span>
                                <button
                                    type="button"
                                    onClick={(e) => handleRemoveValue(val, e)}
                                    className={cx(
                                        "hover:opacity-70",
                                        theme === "light"
                                            ? "text-[var(--luminx-light-hint)]"
                                            : "text-[var(--luminx-dark-hint)]"
                                    )}
                                >
                                    <IconX size={12} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            );
        };

        const renderOption = (option: SelectOption, index: number) => {
            const isSelected = multiple
                ? Array.isArray(selectedValue) &&
                  selectedValue.includes(option.value)
                : (Array.isArray(selectedValue)
                      ? selectedValue[0]
                      : selectedValue) === option.value;

            const checkMark = () => (
                <div
                    className={cx(
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]"
                    )}
                >
                    {checkIcon || <IconCheck size={18} />}
                </div>
            );

            return (
                <div
                    key={option.value}
                    className={cx(
                        "flex gap-2",
                        "px-3 py-2 text-sm cursor-pointer flex items-center rounded-md",
                        theme === "light"
                            ? "text-[var(--luminx-light-text)] hover:bg-[var(--luminx-light-background-hover)]"
                            : "text-[var(--luminx-dark-text)] hover:bg-[var(--luminx-dark-background-hover)]",
                        "transition-colors duration-150 ease-in-out",
                        isSelected && "font-medium",
                        isSelected &&
                            (theme === "light"
                                ? "bg-[var(--luminx-light-background-hover)]"
                                : "bg-[var(--luminx-dark-background-hover)]"),
                        option.disabled && "opacity-60 cursor-not-allowed",
                        classNames?.dropdownOption,
                        isSelected && classNames?.dropdownOptionSelected
                    )}
                    onClick={() =>
                        !option.disabled && handleOptionClick(option)
                    }
                >
                    {isSelected &&
                        withCheckIcon &&
                        checkIconPosition === "start" &&
                        checkMark()}
                    <span className="flex-1">{option.label}</span>
                    {isSelected &&
                        withCheckIcon &&
                        checkIconPosition === "end" &&
                        checkMark()}
                </div>
            );
        };

        const dropdownContent = (
            <div
                className={cx(
                    "border overflow-y-auto luminx-scrollbar rounded-md",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                    classNames?.dropdown,
                    classNames?.scrollbar
                )}
                style={{
                    maxHeight,
                    padding: 4
                }}
            >
                {filteredOptions.length === 0 ? (
                    noResults && (
                        <div
                            className={cx(
                                "p-2 text-sm text-center",
                                theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]",
                                classNames?.noResults
                            )}
                        >
                            {noResults}
                        </div>
                    )
                ) : (
                    <div className="flex flex-col gap-1">
                        {groupedOptions.noGroup.map((option, index) =>
                            renderOption(option, index)
                        )}

                        {Object.entries(groupedOptions.groups).map(
                            ([groupName, options]) => (
                                <div key={groupName} className="flex flex-col">
                                    <div
                                        className={cx(
                                            "px-2 py-1 text-xs font-semibold",
                                            theme === "light"
                                                ? "text-[var(--luminx-light-hint)]"
                                                : "text-[var(--luminx-dark-hint)]",
                                            classNames?.dropdownGroup
                                        )}
                                    >
                                        {groupName}
                                    </div>
                                    {options.map((option, index) =>
                                        renderOption(option, index)
                                    )}
                                </div>
                            )
                        )}
                    </div>
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

        const hasSelectedValues = multiple
            ? Array.isArray(selectedValue) && selectedValue.length > 0
            : selectedValue && selectedValue !== "";

        return (
            <div className={cx("relative", fullWidth && "w-full")}>
                <Input
                    inputRef={handleInputRef}
                    containerRef={handleContainerRef}
                    value={displayValue}
                    placeholder={placeholder}
                    readOnly={!searchable || readOnly}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    onChange={searchable ? handleInputChange : undefined}
                    leftSection={multiple ? renderMultipleValues() : undefined}
                    rightSection={
                        <div className="flex items-center">
                            {clearable && hasSelectedValues && (
                                <button
                                    type="button"
                                    className={cx(
                                        "p-1",
                                        theme === "light"
                                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]",
                                        classNames?.clearIcon
                                    )}
                                    onClick={handleClear}
                                    aria-label="Clear"
                                >
                                    {clearIcon || <IconX size={18} />}
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleToggleDropdown}
                                className="p-1"
                                aria-label={
                                    isOpen ? "Close dropdown" : "Open dropdown"
                                }
                            >
                                {dropdownIcon || (
                                    <IconChevronDown
                                        size={18}
                                        className={cx(
                                            "transform duration-150 ease-in-out",
                                            isOpen && "rotate-180",
                                            classNames?.chevronIcon
                                        )}
                                    />
                                )}
                            </button>
                        </div>
                    }
                    classNames={classNames}
                    {...getReferenceProps()}
                    {...props}
                />

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

Select.displayName = "Select";
