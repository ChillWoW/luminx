import { forwardRef } from "react";
import { GroupProps } from "./types";
import { cx } from "../_theme";

export const Group = forwardRef<HTMLDivElement, GroupProps>(
    (
        {
            children,
            align = "center",
            gap = "sm",
            grow,
            justify = "flex-start",
            preventOverflow,
            wrap,
            className,
            ...props
        },
        ref
    ) => {
        const getGapClass = () => {
            if (gap === undefined) return "";
            if (typeof gap === "number") return `gap-[${gap}px]`;

            const gapMap: Record<string, string> = {
                none: "gap-0",
                xs: "gap-1",
                sm: "gap-2",
                md: "gap-4",
                lg: "gap-6",
                xl: "gap-8"
            };

            return gapMap[gap] || `gap-[${gap}]`;
        };

        const alignMap: Record<string, string> = {
            start: "items-start",
            center: "items-center",
            end: "items-end"
        };

        const justifyMap: Record<string, string> = {
            "flex-start": "justify-start",
            center: "justify-center",
            "space-between": "justify-between",
            "flex-end": "justify-end"
        };

        const wrapMap: Record<string, string> = {
            wrap: "flex-wrap",
            nowrap: "flex-nowrap",
            "wrap-reverse": "flex-wrap-reverse"
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "flex",
                    alignMap[align],
                    getGapClass(),
                    grow && "[&>*]:flex-1",
                    justifyMap[justify],
                    preventOverflow && "overflow-hidden",
                    wrap && wrapMap[wrap],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Group.displayName = "Group";
