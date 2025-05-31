import React, { ElementType, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: ReactNode;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    withBorder?: boolean;
    component?: ElementType;
    className?: string;
}
