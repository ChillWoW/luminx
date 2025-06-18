export type TimelineBorderVariant = "solid" | "dashed" | "dotted";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineAlign = "left" | "right";

export interface TimelineClassNames {
    root?: string;
    item?: string;
    activeBullet?: string;
    line?: string;
    bullet?: string;
    wrapper?: string;
    title?: string;
    description?: string;
    content?: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    active?: number;
    borderVariant?: TimelineBorderVariant;
    size?: TimelineSize;
    align?: TimelineAlign;
    className?: string;
    classNames?: TimelineClassNames;
}

export interface TimelineItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    bullet?: React.ReactNode;
    active?: boolean;
    isLast?: boolean;
    index?: number;
    className?: string;
    children?: React.ReactNode;
}

export interface TimelineContextValue {
    active: number;
    borderVariant: TimelineBorderVariant;
    size: TimelineSize;
    align: TimelineAlign;
    totalItems: number;
    classNames?: TimelineClassNames;
}
