import React, { ElementType, forwardRef } from "react";
import { AvatarProps } from "./types";
import { useTheme } from "../_theme";
import { AvatarGroup } from "./AvatarGroup";
import { IconUserCircle } from "@tabler/icons-react";

const defaultFallback = () => {
    return (
        <div className="flex items-center justify-center">
            <IconUserCircle />
        </div>
    );
};

const renderContent = ({ children, src, alt }: AvatarProps) => {
    if (src) {
        return (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        );
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
            withBorder,
            component: Component = "div",
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

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

        const Element = Component as ElementType;
        return (
            <Element
                className={cx(
                    "inline-flex items-center justify-center overflow-hidden rounded-full",
                    withBorder && "border",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)] border-[var(--luminx-light-border)]"
                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)] border-[var(--luminx-dark-border)]",
                    getSize(),
                    className
                )}
                ref={ref}
                {...props}
            >
                {renderContent({ children, src, alt })}
            </Element>
        );
    }
);

const ExtendedAvatar = Object.assign(Avatar, {
    Group: AvatarGroup
});

ExtendedAvatar.displayName = "@luminx/core/Avatar";

export { ExtendedAvatar as Avatar };
