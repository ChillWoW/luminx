import { forwardRef, ReactNode } from "react";
import { useTheme } from "../_theme";
import { useDrawerContext } from "./context";

export interface DrawerContentProps {
    children: ReactNode;
    style?: React.CSSProperties;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children, style }, ref) => {
        const {
            size,
            classNames,
            position = "left",
            offset = 0,
            opened,
            zIndex,
            transitionDuration = 300
        } = useDrawerContext();

        const z = zIndex || 200;

        const { theme, cx } = useTheme();

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
                    "flex flex-col p-4",
                    position === "left" && "rounded-r-md",
                    position === "right" && "rounded-l-md",
                    position === "top" && "rounded-b-md",
                    position === "bottom" && "rounded-t-md",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                    "fixed",
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
                    transform: getTransform(),
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    zIndex: z + 8,
                    ...style
                }}
            >
                {children}
            </div>
        );
    }
);

DrawerContent.displayName = "@luminx/core/DrawerContent";
