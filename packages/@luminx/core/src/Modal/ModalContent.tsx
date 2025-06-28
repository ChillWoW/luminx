import { forwardRef, ReactNode } from "react";
import { useTheme } from "../_theme";
import { useModalContext } from "./context";

export interface ModalContentProps {
    children: ReactNode;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
    ({ children }, ref) => {
        const {
            size,
            classNames,
            fullScreen,
            animationState,
            transitionDuration = 200,
            transitionTimingFunction = "ease"
        } = useModalContext();

        const { theme, cx } = useTheme();

        const sizeClass = {
            xs: "w-[240px]",
            sm: "w-[360px]",
            md: "w-[480px]",
            lg: "w-[600px]",
            xl: "w-[720px]",
            full: "w-full",
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
                    "relative flex flex-col p-3 rounded-md shadow-lg",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]"
                        : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]",
                    !fullScreen ? sizeClass[size || "md"] : "w-full h-full",
                    fullScreen && "rounded-none border-0",
                    classNames?.content
                )}
                style={{
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
