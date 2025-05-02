import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Input } from "../Input";
import { cn } from "../_utils";
import { Option, OptionGroup, SelectProps } from "./types";
import { ClearIcon, ChevronIcon } from "./Icons";
import { CheckIcon } from "../_icons";
import { cx, getRadius, getShadow } from "../_theme";
import "../style.css";

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    (
        {
            data = [],

            searchable = false,
            clearable = false,
            allowDeselect = true,
            nothingFound = "No results found",

            searchValue: controlledSearchValue,
            onSearchChange,

            filter,

            dropdownOpened = false,
            onDropdownOpen,
            onDropdownClose,

            onChange,

            comboboxProps,
            classNames,

            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(dropdownOpened);
        const [selectedValue, setSelectedValue] = useState<string | null>(
            (props.value as string) || null
        );
        const [search, setSearch] = useState(controlledSearchValue || "");
        const [highlightedIndex, setHighlightedIndex] = useState(-1);

        const dropdownRef = useRef<HTMLDivElement>(null);
        const innerInputRef = useRef<HTMLInputElement>(null);

        const inputRefCallback = (element: HTMLInputElement) => {
            innerInputRef.current = element;

            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        const processedData = React.useMemo(() => {
            const processed: Option[] = [];

            data.forEach((item) => {
                if (typeof item === "string") {
                    processed.push({ value: item, label: item });
                } else if ("value" in item) {
                    processed.push(item as Option);
                } else if ("group" in item) {
                    const group = item as OptionGroup;
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
            });

            return processed;
        }, [data]);

        const filteredOptions = React.useMemo(() => {
            if (!search) return processedData;

            if (filter) {
                return filter({ options: processedData, search });
            }

            return processedData.filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase())
            );
        }, [processedData, search, filter]);

        const groupedOptions = React.useMemo(() => {
            const groups: Record<string, Option[]> = {};
            const noGroup: Option[] = [];

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
                    innerInputRef.current &&
                    !innerInputRef.current.contains(event.target as Node)
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
            if (controlledSearchValue !== undefined) {
                setSearch(controlledSearchValue);
            }
        }, [controlledSearchValue]);

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
                    setTimeout(() => innerInputRef.current?.focus(), 0);
                }
            }
        };

        const closeDropdown = () => {
            setIsOpen(false);
            onDropdownClose?.();
            if (searchable) {
                setSearch("");
                if (controlledSearchValue === undefined) {
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

        const handleOptionClick = (option: Option) => {
            const { dropdownStayOpen = true } = comboboxProps || {};

            const newValue = option.value;

            if (allowDeselect && selectedValue === newValue) {
                setSelectedValue(null);
                onChange?.("", undefined);
            } else {
                setSelectedValue(newValue);
                onChange?.(newValue, option);
            }

            if (!dropdownStayOpen) {
                closeDropdown();
            }
        };

        const handleInputChange = (value: string) => {
            setSearch(value);
            if (controlledSearchValue === undefined) {
                onSearchChange?.(value);
            }

            if (!isOpen) {
                openDropdown();
            }

            setHighlightedIndex(-1);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Escape") {
                closeDropdown();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!isOpen) {
                    openDropdown();
                } else {
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : 0
                    );
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (isOpen) {
                    setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : filteredOptions.length - 1
                    );
                }
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (isOpen && highlightedIndex >= 0) {
                    handleOptionClick(filteredOptions[highlightedIndex]);
                } else if (!isOpen) {
                    openDropdown();
                }
            }
        };

        const handleClear = (e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedValue(null);
            onChange?.("", undefined);
        };

        const displayValue = React.useMemo(() => {
            if (searchable && isOpen) {
                return search;
            }

            if (!selectedValue) return "";

            const selectedOption = processedData.find(
                (option) => option.value === selectedValue
            );
            return selectedOption ? selectedOption.label : "";
        }, [selectedValue, processedData, searchable, isOpen, search]);

        // Render dropdown
        const renderDropdown = () => {
            if (!isOpen) return null;

            const {
                position = "bottom",
                middlewares,
                offset = 4,
                transitionProps,
                dropdownPadding = 4,
                shadow,
                radius = props.radius || "md"
            } = comboboxProps || {};

            return (
                <div
                    ref={dropdownRef}
                    className={cn(
                        "absolute z-50 w-full bg-[var(--lumin-background)] border border-[var(--lumin-border)]",
                        "max-h-60 overflow-auto",
                        "lumin-scrollbar",
                        position === "top"
                            ? "bottom-full mb-1"
                            : "top-full mt-1",
                        "transition-opacity duration-200",
                        transitionProps?.transition === "pop" &&
                            "transform origin-top transition-transform",
                        classNames?.dropdown,
                        classNames?.scrollbar
                    )}
                    style={{
                        padding: dropdownPadding,
                        ...getRadius(radius),
                        ...getShadow(shadow)
                    }}
                >
                    {filteredOptions.length === 0 ? (
                        nothingFound && (
                            <div
                                className={cn(
                                    "p-2 text-sm text-center text-[var(--lumin-hint)]",
                                    classNames?.nothingFound
                                )}
                            >
                                {nothingFound}
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col gap-1">
                            {groupedOptions.noGroup.map((option, index) =>
                                renderOption(option, index, comboboxProps)
                            )}

                            {Object.entries(groupedOptions.groups).map(
                                ([groupName, options]) => (
                                    <div
                                        key={groupName}
                                        className="flex flex-col"
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-1 text-xs font-semibold text-[var(--lumin-hint)]",
                                                classNames?.dropdownGroup
                                            )}
                                        >
                                            {groupName}
                                        </div>
                                        {options.map((option, index) =>
                                            renderOption(
                                                option,
                                                groupedOptions.noGroup.length +
                                                    Object.entries(
                                                        groupedOptions.groups
                                                    ).findIndex(
                                                        ([name]) =>
                                                            name === groupName
                                                    ) +
                                                    index,
                                                comboboxProps
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
            option: Option,
            index: number,
            comboboxProps: any
        ) => {
            const isSelected = option.value === selectedValue;
            const isHighlighted = index === highlightedIndex;

            const {
                checkIcon,
                checkIconPosition = "start",
                withCheckIcon = true
            } = comboboxProps || {};

            const checkMark = () => (
                <div className="text-[--lumin-text]">
                    {checkIcon ? checkIcon : <CheckIcon size={14} />}
                </div>
            );

            return (
                <div
                    key={option.value}
                    className={cn(
                        "px-3 py-2 text-sm cursor-pointer flex items-center text-[var(--lumin-text)] rounded-md",
                        "transition-colors duration-150 ease-in-out",
                        isSelected &&
                            "bg-[var(--lumin-background-hover)] font-medium",
                        !isSelected &&
                            isHighlighted &&
                            "bg-[var(--lumin-background-hover)]",
                        !isSelected &&
                            !isHighlighted &&
                            "hover:bg-[var(--lumin-background-hover)]",
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
                    {...props}
                    inputRef={inputRefCallback}
                    value={displayValue}
                    readOnly={!searchable || props.readOnly}
                    onClick={toggleDropdown}
                    onChange={searchable ? handleInputChange : undefined}
                    onKeyDown={handleKeyDown}
                    rightSection={
                        props.rightSection || (
                            <div className="flex items-center">
                                {clearable && selectedValue && (
                                    <button
                                        type="button"
                                        className="p-1 text-[var(--lumin-hint)] hover:text-[var(--lumin-text)]"
                                        onClick={handleClear}
                                        aria-label="Clear"
                                    >
                                        <ClearIcon
                                            className={classNames?.clearIcon}
                                        />
                                    </button>
                                )}
                                <ChevronIcon
                                    className={cn(
                                        isOpen && "rotate-180",
                                        classNames?.chevronIcon
                                    )}
                                    onClick={toggleDropdown}
                                />
                            </div>
                        )
                    }
                    classNames={classNames}
                />
                {renderDropdown()}
            </div>
        );
    }
);

Select.displayName = "@luminx/core/Select";
