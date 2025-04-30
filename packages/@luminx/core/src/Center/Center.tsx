import { forwardRef } from "react";
import { CenterProps } from "./types";
import { cn } from "../_utils";

export const Center = forwardRef<HTMLDivElement, CenterProps>(
    ({ children, style, className, ...props }, ref) => {
        return (
            <div
                className={cn(
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

Center.displayName = "Center";
