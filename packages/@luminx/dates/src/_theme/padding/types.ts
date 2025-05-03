export type Padding =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl";

export interface GetPaddingProps {
    padding?: Padding;
    defaultPadding?: Padding;
}
