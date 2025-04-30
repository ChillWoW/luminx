export type LoaderVariant = "spinner" | "dots" | "pulse" | "bars";

export interface LoaderProps {
    variant?: LoaderVariant;
    size?: number;
    color?: string;
    speed?: number;
    stroke?: number;
    strokeLength?: number;
    bgOpacity?: number;
    className?: string;
}
