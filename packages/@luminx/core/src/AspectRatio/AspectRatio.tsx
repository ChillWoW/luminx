import { forwardRef } from "react";
import { AspectRatioProps } from "./types";
import { cx } from "../_theme";

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
    ({ ratio = 16 / 9, children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cx("relative w-full", className)}>
                <div
                    style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
                    className="block w-full"
                />
                <div className="absolute inset-0 w-full h-full">{children}</div>
            </div>
        );
    }
);

AspectRatio.displayName = "@luminx/core/AspectRatio";
