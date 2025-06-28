export type ScrollAreaScrollbars = "x" | "y" | "xy" | "never";

export interface ScrollAreaClassNames {
    root?: string;
    viewport?: string;
}

export interface ScrollAreaProps {
    children: React.ReactNode;
    className?: string;
    classNames?: ScrollAreaClassNames;
    scrollbars?: ScrollAreaScrollbars;
    viewportRef?: React.RefObject<HTMLDivElement>;
}
