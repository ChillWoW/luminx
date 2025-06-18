import { useMenu } from "./context";
import { MenuDropdownProps } from "./types";
import { useTheme } from "../_theme";
import { Portal } from "../Portal";
import { FloatingFocusManager } from "@floating-ui/react";
import { Transition } from "../Transition";

export const MenuDropdown = ({ children, className }: MenuDropdownProps) => {
    const { theme, cx } = useTheme();

    const {
        opened,
        refs,
        getFloatingProps,
        floatingStyles,
        dropdownId,
        targetId,
        withinPortal,
        portalTarget,
        trapFocus,
        classNames,
        context
    } = useMenu();

    if (!opened) return null;

    const dropdownComponent = (
        <div style={{ position: "fixed", zIndex: 50 }}>
            <Transition mounted={opened} transition="fade">
                {(transitionStyles) => (
                    <div
                        style={{
                            ...transitionStyles
                        }}
                    >
                        <FloatingFocusManager
                            context={context}
                            modal={trapFocus}
                        >
                            <div
                                ref={refs.setFloating}
                                id={dropdownId}
                                role="menu"
                                aria-labelledby={targetId}
                                className={cx(
                                    "p-1 overflow-hidden rounded-md",
                                    "z-50 min-w-[180px]",
                                    theme === "light"
                                        ? "bg-[var(--luminx-light-background)]"
                                        : "bg-[var(--luminx-dark-background)]",
                                    classNames?.dropdown,
                                    className
                                )}
                                style={{
                                    position: "absolute",
                                    ...floatingStyles
                                }}
                                {...getFloatingProps()}
                            >
                                {children}
                            </div>
                        </FloatingFocusManager>
                    </div>
                )}
            </Transition>
        </div>
    );

    if (withinPortal) {
        return <Portal target={portalTarget}>{dropdownComponent}</Portal>;
    }

    return dropdownComponent;
};

MenuDropdown.displayName = "Menu.Dropdown";
