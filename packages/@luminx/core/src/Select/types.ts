import { Radius, Shadow } from "../_theme";
import { InputClassNames, InputProps } from "../Input";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
}

export interface SelectOptionGroup {
    group: string;
    items: (SelectOption | string)[];
}

export type SelectData = (string | SelectOption | SelectOptionGroup)[];

export interface SelectClassNames extends InputClassNames {
    dropdown?: string;
    dropdownGroup?: string;
    dropdownOption?: string;
    dropdownOptionSelected?: string;
    noResults?: string;
    clearIcon?: string;
    chevronIcon?: string;
    scrollbar?: string;
}

export interface SelectProps
    extends Omit<InputProps, "component" | "type" | "options" | "onChange"> {
    data: SelectData;
    value?: string;
    onChange?: (value: string, option?: SelectOption) => void;
    searchable?: boolean;
    clearable?: boolean;
    allowDeselect?: boolean;
    noResults?: string | React.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filter?: (params: {
        options: SelectOption[];
        search: string;
    }) => SelectOption[];
    dropdownIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    checkIcon?: React.ReactNode;
    checkIconPosition?: "start" | "end";
    withCheckIcon?: boolean;
    initialOpened?: boolean;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    placement?: "bottom" | "top";
    maxHeight?: number;
    zIndex?: number;
    stayOpenOnSelect?: boolean;
    classNames?: SelectClassNames;
}
