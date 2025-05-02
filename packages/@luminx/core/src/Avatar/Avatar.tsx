import React, { forwardRef } from "react";
import { AvatarProps } from "./types";
import { cx, getRadius, getShadow } from "../_theme";
import { AvatarGroup } from "./AvatarGroup";
import { IconUserCircle } from "@tabler/icons-react";

const defaultFallback = () => {
    return <IconUserCircle />;
};

const renderContent = ({ children, src, alt }: AvatarProps) => {
    if (src) {
        return <img src={src} alt={alt} />;
    } else if (children) {
        return children;
    } else {
        return defaultFallback();
    }
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            children,
            src,
            alt = "avatar",
            size = "md",
            shadow,
            radius = "full",
            component: Component = "div",
            className,
            ...props
        },
        ref
    ) => {
        const getSize = () => {
            switch (size) {
                case "xs":
                    return "text-xs w-6 h-6";
                case "sm":
                    return "text-sm w-8 h-8";
                case "lg":
                    return "text-lg w-12 h-12";
                case "xl":
                    return "text-xl w-14 h-14";
                default:
                    return "text-base w-10 h-10";
            }
        };

        return (
            <Component
                className={cx(
                    "inline-flex items-center justify-center overflow-hidden bg-[var(--lumin-background)]",
                    getSize(),
                    className
                )}
                style={{
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                ref={ref}
                {...props}
            >
                {renderContent({ children, src, alt })}
            </Component>
        );
    }
);

const ExtendedAvatar = Object.assign(Avatar, {
    Group: AvatarGroup
});

ExtendedAvatar.displayName = "@luminx/core/Avatar";

export { ExtendedAvatar as Avatar };
