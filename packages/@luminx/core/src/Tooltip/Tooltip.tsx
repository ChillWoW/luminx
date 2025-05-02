import React, {
    cloneElement,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { TooltipProps } from "./types";
import "../style.css";
import { getRadius, cx } from "../_theme";
import { Transition } from "../Transition";

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            children,
            label,
            position = "top",
            offset = 5,
            disabled = false,
            opened,
            withArrow = false,
            arrowSize = 4,
            arrowRadius = 0,
            multiline = false,
            width,
            events = { hover: true, focus: false, touch: false },
            inline = false,
            openDelay = 0,
            closeDelay = 0,
            refProp = "ref",
            color,
            radius,
            className,
            classNames,
            style,
            ...others
        },
        ref
    ) => {
        const [visible, setVisible] = useState(opened || false);
        const timeoutRef = useRef<NodeJS.Timeout | null>(null);
        const targetRef = useRef<HTMLElement | null>(null);
        const tooltipRef = useRef<HTMLDivElement | null>(null);

        const finalOpenDelay = openDelay;
        const finalCloseDelay = closeDelay;

        const clearTimeouts = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const handleOpen = () => {
            if (disabled) return;

            clearTimeouts();
            timeoutRef.current = setTimeout(
                () => setVisible(true),
                finalOpenDelay
            );
        };

        const handleClose = () => {
            if (opened !== undefined) return;

            clearTimeouts();
            timeoutRef.current = setTimeout(
                () => setVisible(false),
                finalCloseDelay
            );
        };

        useEffect(() => {
            if (visible && targetRef.current && tooltipRef.current) {
                const targetRect = targetRef.current.getBoundingClientRect();
                const tooltipRect = tooltipRef.current.getBoundingClientRect();

                let top = 0;
                let left = 0;

                // Calculate position
                if (position.startsWith("top")) {
                    top =
                        targetRect.top -
                        tooltipRect.height -
                        (typeof offset === "number" ? offset : 5);
                    left =
                        targetRect.left +
                        targetRect.width / 2 -
                        tooltipRect.width / 2;

                    if (position === "top-start") {
                        left = targetRect.left;
                    } else if (position === "top-end") {
                        left = targetRect.right - tooltipRect.width;
                    }
                } else if (position.startsWith("bottom")) {
                    top =
                        targetRect.bottom +
                        (typeof offset === "number" ? offset : 5);
                    left =
                        targetRect.left +
                        targetRect.width / 2 -
                        tooltipRect.width / 2;

                    if (position === "bottom-start") {
                        left = targetRect.left;
                    } else if (position === "bottom-end") {
                        left = targetRect.right - tooltipRect.width;
                    }
                } else if (position.startsWith("left")) {
                    left =
                        targetRect.left -
                        tooltipRect.width -
                        (typeof offset === "number" ? offset : 5);
                    top =
                        targetRect.top +
                        targetRect.height / 2 -
                        tooltipRect.height / 2;

                    if (position === "left-start") {
                        top = targetRect.top;
                    } else if (position === "left-end") {
                        top = targetRect.bottom - tooltipRect.height;
                    }
                } else if (position.startsWith("right")) {
                    left =
                        targetRect.right +
                        (typeof offset === "number" ? offset : 5);
                    top =
                        targetRect.top +
                        targetRect.height / 2 -
                        tooltipRect.height / 2;

                    if (position === "right-start") {
                        top = targetRect.top;
                    } else if (position === "right-end") {
                        top = targetRect.bottom - tooltipRect.height;
                    }
                }

                tooltipRef.current.style.left = `${left}px`;
                tooltipRef.current.style.top = `${top}px`;
            }
        }, [visible, position, offset]);

        useEffect(() => {
            if (opened !== undefined) {
                setVisible(opened);
            }
        }, [opened]);

        useEffect(() => {
            return () => clearTimeouts();
        }, []);

        const eventHandlers = !disabled
            ? {
                  ...(events.hover
                      ? {
                            onMouseEnter: handleOpen,
                            onMouseLeave: handleClose
                        }
                      : {}),
                  ...(events.focus
                      ? {
                            onFocus: handleOpen,
                            onBlur: handleClose
                        }
                      : {}),
                  ...(events.touch
                      ? {
                            onTouchStart: handleOpen,
                            onTouchEnd: handleClose
                        }
                      : {})
              }
            : {};

        if (!label) {
            return <>{children}</>;
        }

        const clonedChild = cloneElement(
            React.Children.only(children) as React.ReactElement,
            {
                [refProp]: (node: HTMLElement) => {
                    targetRef.current = node;

                    const childRef = (children as any).ref;
                    if (typeof childRef === "function") {
                        childRef(node);
                    } else if (childRef) {
                        childRef.current = node;
                    }
                },
                ...eventHandlers,
                "aria-describedby": visible ? "tooltip" : undefined
            } as any
        );

        const tooltipElement = visible && (
            <Transition mounted={visible} transition="fade">
                {(transitionStyles) => (
                    <div
                        ref={(node) => {
                            tooltipRef.current = node;
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                        }}
                        role="tooltip"
                        id="tooltip"
                        className={cx(
                            "fixed z-50 pointer-events-none bg-[var(--lumin-background)]",
                            "transition-opacity duration-200",
                            visible ? "opacity-100" : "opacity-0",
                            classNames?.root
                        )}
                        style={{
                            ...getRadius(radius),
                            ...style,
                            backgroundColor: color
                        }}
                        {...others}
                    >
                        <div
                            className={cx(
                                "py-1 px-2 text-sm text-[var(--lumin-text)]",
                                multiline
                                    ? "text-left max-w-xs"
                                    : "text-center whitespace-nowrap",
                                classNames?.tooltip
                            )}
                            style={{
                                width: multiline && width ? width : "auto"
                            }}
                        >
                            {withArrow && (
                                <div
                                    className={cx(
                                        "absolute w-2 h-2 bg-inherit transform rotate-45",
                                        position.startsWith("top")
                                            ? "bottom-0 translate-y-1/2"
                                            : position.startsWith("bottom")
                                            ? "top-0 -translate-y-1/2"
                                            : position.startsWith("left")
                                            ? "right-0 translate-x-1/2"
                                            : "left-0 -translate-x-1/2",
                                        classNames?.arrow
                                    )}
                                    style={{
                                        width: arrowSize,
                                        height: arrowSize,
                                        borderRadius: arrowRadius
                                    }}
                                />
                            )}
                            <div
                                className={cx(
                                    "tooltip-content",
                                    classNames?.content
                                )}
                            >
                                {label}
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        );

        return (
            <div
                className={cx(
                    "tooltip-wrapper relative",
                    inline ? "inline" : "inline-block",
                    className
                )}
            >
                {clonedChild}
                {tooltipElement}
            </div>
        );
    }
);

Tooltip.displayName = "@luminx/core/Tooltip";
