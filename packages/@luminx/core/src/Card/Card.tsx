import { forwardRef } from "react";
import { CardProps } from "./types";
import { getPadding, getRadius, getShadow, useTheme } from "../_theme";

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        { children, padding, radius, shadow, withBorder, className, ...props },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const getBorder = () => {
            if (!withBorder) return "";

            switch (theme) {
                case "light":
                    return "border border-[var(--luminx-light-border)]";
                default:
                    return "border border-[var(--luminx-dark-border)]";
            }
        };

        return (
            <div
                ref={ref}
                className={cx(
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    getBorder(),
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
