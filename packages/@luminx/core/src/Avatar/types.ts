import React, { ElementType, ReactNode } from "react";
import { Radius, Shadow } from "../_theme";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: ReactNode;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    radius?: Radius;
    shadow?: Shadow;
    withBorder?: boolean;
    component?: ElementType;
    className?: string;
}
