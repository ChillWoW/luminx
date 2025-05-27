import React, { cloneElement, useRef, useState } from "react";
import { TooltipProps } from "./types";
import { getRadius, useTheme } from "../_theme";
import { Transition } from "../Transition";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    Placement,
    FloatingArrow
} from "@floating-ui/react";

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            children,
            label,
            position = "top",
            offset: offsetProp = 5,
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
            radius,
            className,
            classNames,
            style,
            ...others
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [open, setOpen] = useState(opened || false);
        const arrowRef = useRef<SVGSVGElement>(null);

        const convertPosition = (pos: string): Placement => {
            return pos as Placement;
        };

        const { x, y, strategy, refs, middlewareData, context } = useFloating({
            placement: convertPosition(position),
            open,
            onOpenChange: (opened) => {
                if (opened === undefined) return;
                setOpen(opened);
            },
            middleware: [
                offset(
                    typeof offsetProp === "number"
                        ? offsetProp
                        : {
                              mainAxis: offsetProp?.mainAxis ?? 5,
                              crossAxis: offsetProp?.crossAxis ?? 0
                          }
                ),
                flip(),
                shift(),
                ...(withArrow ? [arrow({ element: arrowRef })] : [])
            ],
            whileElementsMounted: autoUpdate
        });

        const hover = useHover(context, {
            enabled: events.hover && !disabled,
            delay: { open: openDelay, close: closeDelay }
        });

        const focus = useFocus(context, {
            enabled: events.focus && !disabled
        });

        const dismiss = useDismiss(context);

        const role = useRole(context, { role: "tooltip" });

        const { getReferenceProps, getFloatingProps } = useInteractions([
            hover,
            focus,
            dismiss,
            role
        ]);

        React.useEffect(() => {
            if (opened !== undefined) {
                setOpen(opened);
            }
        }, [opened]);

        if (!label) {
            return <>{children}</>;
        }

        const clonedChild = cloneElement(
            React.Children.only(children) as React.ReactElement,
            {
                [refProp]: refs.setReference,
                ...getReferenceProps({
                    "aria-describedby": open ? "tooltip" : undefined
                })
            } as any
        );

        const tooltipElement = open && (
            <Transition mounted={open} transition="fade">
                {(transitionStyles) => (
                    <div
                        ref={(node) => {
                            refs.setFloating(node);
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                        }}
                        role="tooltip"
                        id="tooltip"
                        className={cx(
                            "fixed z-50 pointer-events-none",
                            "transition-opacity duration-200",
                            open ? "opacity-100" : "opacity-0",
                            theme === "light"
                                ? "bg-[var(--luminx-light-background)]"
                                : "bg-[var(--luminx-dark-background)]",
                            classNames?.root
                        )}
                        style={{
                            ...getRadius(radius),
                            ...style,
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            ...transitionStyles
                        }}
                        {...getFloatingProps(others)}
                    >
                        <div
                            className={cx(
                                "py-1 px-2 text-sm",
                                theme === "light"
                                    ? "text-[var(--luminx-light-text)]"
                                    : "text-[var(--luminx-dark-text)]",
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
                                <FloatingArrow
                                    ref={arrowRef}
                                    context={context}
                                    className={classNames?.arrow}
                                    fill={
                                        theme === "light"
                                            ? "var(--luminx-light-background)"
                                            : "var(--luminx-dark-background)"
                                    }
                                    width={arrowSize * 2}
                                    height={arrowSize}
                                    tipRadius={arrowRadius}
                                />
                            )}
                            <div className={classNames?.content}>{label}</div>
                        </div>
                    </div>
                )}
            </Transition>
        );

        return (
            <div
                className={cx(
                    "relative",
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
