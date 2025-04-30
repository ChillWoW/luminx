import { forwardRef } from "react";
import { CardProps } from "./types";
import { cn } from "../_utils";
import { getPadding, getRadius, getShadow } from "../_theme";

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            padding = "sm",
            radius = "md",
            shadow = "none",
            withBorder,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-[var(--lumin-background)]",
                    withBorder && "border border-[var(--lumin-border)]",
                    className
                )}
                style={{
                    ...getPadding(padding),
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);
