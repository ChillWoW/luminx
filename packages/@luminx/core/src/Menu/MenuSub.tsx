import { forwardRef, useId, useRef, useState, useEffect } from "react";
import { MenuSubmenuProps } from "./types";
import { useMenu } from "./context";
import { useTheme } from "../_theme";
import { Transition } from "../Transition";
import { createContext, useContext } from "react";
import { MenuSubmenuContextType } from "./types";
import { Portal } from "../Portal";
import { FloatingFocusManager } from "@floating-ui/react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useHover,
    useClick,
    useDismiss,
    safePolygon,
    Placement
} from "@floating-ui/react";
import { IconChevronRight } from "@tabler/icons-react";

const MenuSubContext = createContext<MenuSubmenuContextType | null>(null);

export const useMenuSubmenu = () => {
    const context = useContext(MenuSubContext);
    if (!context) {
        throw new Error(
            "MenuSubmenu components must be used within a MenuSubmenu component"
        );
    }
    return context;
};

export const MenuSub = forwardRef<HTMLButtonElement, MenuSubmenuProps>(
    (props, ref) => {
        const { theme, cx } = useTheme();
        const parentMenu = useMenu();

        const {
            label,
            children,
            disabled = false,
            leftSection,
            rightSection,
            className,
            position = "right-start",
            offset: submenuOffset = 4,
            openDelay = 0,
            closeDelay = 100,
            trigger = "hover",
            ...otherProps
        } = props;

        const [isOpened, setIsOpened] = useState(false);
        const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
            null
        );
        const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

        const targetId = useId();
        const dropdownId = useId();

        const { refs, floatingStyles, context } = useFloating({
            open: isOpened,
            onOpenChange: setIsOpened,
            placement: position as Placement,
            middleware: [
                offset(submenuOffset),
                flip({
                    fallbackPlacements: [
                        "left-start",
                        "right-start",
                        "top-start",
                        "bottom-start"
                    ]
                }),
                shift({ padding: 8 })
            ],
            whileElementsMounted: autoUpdate
        });

        const hover = useHover(context, {
            enabled: trigger === "hover",
            delay: { open: openDelay, close: closeDelay },
            handleClose: safePolygon()
        });

        const click = useClick(context, {
            enabled: trigger === "click"
        });

        const dismiss = useDismiss(context);

        const { getReferenceProps, getFloatingProps } = useInteractions([
            hover,
            click,
            dismiss
        ]);

        useEffect(() => {
            return () => {
                if (openTimeoutRef.current)
                    clearTimeout(openTimeoutRef.current);
                if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
            };
        }, []);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                event.preventDefault();
                return;
            }
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLButtonElement>
        ) => {
            if (disabled) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (trigger === "click") {
                    setIsOpened(!isOpened);
                }
            } else if (event.key === "ArrowRight" && !isOpened) {
                event.preventDefault();
                setIsOpened(true);
            } else if (event.key === "ArrowLeft" && isOpened) {
                event.preventDefault();
                setIsOpened(false);
            }
        };

        const submenuContextValue: MenuSubmenuContextType = {
            opened: isOpened,
            setOpened: setIsOpened,
            refs,
            context,
            floatingStyles,
            getReferenceProps,
            getFloatingProps,
            targetId,
            dropdownId,
            position,
            offset: submenuOffset,
            classNames: parentMenu.classNames
        };

        const submenuDropdown = isOpened ? (
            <Portal>
                <div style={{ position: "fixed", zIndex: 60 }}>
                    <Transition mounted={isOpened} transition="fade">
                        {(transitionStyles) => (
                            <div style={transitionStyles}>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                >
                                    <div
                                        ref={refs.setFloating}
                                        id={dropdownId}
                                        role="menu"
                                        aria-labelledby={targetId}
                                        className={cx(
                                            "p-1 overflow-hidden rounded-md shadow-lg border min-w-[180px]",
                                            theme === "light"
                                                ? "bg-[var(--luminx-light-background)] border-[var(--luminx-light-border)]"
                                                : "bg-[var(--luminx-dark-background)] border-[var(--luminx-dark-border)]",
                                            parentMenu.classNames?.dropdown
                                        )}
                                        style={{
                                            position: "absolute",
                                            ...floatingStyles
                                        }}
                                        {...getFloatingProps()}
                                    >
                                        <MenuSubContext.Provider
                                            value={submenuContextValue}
                                        >
                                            {children}
                                        </MenuSubContext.Provider>
                                    </div>
                                </FloatingFocusManager>
                            </div>
                        )}
                    </Transition>
                </div>
            </Portal>
        ) : null;

        return (
            <>
                <button
                    ref={(node) => {
                        refs.setReference(node);
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref) {
                            ref.current = node;
                        }
                    }}
                    id={targetId}
                    tabIndex={disabled ? -1 : parentMenu.itemTabIndex}
                    disabled={disabled}
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={isOpened}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    className={cx(
                        "flex items-center w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-150 ease-in-out",
                        theme === "light"
                            ? "hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
                            : "hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                        disabled &&
                            "opacity-60 cursor-not-allowed hover:bg-transparent",
                        isOpened &&
                            (theme === "light"
                                ? "bg-[var(--luminx-light-background-hover)]"
                                : "bg-[var(--luminx-dark-background-hover)]"),
                        parentMenu.classNames?.item,
                        className
                    )}
                    {...getReferenceProps(otherProps)}
                >
                    {leftSection && (
                        <span
                            className={cx(
                                "mr-2 flex-shrink-0 flex items-center justify-center",
                                parentMenu.classNames?.itemSection
                            )}
                        >
                            {leftSection}
                        </span>
                    )}
                    <span
                        className={cx(
                            "flex-grow",
                            parentMenu.classNames?.itemLabel
                        )}
                    >
                        {label}
                    </span>
                    <span
                        className={cx(
                            "ml-2 flex-shrink-0 flex items-center justify-center",
                            parentMenu.classNames?.itemSection
                        )}
                    >
                        {rightSection || <IconChevronRight size={16} />}
                    </span>
                </button>
                {submenuDropdown}
            </>
        );
    }
);

MenuSub.displayName = "@luminx/core/Menu.Submenu";

export { MenuSubContext };
