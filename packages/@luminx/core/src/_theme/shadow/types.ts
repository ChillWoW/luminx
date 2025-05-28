export type Shadow =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | string
    | number;

export interface GetShadowProps {
    shadow?: Shadow;
    defaultShadow?: Shadow;
}
