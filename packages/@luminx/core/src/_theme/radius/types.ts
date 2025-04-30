export type Radius =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full";

export interface GetRadiusProps {
    radius?: Radius;
    defaultRadius?: Radius;
}

export type CornerRadius =
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
    corner: CornerRadius;
}
