import { forwardRef, useId, useEffect, useRef, useState } from "react";
import { MenuProps } from "./types";
import { MenuContext } from "./context";
import { cn } from "../_utils";
import { MenuTarget } from "./MenuTarget";
import { MenuDropdown } from "./MenuDropdown";
import { MenuLabel } from "./MenuLabel";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";

const defaultProps = (props: MenuProps) => {
    return {
        opened: props.opened,
        onChange: props.onChange,
        defaultOpened: props.defaultOpened || false,
        trigger: props.trigger || "click",
        radius: props.radius || "md",
        shadow: props.shadow || "sm",
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
        transitionProps: props.transitionProps,
        children: props.children,
        classNames: props.classNames
    };
};

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    props = defaultProps(props);

    const [isOpened, setIsOpened] = useState(props.defaultOpened);
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(
        null
    );
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const targetId = useId();
    const dropdownId = useId();

    const currentOpened = props.opened !== undefined ? props.opened : isOpened;

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
        targetElement,
        setTargetElement,
        targetId,
        dropdownId,
        trigger: props.trigger,
        trapFocus: props.trapFocus,
        openDelay: props.openDelay,
        closeDelay: props.closeDelay,
        withinPortal: props.withinPortal,
        portalTarget: props.portalTarget,
        radius: props.radius,
        shadow: props.shadow,
        position: props.position || "bottom",
        offset: props.offset,
        transitionProps: props.transitionProps,
        children: props.children
    };

    return (
        <MenuContext.Provider value={contextValue}>
            <div
                className={cn("relative inline-block", props.classNames?.root)}
                data-menu-opened={currentOpened || undefined}
                data-position={props.position}
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
