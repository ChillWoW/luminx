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
    height?: number | string;
    width?: number | string;
    viewportRef?: React.RefObject<HTMLDivElement>;
}

export interface ScrollAreaAutosizeProps
    extends Omit<ScrollAreaProps, "height" | "width"> {
    height?: number | string;
    width?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
}
