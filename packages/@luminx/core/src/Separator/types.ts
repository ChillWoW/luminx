export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorVariant = "solid" | "dashed" | "dotted";
export type SeparatorLabelPosition = "left" | "center" | "right";

export interface SeparatorProps {
    orientation?: SeparatorOrientation;
    variant?: SeparatorVariant;
    label?: string;
    labelPosition?: SeparatorLabelPosition;
    className?: string;
}
