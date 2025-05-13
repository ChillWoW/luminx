import { forwardRef, ReactNode } from "react";
import { cx } from "../_theme";
import { useDrawerContext } from "./context";
import { getShadow, getCornerRadius } from "../_theme";
import "../style.css";

export interface DrawerContentProps {
    children: ReactNode;
    style?: React.CSSProperties;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children, style }, ref) => {
        const {
            size,
            radius,
            shadow,
            classNames,
            position = "left",
            offset = 0,
            opened,
            transitionDuration = 300
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

        // Get transform values based on position and opened state
        const getTransform = () => {
            if (opened) return "translate3d(0, 0, 0)";

            switch (position) {
                case "left":
                    return "translate3d(-100%, 0, 0)";
                case "right":
                    return "translate3d(100%, 0, 0)";
                case "top":
                    return "translate3d(0, -100%, 0)";
                case "bottom":
                    return "translate3d(0, 100%, 0)";
                default:
                    return "translate3d(-100%, 0, 0)";
            }
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "flex flex-col p-4 bg-[var(--lumin-background)]",
                    "fixed z-[2]",
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
                    transform: getTransform(),
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    ...style
                }}
            >
                {children}
            </div>
        );
    }
);

DrawerContent.displayName = "@luminx/core/DrawerContent";
