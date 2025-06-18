import { forwardRef, useId, useEffect, useRef, useState } from "react";
import { PopoverProps } from "./types";
import { PopoverContext } from "./context";
import { PopoverTarget } from "./PopoverTarget";
import { PopoverDropdown } from "./PopoverDropdown";
import { cx } from "../_theme";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    useInteractions,
    useHover,
    useFocus,
    useClick,
    useDismiss,
    useRole,
    safePolygon,
    Placement
} from "@floating-ui/react";

const defaultProps = (props: PopoverProps) => {
    return {
        opened: props.opened,
        onChange: props.onChange,
        defaultOpened: props.defaultOpened || false,
        trigger: props.trigger || "click",
        position: props.position || "bottom",
        offset: props.offset || 8,
        withArrow: props.withArrow || false,
        arrowSize: props.arrowSize || 7,
        arrowRadius: props.arrowRadius || 0,
        trapFocus: props.trapFocus || true,
        disabled: props.disabled || false,
        openDelay: props.openDelay || 0,
        closeDelay: props.closeDelay || 0,
        zIndex: props.zIndex || 300,
        children: props.children,
        classNames: props.classNames
    };
};

const Popover = forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
    props = defaultProps(props);

    const [isOpened, setIsOpened] = useState(props.defaultOpened);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const targetId = useId();
    const dropdownId = useId();

    const currentOpened = props.opened !== undefined ? props.opened : isOpened;

    const convertPosition = (pos: string): Placement => {
        return pos as Placement;
    };

    const { refs, floatingStyles, context, middlewareData } = useFloating({
        open: currentOpened && !props.disabled,
        onOpenChange: (open) => {
            if (props.disabled) return;

            if (props.opened === undefined) {
                setIsOpened(open);
            }
            props.onChange?.(open);
        },
        placement: convertPosition(props.position!),
        middleware: [
            offset(
                typeof props.offset === "number"
                    ? props.offset
                    : {
                          mainAxis: props.offset?.mainAxis ?? 8,
                          crossAxis: props.offset?.crossAxis ?? 0
                      }
            ),
            flip({
                fallbackPlacements: [
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "top-start",
                    "top-end",
                    "bottom-start",
                    "bottom-end",
                    "left-start",
                    "left-end",
                    "right-start",
                    "right-end"
                ].filter((p) => p !== props.position) as Placement[]
            }),
            shift({ padding: 8 }),
            ...(props.withArrow ? [arrow({ element: arrowRef })] : [])
        ],
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        enabled:
            (props.trigger === "hover" || props.trigger === "hover-click") &&
            !props.disabled,
        delay: { open: props.openDelay, close: props.closeDelay },
        handleClose: safePolygon()
    });

    const click = useClick(context, {
        enabled:
            (props.trigger === "click" || props.trigger === "hover-click") &&
            !props.disabled
    });

    const focus = useFocus(context, {
        enabled: !props.disabled
    });

    const dismiss = useDismiss(context, {
        enabled: !props.disabled
    });

    const role = useRole(context, {
        role: "dialog"
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        focus,
        dismiss,
        role
    ]);

    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const handleOpen = () => {
        if (props.disabled) return;

        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

        if (currentOpened) return;

        const open = () => {
            if (props.opened === undefined) {
                setIsOpened(true);
            }
            props.onChange?.(true);
        };

        if (props.openDelay && props.openDelay > 0) {
            openTimeoutRef.current = setTimeout(open, props.openDelay);
        } else {
            open();
        }
    };

    const handleClose = () => {
        if (props.disabled) return;

        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

        if (!currentOpened) return;

        const close = () => {
            if (props.opened === undefined) {
                setIsOpened(false);
            }
            props.onChange?.(false);
        };

        if (props.closeDelay && props.closeDelay > 0) {
            closeTimeoutRef.current = setTimeout(close, props.closeDelay);
        } else {
            close();
        }
    };

    const toggle = () => {
        if (props.disabled) return;

        if (currentOpened) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    const contextValue = {
        opened: Boolean(currentOpened && !props.disabled),
        setOpened: props.onChange
            ? (o: boolean) =>
                  !props.disabled && props.onChange && props.onChange(o)
            : (o: boolean) => !props.disabled && setIsOpened(o),
        toggle,
        refs,
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
        context,
        targetId,
        dropdownId,
        middlewareData,
        trigger: props.trigger,
        position: props.position,
        withArrow: props.withArrow,
        arrowSize: props.arrowSize,
        arrowRadius: props.arrowRadius,
        trapFocus: props.trapFocus,
        disabled: props.disabled,
        openDelay: props.openDelay,
        closeDelay: props.closeDelay,
        zIndex: props.zIndex,
        children: props.children,
        classNames: props.classNames,
        arrowRef
    };

    return (
        <PopoverContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cx("relative inline-block", props.classNames?.root)}
                data-popover-opened={
                    (currentOpened && !props.disabled) || undefined
                }
                data-position={props.position}
                data-trigger={props.trigger}
                data-disabled={props.disabled || undefined}
            >
                {props.children}
            </div>
        </PopoverContext.Provider>
    );
});

Popover.displayName = "@luminx/core/Popover";

const ExtendedPopover = Object.assign(Popover, {
    Target: PopoverTarget,
    Dropdown: PopoverDropdown
});

export { ExtendedPopover as Popover };
