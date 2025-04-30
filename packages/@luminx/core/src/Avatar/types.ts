import React, { ElementType, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type AvatarShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: ReactNode;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    radius?: AvatarRadius;
    shadow?: AvatarShadow;
    withBorder?: boolean;
    component?: ElementType;
    className?: string;
}
