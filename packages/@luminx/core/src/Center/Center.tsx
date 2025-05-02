import { forwardRef } from "react";
import { CenterProps } from "./types";
import { cx } from "../_theme";

export const Center = forwardRef<HTMLDivElement, CenterProps>(
    ({ children, style, className, ...props }, ref) => {
        return (
            <div
                className={cx(
                    "h-full w-full flex items-center justify-center",
                    className
                )}
                style={style}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Center.displayName = "@luminx/core/Center";
