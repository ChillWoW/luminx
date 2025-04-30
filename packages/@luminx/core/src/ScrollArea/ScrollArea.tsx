import React, { useRef } from "react";
import { cn } from "../_utils";
import { ScrollAreaProps, ScrollAreaAutosizeProps } from "./types";
import "../style.css";

export const ScrollArea = ({
    children,
    className,
    classNames,
    type = "auto",
    scrollbars = "y",
    height,
    width,
    viewportRef
}: ScrollAreaProps) => {
    const localViewportRef = useRef<HTMLDivElement>(null);
    const actualViewportRef = viewportRef || localViewportRef;

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                className,
                classNames?.root
            )}
            style={{
                height: height,
                width: width
            }}
        >
            <div
                ref={actualViewportRef}
                className={cn(
                    "h-full w-full lumin-scrollbar",
                    scrollbars === "y"
                        ? "overflow-x-hidden overflow-y-auto"
                        : "",
                    scrollbars === "x"
                        ? "overflow-y-hidden overflow-x-auto"
                        : "",
                    scrollbars === "xy" ? "overflow-auto" : "",
                    scrollbars === "never" ? "overflow-hidden" : "",
                    classNames?.viewport
                )}
            >
                {children}
            </div>
        </div>
    );
};

export const ScrollAreaAutosize = ({
    children,
    className,
    classNames,
    scrollbars = "y",
    width,
    maxHeight,
    maxWidth,
    viewportRef
}: ScrollAreaAutosizeProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn("relative overflow-hidden", className)}
            style={{
                width: width || maxWidth,
                maxWidth: maxWidth,
                maxHeight: maxHeight
            }}
        >
            <div
                ref={viewportRef || contentRef}
                className={cn(
                    "w-full lumin-scrollbar",
                    scrollbars === "y"
                        ? "overflow-x-hidden overflow-y-auto"
                        : "",
                    scrollbars === "x"
                        ? "overflow-y-hidden overflow-x-auto"
                        : "",
                    scrollbars === "xy" ? "overflow-auto" : "",
                    scrollbars === "never" ? "overflow-hidden" : "",
                    classNames?.viewport
                )}
                style={{
                    maxHeight: maxHeight
                }}
            >
                {children}
            </div>
        </div>
    );
};

ScrollArea.Autosize = ScrollAreaAutosize;

ScrollArea.displayName = "ScrollArea";
