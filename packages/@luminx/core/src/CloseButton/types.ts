import { ButtonHTMLAttributes } from "react";
import { TooltipProps } from "../Tooltip";

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
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: React.ReactNode;
    variant?: CloseButtonVariant;
    size?: CloseButtonSize;
    disabled?: boolean;
    title?: string;
    withTooltip?: boolean;
    tooltipProps?: TooltipProps;
    classNames?: CloseButtonClassNames;
}
