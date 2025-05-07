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

export interface SelectDropdownProps {
    maxHeight?: number;
    zIndex?: number;
    dropdownPadding?: number;
    stayOpenOnSelect?: boolean;
    shadow?: Shadow;
    radius?: Radius;
    checkIcon?: React.ReactNode;
    checkIconPosition?: "start" | "end";
    withCheckIcon?: boolean;
}

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
    extends Omit<InputProps, "component" | "type" | "options"> {
    data: SelectData;
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
    closeIcon?: React.ReactNode;
    dropdownOpened?: boolean;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    onChange?: (value: string, option?: SelectOption) => void;
    dropdownProps?: SelectDropdownProps;
    inputProps?: InputProps;
    classNames?: SelectClassNames;
}
