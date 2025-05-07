export type Radius =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "full"
    | string
    | number;

export interface GetRadiusProps {
    radius?: Radius;
    defaultRadius?: Radius;
}

export type RadiusCorner =
    | "all"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";

export interface GetCornerRadiusProps {
    radius?: Radius;
    defaultRadius?: Radius;
    corner: RadiusCorner;
}
