import { forwardRef } from "react";
import { CardProps } from "./types";
import { cx, getPadding, getRadius, getShadow } from "../_theme";

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        { children, padding, radius, shadow, withBorder, className, ...props },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cx(
                    "bg-[var(--lumin-background)]",
                    withBorder && "border border-[var(--lumin-border)]",
                    className
                )}
                style={{
                    ...getRadius(radius),
                    ...getPadding(padding),
                    ...getShadow(shadow)
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "@luminx/core/Card";
