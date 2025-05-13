import { InputClassNames, InputProps } from "../Input/types";

export interface PasswordInputProps extends InputProps {
    visible?: boolean;
    onVisibilityChange?: (visible: boolean) => void;
    visibilityToggle?: boolean;
    visibilityToggleIcon?: (visible: boolean) => React.ReactNode;
    classNames?: PasswordInputClassNames;
}

export interface PasswordInputClassNames extends InputClassNames {
    visibilityToggle?: string;
}
