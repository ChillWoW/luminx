import { Radius, Shadow } from "../_theme";
import { InputProps } from "../Input";

export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
}

export interface OptionGroup {
    group: string;
    items: (Option | string)[];
}

export type SelectData = (string | Option | OptionGroup)[];

export interface SelectProps
    extends Omit<InputProps, "component" | "type" | "options"> {
    data: SelectData;
    searchable?: boolean;
    clearable?: boolean;
    allowDeselect?: boolean;
    nothingFound?: string | React.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filter?: (params: { options: Option[]; search: string }) => Option[];
    dropdownOpened?: boolean;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    onChange?: (value: string, option?: Option) => void;
    comboboxProps?: {
        position?: "bottom" | "top" | "flip";
        middlewares?: { flip?: boolean; shift?: boolean };
        offset?: number;
        transitionProps?: { transition: string; duration: number };
        dropdownPadding?: number;
        dropdownStayOpen?: boolean;
        shadow?: Shadow;
        radius?: Radius;
        checkIcon?: React.ReactNode;
        checkIconPosition?: "start" | "end";
        withCheckIcon?: boolean;
    };
    classNames?: InputProps["classNames"] & {
        dropdown?: string;
        dropdownGroup?: string;
        dropdownOption?: string;
        dropdownOptionSelected?: string;
        nothingFound?: string;
        clearIcon?: string;
        chevronIcon?: string;
        scrollbar?: string;
    };
}
