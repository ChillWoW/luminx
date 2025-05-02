import React from "react";
import { SkeletonProps } from "./types";
import { cx, getRadius } from "../_theme";
import "../style.css";
import "./Skeleton.css";

export const Skeleton = ({
    height,
    width,
    radius,
    circle,
    animate = true,
    visible = true,
    className,
    children,
    ...props
}: SkeletonProps) => {
    const circleStyles = circle
        ? {
              width: height,
              height: height,
              borderRadius: "50%"
          }
        : {};

    if (children && !visible) {
        return <>{children}</>;
    }

    return (
        <div
            className={cx(
                visible
                    ? "relative overflow-hidden bg-[var(--lumin-background)]"
                    : "hidden",
                animate && "skeleton-shimmer",
                className
            )}
            style={{
                height,
                width,
                ...getRadius(radius),
                ...circleStyles
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
};

Skeleton.displayName = "@luminx/core/Skeleton";
