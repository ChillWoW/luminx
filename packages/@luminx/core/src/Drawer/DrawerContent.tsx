import { forwardRef, ReactNode } from "react";
import { cn } from "../_utils";
import { useDrawerContext } from "./context";
import { getRadius, getShadow, getPadding, getCornerRadius } from "../_theme";

export interface DrawerContentProps {
    children: ReactNode;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children }, ref) => {
        const {
            size,
            radius,
            shadow,
            padding,
            classNames,
            position = "left",
            offset = 0
        } = useDrawerContext();

        const positionStyles = {
            left: { left: offset, top: 0, bottom: 0 },
            right: { right: offset, top: 0, bottom: 0 },
            top: { top: offset, left: 0, right: 0 },
            bottom: { bottom: offset, left: 0, right: 0 }
        };

        const isVertical = position === "left" || position === "right";
        const sizeValue = (() => {
            if (typeof size === "number") return `${size}px`;
            if (size === "full") return "100%";
            if (size === "auto") return "auto";

            const sizeMap = {
                xs: isVertical ? "320px" : "320px",
                sm: isVertical ? "440px" : "380px",
                md: isVertical ? "560px" : "440px",
                lg: isVertical ? "680px" : "520px",
                xl: isVertical ? "800px" : "600px"
            };

            return sizeMap[size || "md"];
        })();

        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col bg-[var(--lumin-background)] border border-[var(--lumin-border)]",
                    "fixed z-[2] transition-transform duration-300 ease-in-out",
                    {
                        "h-full": isVertical,
                        "w-full": !isVertical
                    },
                    classNames?.content
                )}
                style={{
                    ...positionStyles[position],
                    ...(isVertical
                        ? { width: sizeValue }
                        : { height: sizeValue }),
                    ...getCornerRadius({
                        radius: radius || "none",
                        corner: "right"
                    }),
                    ...getShadow(shadow || "sm"),
                    ...getPadding(padding || "md")
                }}
            >
                {children}
            </div>
        );
    }
);

DrawerContent.displayName = "DrawerContent";
