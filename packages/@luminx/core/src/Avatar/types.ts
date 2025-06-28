import { ElementType, HTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    withBorder?: boolean;
    component?: ElementType;
    className?: string;
}
