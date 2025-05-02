import { forwardRef, ReactNode } from "react";
import { cx } from "../_theme";
import { useModalContext } from "./context";
import { getRadius, getShadow, getPadding } from "../_theme";

export interface ModalContentProps {
    children: ReactNode;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
    ({ children }, ref) => {
        const {
            size,
            radius,
            shadow,
            padding,
            classNames,
            fullScreen,
            animationState,
            transitionDuration = 200,
            transitionTimingFunction = "ease"
        } = useModalContext();

        const sizeClass = {
            xs: "w-[320px]",
            sm: "w-[440px]",
            md: "w-[560px]",
            lg: "w-[680px]",
            xl: "w-[800px]",
            full: "w-[95vw]",
            auto: "w-auto"
        };

        const getTransformValue = () => {
            switch (animationState) {
                case "entering":
                case "exiting":
                    return "translateY(-20px) scale(0.95)";
                case "entered":
                    return "translateY(0) scale(1)";
                default:
                    return "translateY(-20px) scale(0.95)";
            }
        };

        const getOpacityValue = () => {
            switch (animationState) {
                case "entering":
                case "exiting":
                    return 0;
                case "entered":
                    return 1;
                default:
                    return 0;
            }
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "relative bg-[var(--lumin-background)] flex flex-col",
                    !fullScreen ? sizeClass[size || "md"] : "w-full h-full",
                    fullScreen && "rounded-none border-0",
                    classNames?.content
                )}
                style={{
                    ...(!fullScreen ? getRadius(radius || "md") : {}),
                    ...getShadow(shadow || "sm"),
                    ...getPadding(padding || "md"),
                    transform: getTransformValue(),
                    opacity: getOpacityValue(),
                    transition: `transform ${transitionDuration}ms ${transitionTimingFunction}, opacity ${transitionDuration}ms ${transitionTimingFunction}`
                }}
            >
                {children}
            </div>
        );
    }
);

ModalContent.displayName = "@luminx/core/Modal.Content";
