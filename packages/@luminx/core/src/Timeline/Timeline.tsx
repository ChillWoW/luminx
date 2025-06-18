import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement
} from "react";
import { cx } from "../_theme";
import { TimelineProps } from "./types";
import { TimelineItem } from "./TimelineItem";
import { TimelineContext } from "./context";

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
    (
        {
            children,
            active = -1,
            borderVariant = "solid",
            size = "md",
            align = "left",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const childrenArray = Children.toArray(children);
        const totalItems = childrenArray.length;

        const enhancedChildren = Children.map(children, (child, index) => {
            if (isValidElement(child)) {
                const isActive = active >= 0 ? index <= active : false;
                const isLast = index === totalItems - 1;
                return cloneElement(child, {
                    active: isActive,
                    isLast: isLast,
                    index: index
                } as any);
            }
            return child;
        });

        return (
            <TimelineContext.Provider
                value={{
                    active,
                    borderVariant,
                    size,
                    align,
                    totalItems,
                    classNames
                }}
            >
                <div
                    ref={ref}
                    className={cx("relative", classNames?.root, className)}
                    {...props}
                >
                    {enhancedChildren}
                </div>
            </TimelineContext.Provider>
        );
    }
);

Timeline.displayName = "@luminx/core/Timeline";

const ExtendedTimeline = Object.assign(Timeline, {
    Item: TimelineItem
});

export { ExtendedTimeline as Timeline };
