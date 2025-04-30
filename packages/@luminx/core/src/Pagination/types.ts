export type PaginationSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface PaginationProps {
    total: number;
    page?: number;
    onChange?: (page: number) => void;
    siblings?: number;
    boundaries?: number;
    disabled?: boolean;
    withControls?: boolean;
    withEdges?: boolean;
    withPages?: boolean;
    size?: PaginationSize;
    label?: string;
    className?: string;
    classNames?: PaginationClassNames;
}

export interface PaginationClassNames {
    root?: string;
    control?: string;
    dots?: string;
    label?: string;
    active?: string;
}
