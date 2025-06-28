import { forwardRef } from "react";
import { CardSectionProps } from "./types";
import { useTheme } from "../_theme";

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
    ({ children, withDivider, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    withDivider && "border-t",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)]"
                        : "border-[var(--luminx-dark-border)]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardSection.displayName = "@luminx/core/Card.Section";
