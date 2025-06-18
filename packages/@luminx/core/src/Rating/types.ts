import { HTMLAttributes } from "react";

export type RatingSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface RatingProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: number | null;
    defaultValue?: number | null;
    onChange?: (value: number | null) => void;
    onChangeActive?: (value: number) => void;
    max?: number;
    size?: RatingSize;
    readOnly?: boolean;
    disabled?: boolean;
    withHover?: boolean;
    highlightSelectedOnly?: boolean;
    icon?: React.ReactNode;
    emptyIcon?: React.ReactNode;
    getLabelText?: (value: number) => string;
    name?: string;
    classNames?: RatingClassNames;
    className?: string;
}

export interface RatingClassNames {
    root?: string;
    item?: string;
    itemFilled?: string;
    itemEmpty?: string;
    itemHover?: string;
    itemActive?: string;
    itemDisabled?: string;
    icon?: string;
    input?: string;
}
