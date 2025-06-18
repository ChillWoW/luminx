import { HTMLAttributes, ElementType, ReactNode } from "react";

export interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
    color: string;
    component?: ElementType;
    children?: ReactNode;
    backgroundGrid?: boolean;
    className?: string;
    classNames?: ColorSwatchClassNames;
}

export interface ColorSwatchClassNames {
    root?: string;
    colorOverlay?: string;
    shadowOverlay?: string;
    child?: string;
}
