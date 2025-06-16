import { forwardRef, useId, useEffect, useRef, useState } from "react";
import { MenuProps } from "./types";
import { MenuContext } from "./context";
import { MenuTarget } from "./MenuTarget";
import { MenuDropdown } from "./MenuDropdown";
import { MenuLabel } from "./MenuLabel";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";
import { cx } from "../_theme";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useHover,
    useFocus,
    useClick,
    useDismiss,
    safePolygon,
    inline,
    Placement
} from "@floating-ui/react";

const defaultProps = (props: MenuProps) => {
    return {
        opened: props.opened,
        onChange: props.onChange,
        defaultOpened: props.defaultOpened || false,
        trigger: props.trigger || "click",
        width: props.width || "auto",
        offset: props.offset || 8,
        zIndex: props.zIndex || 300,
        trapFocus: props.trapFocus || true,
        position: props.position || "bottom",
        openDelay: props.openDelay || 0,
        closeDelay: props.closeDelay || 0,
        withinPortal: props.withinPortal || false,
        portalTarget: props.portalTarget,
        itemTabIndex: props.itemTabIndex || -1,
        children: props.children,
        classNames: props.classNames
    };
};

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    props = defaultProps(props);

    const [isOpened, setIsOpened] = useState(props.defaultOpened);
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const targetId = useId();
    const dropdownId = useId();

    const currentOpened = props.opened !== undefined ? props.opened : isOpened;

    const { refs, floatingStyles, context } = useFloating({
        open: currentOpened,
        onOpenChange: (open) => {
            if (props.opened === undefined) {
                setIsOpened(open);
            }
            props.onChange?.(open);
        },
        placement: props.position,
        middleware: [
            offset(props.offset || 8),
            flip({
                fallbackPlacements: ["top", "bottom", "right", "left"].filter(
                    (p) => p !== props.position
                ) as Placement[]
            }),
            shift({ padding: 8 }),
            inline()
        ],
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        enabled: props.trigger === "hover" || props.trigger === "click-hover",
        delay: { open: props.openDelay, close: props.closeDelay },
        handleClose: safePolygon()
    });

    const click = useClick(context, {
        enabled: props.trigger === "click" || props.trigger === "click-hover"
    });

    const focus = useFocus(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        focus,
        dismiss
    ]);

    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const handleOpen = () => {
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
        if (currentOpened) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    const contextValue = {
        opened: currentOpened,
        setOpened: props.onChange
            ? (o: boolean) => props.onChange && props.onChange(o)
            : setIsOpened,
        toggle,
        refs,
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
        context,
        targetId,
        dropdownId,
        trigger: props.trigger,
        trapFocus: props.trapFocus,
        openDelay: props.openDelay,
        closeDelay: props.closeDelay,
        withinPortal: props.withinPortal,
        portalTarget: props.portalTarget,
        position: props.position || "bottom",
        offset: props.offset,
        children: props.children
    };

    return (
        <MenuContext.Provider value={contextValue}>
            <div
                className={cx("relative inline-block", props.classNames?.root)}
                data-menu-opened={currentOpened || undefined}
                data-position={props.position}
                data-trigger={props.trigger}
                style={{
                    ["--menu-width" as any]:
                        typeof props.width === "number"
                            ? `${props.width}px`
                            : props.width,
                    ["--menu-offset" as any]:
                        typeof props.offset === "number"
                            ? `${props.offset}px`
                            : props.offset,
                    ["--menu-z-index" as any]: props.zIndex
                }}
            >
                {props.children}
            </div>
        </MenuContext.Provider>
    );
});

const ExtendedMenu = Object.assign(Menu, {
    Target: MenuTarget,
    Dropdown: MenuDropdown,
    Label: MenuLabel,
    Item: MenuItem,
    Divider: MenuDivider
});

ExtendedMenu.displayName = "Menu";

export { ExtendedMenu as Menu };
