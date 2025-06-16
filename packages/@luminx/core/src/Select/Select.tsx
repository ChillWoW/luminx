import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../Input";
import { SelectOption, SelectOptionGroup, SelectProps } from "./types";
import { getRadius, getShadow, useTheme } from "../_theme";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    (
        {
            data = [],
            value,
            onChange,

            placeholder,
            fullWidth,

            placement = "bottom",
            maxHeight = 250,
            zIndex = 9999,
            stayOpenOnSelect = false,

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

            classNames,

            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [isOpen, setIsOpen] = useState(initialOpened);
        const [selectedValue, setSelectedValue] = useState<string | null>(
            (value as string) || null
        );
        const [search, setSearch] = useState(searchValue || "");

        const containerRef = useRef<HTMLDivElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const handleInputRef = (element: HTMLInputElement) => {
            inputRef.current = element;

            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
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
            if (!isOpen) return;

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node) &&
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    closeDropdown();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);

        useEffect(() => {
            if (value !== undefined) {
                setSelectedValue(value as string);
            }
        }, [value]);

        useEffect(() => {
            if (searchValue !== undefined) {
                setSearch(searchValue);
            }
        }, [searchValue]);

        const openDropdown = () => {
            if (disabled || readOnly) return;

            setIsOpen(true);
            onDropdownOpen?.();

            if (searchable) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        };

        const closeDropdown = () => {
            setIsOpen(false);
            onDropdownClose?.();

            if (searchable) {
                setSearch("");
                if (searchValue === undefined) {
                    onSearchChange?.("");
                }
            }
        };

        const toggleDropdown = () => {
            isOpen ? closeDropdown() : openDropdown();
        };

        const handleOptionClick = (option: SelectOption) => {
            const newValue = option.value;

            if (allowDeselect && selectedValue === newValue) {
                setSelectedValue(null);
                onChange?.("", undefined);
            } else {
                setSelectedValue(newValue);
                onChange?.(newValue, option);
            }

            if (!stayOpenOnSelect) {
                closeDropdown();
            }
        };

        const handleInputChange = (value: string) => {
            setSearch(value);

            if (searchValue === undefined) {
                onSearchChange?.(value);
            }

            if (!isOpen) {
                openDropdown();
            }
        };

        const handleClear = (e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedValue(null);
            onChange?.("", undefined);
        };

        const displayValue = useMemo(() => {
            if (searchable && isOpen) {
                return search;
            }

            if (!selectedValue) return "";

            const selectedOption = processedData.find(
                (option) => option.value === selectedValue
            );
            return selectedOption ? selectedOption.label : "";
        }, [selectedValue, processedData, searchable, isOpen, search]);

        const renderOption = (option: SelectOption, index: number) => {
            const isSelected = option.value === selectedValue;

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

        const renderDropdown = () => {
            if (!isOpen) return null;

            return (
                <div
                    ref={dropdownRef}
                    className={cx(
                        "absolute w-full border overflow-y-auto luminx-scrollbar rounded-md",
                        theme === "light"
                            ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                            : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                        placement === "top"
                            ? "bottom-full mb-1"
                            : "top-full mt-1",
                        "transition-opacity duration-100",
                        classNames?.dropdown,
                        classNames?.scrollbar
                    )}
                    style={{
                        maxHeight,
                        padding: 4,
                        zIndex: zIndex || 9999
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
                                    <div
                                        key={groupName}
                                        className="flex flex-col"
                                    >
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
        };

        return (
            <div
                className={cx("relative", fullWidth && "w-full")}
                ref={containerRef}
            >
                <Input
                    inputRef={handleInputRef}
                    value={displayValue}
                    placeholder={placeholder}
                    readOnly={!searchable || readOnly}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    onClick={toggleDropdown}
                    onChange={searchable ? handleInputChange : undefined}
                    rightSection={
                        <div className="flex items-center">
                            {clearable && selectedValue && (
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
                            {dropdownIcon || (
                                <IconChevronDown
                                    size={18}
                                    className={cx(
                                        "transform duration-150 ease-in-out",
                                        isOpen && "rotate-180",
                                        classNames?.chevronIcon
                                    )}
                                    onClick={toggleDropdown}
                                />
                            )}
                        </div>
                    }
                    classNames={classNames}
                    {...props}
                />
                {renderDropdown()}
            </div>
        );
    }
);

Select.displayName = "Select";
