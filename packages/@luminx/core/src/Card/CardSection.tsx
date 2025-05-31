import { forwardRef } from "react";
import { CardSectionProps } from "./types";
import { useTheme } from "../_theme";

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
    ({ children, withDivider, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        const getDivider = () => {
            if (!withDivider) return "";

            switch (theme) {
                case "light":
                    return "border-t border-[var(--luminx-light-border)]";
                default:
                    return "border-t border-[var(--luminx-dark-border)]";
            }
        };

        return (
            <div
                ref={ref}
                className={cx("p-0", getDivider(), className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardSection.displayName = "@luminx/core/Card.Section";
