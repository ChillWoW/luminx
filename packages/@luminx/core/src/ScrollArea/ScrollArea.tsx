import React, { useRef } from "react";
import { ScrollAreaProps, ScrollAreaAutosizeProps } from "./types";
import "../style.css";
import { cx } from "../_theme";

export const ScrollArea = ({
    children,
    className,
    classNames,
    scrollbars = "y",
    height,
    width,
    viewportRef
}: ScrollAreaProps) => {
    const localViewportRef = useRef<HTMLDivElement>(null);
    const actualViewportRef = viewportRef || localViewportRef;

    return (
        <div
            className={cx(
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
                className={cx(
                    "h-full w-full luminx-scrollbar",
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
            className={cx("relative overflow-hidden", className)}
            style={{
                width: width || maxWidth,
                maxWidth: maxWidth,
                maxHeight: maxHeight
            }}
        >
            <div
                ref={viewportRef || contentRef}
                className={cx(
                    "w-full luminx-scrollbar",
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

ScrollAreaAutosize.displayName = "@luminx/core/ScrollArea.Autosize";

ScrollArea.Autosize = ScrollAreaAutosize;

ScrollArea.displayName = "@luminx/core/ScrollArea";
