import { ButtonHTMLAttributes } from "react";

export type CopyButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CopyButtonVariant = "filled" | "outline" | "ghost";

export interface CopyButtonClassNames {
    root?: string;
    icon?: string;
    disabled?: string;
}

export interface CopyButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "onClick" | "onCopy"
    > {
    content: string;
    copyText?: string;
    copiedText?: string;
    copiedDuration?: number;
    icon?: React.ReactNode;
    copiedIcon?: React.ReactNode;
    variant?: CopyButtonVariant;
    size?: CopyButtonSize;
    disabled?: boolean;
    withTooltip?: boolean;
    onCopy?: (content: string) => void;
    onCopyError?: (error: Error) => void;
    classNames?: CopyButtonClassNames;
}
