import React, { forwardRef, ReactNode } from "react";
import { cn } from "../_utils";
import { AvatarProps, AvatarSize } from "./types";
import { getRadius, getShadow } from "../_theme";
import { AvatarGroup } from "./AvatarGroup";

const defaultFallback = (children: ReactNode) => {
    return (
        <svg
            width="50%"
            height="50%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="currentColor"
            />
            <path
                d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                fill="currentColor"
            />
        </svg>
    );
};

const renderContent = ({ children, src, alt }: AvatarProps) => {
    if (src) {
        return <img src={src} alt={alt} />;
    } else if (children) {
        return children;
    } else {
        return defaultFallback(children);
    }
};

const getSize = (size: AvatarSize) => {
    const sizes = {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl"
    };

    return sizes[size ?? "md"];
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            children,
            src,
            alt = "avatar",
            size = "md",
            shadow = "sm",
            radius = "full",
            component: Component = "div",
            withBorder,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <Component
                className={cn(
                    "inline-flex items-center justify-center relative overflow-hidden",
                    "text-[var(--lumin-text)] bg-[var(--lumin-background)]",
                    withBorder && "border border-[var(--lumin-border)]",
                    getSize(size),
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

ExtendedAvatar.displayName = "Avatar";

export { ExtendedAvatar as Avatar };
