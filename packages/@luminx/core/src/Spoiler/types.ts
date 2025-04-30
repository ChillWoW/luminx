import { HTMLAttributes, ReactNode, RefObject } from "react";

export interface SpoilerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    showLabel: string;
    hideLabel: string;
    maxHeight?: number;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    transitionDuration?: number;
    controlRef?: RefObject<HTMLButtonElement>;
    className?: string;
}
