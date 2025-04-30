import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement
} from "react";
import { cn } from "../_utils";
import { TimelineProps } from "./types";
import { TimelineProvider } from "./context";
import { TimelineItem } from "./TimelineItem";

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
    (
        {
            active = -1,
            lineWidth = 2,
            bulletSize = 20,
            radius = "full",
            align = "left",
            reverseActive = false,
            className,
            classNames,
            children,
            ...props
        },
        ref
    ) => {
        const enhancedChildren = Children.map(children, (child, index) => {
            if (isValidElement(child)) {
                const isActive = reverseActive
                    ? index >= active && active !== -1
                    : index <= active && active !== -1;

                return cloneElement(child, { isActive } as any);
            }
            return child;
        });

        return (
            <TimelineProvider
                value={{
                    active,
                    lineWidth,
                    bulletSize,
                    align,
                    radius,
                    reverseActive,
                    children
                }}
            >
                <div
                    ref={ref}
                    className={cn(
                        align === "left" ? "text-left" : "text-right",
                        className,
                        classNames?.root
                    )}
                    {...props}
                >
                    {enhancedChildren}
                </div>
            </TimelineProvider>
        );
    }
);

const ExtendedTimeline = Object.assign(Timeline, {
    Item: TimelineItem
});

ExtendedTimeline.displayName = "Timeline";

export { ExtendedTimeline as Timeline };
