import { forwardRef } from "react";
import { AlertTitleProps } from "./types";
import { cx } from "../_theme";

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cx("text-sm font-semibold mb-1", className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AlertTitle.displayName = "Alert.Title";
