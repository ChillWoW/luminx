import { forwardRef, ReactNode } from "react";
import { cn } from "../_utils";
import { useModalContext } from "./context";
import { getRadius, getShadow, getPadding } from "../_theme";

export interface ModalContentProps {
    children: ReactNode;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
    ({ children }, ref) => {
        const { size, radius, shadow, padding, classNames, fullScreen } =
            useModalContext();

        const sizeClass = {
            xs: "w-[320px]",
            sm: "w-[440px]",
            md: "w-[560px]",
            lg: "w-[680px]",
            xl: "w-[800px]",
            full: "w-[95vw]",
            auto: "w-auto"
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "relative bg-[var(--lumin-background)] flex flex-col",
                    !fullScreen ? sizeClass[size || "md"] : "w-full h-full",
                    fullScreen && "rounded-none border-0",
                    classNames?.content
                )}
                style={{
                    ...(!fullScreen ? getRadius(radius || "md") : {}),
                    ...getShadow(shadow || "sm"),
                    ...getPadding(padding || "md")
                }}
            >
                {children}
            </div>
        );
    }
);

ModalContent.displayName = "ModalContent";
