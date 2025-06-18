import { InputClassNames, InputProps } from "../Input";
import { TransitionName, TransitionStyles } from "../Transition";

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
    multiSelectValue?: string;
}

export interface SelectTransitionProps {
    transition?: TransitionName | TransitionStyles;
    duration?: number;
    timingFunction?: string;
    enterDelay?: number;
    exitDelay?: number;
}

export interface SelectMiddleware {
    shift?: boolean;
    flip?: boolean;
    inline?: boolean;
}

export interface SelectProps
    extends Omit<
        InputProps,
        "component" | "type" | "options" | "onChange" | "value"
    > {
    data: SelectData;
    value?: string | string[];
    onChange?: (
        value: string | string[],
        option?: SelectOption | SelectOption[]
    ) => void;
    multiple?: boolean;
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
    position?: "bottom" | "top";
    withTransition?: boolean;
    transitionProps?: SelectTransitionProps;
    offset?: number;
    maxHeight?: number;
    zIndex?: number;
    middlewares?: SelectMiddleware;
    stayOpenOnSelect?: boolean;
    classNames?: SelectClassNames;
}
