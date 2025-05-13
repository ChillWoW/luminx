import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../Input";
import { SelectOption, SelectOptionGroup, SelectProps } from "./types";
import { getRadius, getShadow, useTheme } from "../_theme";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    (
        {
            data,

            searchable,
            clearable,
            allowDeselect = true,
            noResults = "No results found",

            searchValue,
            onSearchChange,

            filter,

            dropdownOpened = false,
            onDropdownOpen,
            onDropdownClose,

            onChange,

            dropdownIcon,
            closeIcon,

            dropdownProps,
            classNames,

            inputProps,

            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [isOpen, setIsOpen] = useState(dropdownOpened);
        const [selectedValue, setSelectedValue] = useState<string | null>(
            (props.value as string) || null
        );
        const [search, setSearch] = useState(searchValue || "");

        const dropdownRef = useRef<HTMLDivElement>(null);
        const _inputRef = useRef<HTMLInputElement>(null);

        const inputRefCallback = (element: HTMLInputElement) => {
            _inputRef.current = element;

            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        const dataProcessed = useMemo(() => {
            if (!data) return [];

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

        const optionsFiltered = useMemo(() => {
            if (!search) return dataProcessed;

            if (filter) {
                return filter({ options: dataProcessed, search });
            }

            return dataProcessed.filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase())
            );
        }, [dataProcessed, search, filter]);

        const optionsGrouped = useMemo(() => {
            const groups: Record<string, SelectOption[]> = {};
            const noGroup: SelectOption[] = [];

            optionsFiltered.forEach((option) => {
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
        }, [optionsFiltered]);

        useEffect(() => {
            if (!isOpen) return;

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node) &&
                    _inputRef.current &&
                    !_inputRef.current.contains(event.target as Node)
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
            setIsOpen(dropdownOpened);
        }, [dropdownOpened]);

        useEffect(() => {
            if (searchValue !== undefined) {
                setSearch(searchValue);
            }
        }, [searchValue]);

        useEffect(() => {
            if (props.value !== undefined) {
                setSelectedValue(props.value as string);
            }
        }, [props.value]);

        const openDropdown = () => {
            if (!props.disabled && !props.readOnly) {
                setIsOpen(true);
                onDropdownOpen?.();
                if (searchable) {
                    setTimeout(() => _inputRef.current?.focus(), 0);
                }
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
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        };

        const handleOptionClick = (option: SelectOption) => {
            const { stayOpenOnSelect } = dropdownProps || {};

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

            const selectedOption = dataProcessed.find(
                (option) => option.value === selectedValue
            );
            return selectedOption ? selectedOption.label : "";
        }, [selectedValue, dataProcessed, searchable, isOpen, search]);

        const renderDropdown = () => {
            if (!isOpen) return null;

            const {
                dropdownPadding = 4,
                shadow,
                radius,
                maxHeight = 60,
                zIndex = 50
            } = dropdownProps || {};

            return (
                <div
                    ref={dropdownRef}
                    className={cx(
                        "absolute w-full border overflow-y-auto",
                        theme === "light"
                            ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                            : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                        `z-[${zIndex}]`,
                        `max-h-[${maxHeight}px]`,
                        "top-full mt-3",
                        "transition-opacity duration-100",
                        classNames?.dropdown,
                        classNames?.scrollbar
                    )}
                    style={{
                        padding: dropdownPadding,
                        ...getRadius(radius),
                        ...getShadow(shadow)
                    }}
                >
                    {optionsFiltered.length === 0 ? (
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
                            {optionsGrouped.noGroup.map((option, index) =>
                                renderOption(option, index, dropdownProps)
                            )}

                            {Object.entries(optionsGrouped.groups).map(
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
                                            renderOption(
                                                option,
                                                optionsGrouped.noGroup.length +
                                                    Object.entries(
                                                        optionsGrouped.groups
                                                    ).findIndex(
                                                        ([name]) =>
                                                            name === groupName
                                                    ) +
                                                    index,
                                                dropdownProps
                                            )
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            );
        };

        const renderOption = (
            option: SelectOption,
            index: number,
            dropdownProps: any
        ) => {
            const isSelected = option.value === selectedValue;

            const {
                checkIcon,
                checkIconPosition = "start",
                withCheckIcon = true
            } = dropdownProps || {};

            const checkMark = () => (
                <div
                    className={
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]"
                    }
                >
                    {checkIcon ? checkIcon : <IconCheck size={18} />}
                </div>
            );

            const getSelectedStyle = () => {
                return theme === "light"
                    ? "bg-[var(--luminx-light-background-hover)]"
                    : "bg-[var(--luminx-dark-background-hover)]";
            };

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
                        isSelected && getSelectedStyle(),
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

        return (
            <div className="relative">
                <Input
                    inputRef={inputRefCallback}
                    value={displayValue}
                    readOnly={!searchable || props.readOnly}
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
                                    {closeIcon ? (
                                        closeIcon
                                    ) : (
                                        <IconX size={18} />
                                    )}
                                </button>
                            )}
                            {dropdownIcon ? (
                                dropdownIcon
                            ) : (
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
