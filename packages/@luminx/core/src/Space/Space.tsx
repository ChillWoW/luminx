import { forwardRef } from "react";
import { Size, SpaceProps } from "./types";

const getSizeValue = (size: Size | undefined) => {
    if (size === undefined) return 0;
    if (typeof size === "number") return `${size}px`;

    const sizeMap: Record<string, string> = {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem"
    };

    return sizeMap[size as string] || size;
};

export const Space = forwardRef<HTMLDivElement, SpaceProps>(
    ({ h, w, ...others }, ref) => {
        const height = h !== undefined ? { height: getSizeValue(h) } : {};
        const width = w !== undefined ? { width: getSizeValue(w) } : {};

        return (
            <div
                ref={ref}
                style={{ ...height, ...width, flexShrink: 0 }}
                {...others}
            />
        );
    }
);

Space.displayName = "@luminx/core/Space";
