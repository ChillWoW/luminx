import React, { useRef } from "react";
import { ScrollAreaProps } from "./types";
import { cx } from "../_theme";

export const ScrollArea = ({
    children,
    className,
    classNames,
    scrollbars = "y",
    viewportRef
}: ScrollAreaProps) => {
    const localViewportRef = useRef<HTMLDivElement>(null);
    const actualViewportRef = viewportRef || localViewportRef;

    const scrollbarClass = (() => {
        switch (scrollbars) {
            case "y":
                return "overflow-y-auto overflow-x-hidden";
            case "x":
                return "overflow-x-auto overflow-y-hidden";
            case "xy":
                return "overflow-auto";
            case "never":
                return "overflow-hidden";
            default:
                return "";
        }
    })();

    return (
        <div className={cx("relative", className, classNames?.root)}>
            <div
                ref={actualViewportRef}
                className={cx(
                    "w-full h-full luminx-scrollbar",
                    scrollbarClass,
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
    viewportRef
}: ScrollAreaProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const scrollbarClass = (() => {
        switch (scrollbars) {
            case "y":
                return "overflow-y-auto overflow-x-hidden";
            case "x":
                return "overflow-x-auto overflow-y-hidden";
            case "xy":
                return "overflow-auto";
            case "never":
                return "overflow-hidden";
            default:
                return "";
        }
    })();

    return (
        <div className={cx("relative", className)}>
            <div
                ref={viewportRef || contentRef}
                className={cx("w-full", scrollbarClass, classNames?.viewport)}
            >
                {children}
            </div>
        </div>
    );
};

ScrollAreaAutosize.displayName = "@luminx/core/ScrollArea.Autosize";
ScrollArea.displayName = "@luminx/core/ScrollArea";
ScrollArea.Autosize = ScrollAreaAutosize;
