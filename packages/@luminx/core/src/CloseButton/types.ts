import { ButtonHTMLAttributes } from "react";

export type CloseButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CloseButtonVariant = "filled" | "outline" | "ghost";

export interface CloseButtonClassNames {
    root?: string;
    icon?: string;
    disabled?: string;
}

export interface CloseButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "onClick" | "aria-label" | "title"
    > {
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: CloseButtonVariant;
    size?: CloseButtonSize;
    disabled?: boolean;
    title?: string;
    withTooltip?: boolean;
    classNames?: CloseButtonClassNames;
}
