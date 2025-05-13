import { useMenu } from "./context";
import { MenuDropdownProps } from "./types";
import { getPadding, getRadius, getShadow, useTheme } from "../_theme";
import { Portal } from "../Portal";
import { Transition } from "../Transition";
import { FloatingFocusManager } from "@floating-ui/react";

export const MenuDropdown = ({
    children,
    className,
    padding = "sm"
}: MenuDropdownProps) => {
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
        radius,
        shadow,
        classNames,
        transitionProps
    } = useMenu();

    if (!opened) return null;

    const dropdownComponent = (
        <Transition
            mounted={opened}
            transition={transitionProps?.transition || "fade"}
            {...transitionProps}
        >
            {(styles) => (
                <div style={styles}>
                    <FloatingFocusManager
                        context={useMenu().context}
                        modal={trapFocus}
                    >
                        <div
                            ref={refs.setFloating}
                            id={dropdownId}
                            role="menu"
                            aria-labelledby={targetId}
                            className={cx(
                                "menu-dropdown overflow-hidden",
                                theme === "light"
                                    ? "bg-[var(--luminx-light-background)]"
                                    : "bg-[var(--luminx-dark-background)]",
                                className,
                                classNames?.dropdown
                            )}
                            style={{
                                ...floatingStyles,
                                ...getRadius(radius || "md"),
                                ...getShadow(shadow || "md"),
                                ...getPadding(padding || "md"),
                                width: "var(--menu-width, auto)",
                                zIndex: "var(--menu-z-index, 300)"
                            }}
                            {...getFloatingProps()}
                        >
                            {children}
                        </div>
                    </FloatingFocusManager>
                </div>
            )}
        </Transition>
    );

    if (withinPortal) {
        return <Portal target={portalTarget}>{dropdownComponent}</Portal>;
    }

    return dropdownComponent;
};

MenuDropdown.displayName = "Menu.Dropdown";
