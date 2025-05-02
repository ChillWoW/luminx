import { forwardRef } from "react";
import { AlertDescriptionProps } from "./types";
import { cx } from "../_theme";

export const AlertDescription = forwardRef<
    HTMLDivElement,
    AlertDescriptionProps
>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cx("text-sm", className)} {...props}>
            {children}
        </div>
    );
});

AlertDescription.displayName = "Alert.Description";
