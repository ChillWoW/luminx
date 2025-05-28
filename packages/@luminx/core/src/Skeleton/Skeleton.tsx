import { forwardRef } from "react";
import { SkeletonProps } from "./types";
import { getRadius, getShadow, useTheme } from "../_theme";
import "./Skeleton.css";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            height,
            width,
            radius,
            shadow,
            animate = true,
            visible = true,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        if (children && !visible) {
            return <>{children}</>;
        }

        return (
            <div
                ref={ref}
                className={cx(
                    visible ? "relative overflow-hidden" : "hidden",
                    visible &&
                        (theme === "light"
                            ? "bg-[var(--luminx-light-background)]"
                            : "bg-[var(--luminx-dark-background)]"),
                    animate && "skeleton-shimmer",
                    className
                )}
                data-theme={theme === "light" ? "light" : "dark"}
                style={{
                    height,
                    width,
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                {...props}
            >
                {children && (
                    <div className={visible ? "invisible" : "visible"}>
                        {children}
                    </div>
                )}
            </div>
        );
    }
);

Skeleton.displayName = "@luminx/core/Skeleton";
