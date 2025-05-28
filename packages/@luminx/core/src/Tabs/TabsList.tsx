import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "../_theme";
import { useTabs } from "./context";
import { TabsListProps } from "./types";

export const TabsList = ({ className, children }: TabsListProps) => {
    const { theme, cx } = useTheme();

    const {
        orientation,
        position,
        withBorder,
        fullWidth,
        grow,
        classNames,
        value,
        variant
    } = useTabs();

    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef<Map<string, HTMLElement>>(new Map());
    const isVertical = orientation === "vertical";

    const isMounted = useRef(false);

    const updateIndicator = useCallback(() => {
        if (!isMounted.current) return;

        const currentTabElement = tabsRef.current.get(value);
        if (!currentTabElement) return;

        if (isVertical) {
            setIndicatorStyle({
                top: `${currentTabElement.offsetTop}px`,
                height: `${currentTabElement.offsetHeight}px`,
                width: "1px"
            });
        } else {
            setIndicatorStyle({
                left: `${currentTabElement.offsetLeft}px`,
                width: `${currentTabElement.offsetWidth}px`,
                height: "1px"
            });
        }
    }, [value, isVertical]);

    useEffect(() => {
        isMounted.current = true;

        const handleResize = () => {
            requestAnimationFrame(updateIndicator);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            isMounted.current = false;
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(updateIndicator, 0);
        return () => clearTimeout(timeoutId);
    }, [value, orientation, updateIndicator]);

    const registerTab = useCallback(
        (tabValue: string, element: HTMLElement | null) => {
            if (element) {
                tabsRef.current.set(tabValue, element);
                if (tabValue === value && isMounted.current) {
                    setTimeout(updateIndicator, 0);
                }
            }
        },
        [value, updateIndicator]
    );

    return (
        <div
            className={cx(
                "relative",
                theme === "light"
                    ? "border-[var(--luminx-light-border)]"
                    : "border-[var(--luminx-dark-border)]",
                isVertical
                    ? ["flex flex-col", variant !== "pills" && "border-r"]
                    : [
                          "flex flex-row",
                          variant === "pills" ? "gap-1" : "border-b"
                      ],
                position === "bottom" && [
                    "order-1 border-b-0",
                    variant !== "pills" && "border-t"
                ],
                position === "right" && "order-1 border-l border-r-0",
                !withBorder && "border-0",
                fullWidth && "w-full",
                grow && isVertical ? "flex-grow" : grow && "justify-between",
                classNames?.list,
                className
            )}
            role="tablist"
            aria-orientation={orientation}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                return React.cloneElement(child, {
                    registerTab,
                    ...(child.props as any)
                });
            })}

            {variant !== "pills" && (
                <div
                    className={cx(
                        "bg-[var(--luminx-primary)] transition-all duration-200 absolute",
                        isVertical
                            ? "right-0 w-[2px] -mr-[1px]"
                            : "bottom-0 h-[2px] -mb-[1px]",
                        position === "bottom" && "top-0 bottom-auto -mt-[2px]",
                        position === "right" && "left-0 right-auto -ml-[2px]",
                        classNames?.indicator
                    )}
                    style={indicatorStyle}
                />
            )}
        </div>
    );
};

TabsList.displayName = "@luminx/core/Tabs.List";
