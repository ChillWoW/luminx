import { forwardRef } from "react";
import { SkeletonProps } from "./types";
import { useTheme } from "../_theme";
import "./Skeleton.css";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            height,
            width,
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
                    "rounded-md",
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
                    width
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
