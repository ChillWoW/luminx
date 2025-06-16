import { useMenu } from "./context";
import { MenuDropdownProps } from "./types";
import { useTheme } from "../_theme";
import { Portal } from "../Portal";
import { FloatingFocusManager } from "@floating-ui/react";

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
        <>
            <FloatingFocusManager context={context} modal={trapFocus}>
                <div
                    ref={refs.setFloating}
                    id={dropdownId}
                    role="menu"
                    aria-labelledby={targetId}
                    className={cx(
                        "p-3 overflow-hidden rounded-md z-50",
                        theme === "light"
                            ? "bg-[var(--luminx-light-background)]"
                            : "bg-[var(--luminx-dark-background)]",
                        className,
                        classNames?.dropdown
                    )}
                    style={{
                        position: "absolute",
                        ...floatingStyles,
                        width: "var(--menu-width, auto)"
                    }}
                    {...getFloatingProps()}
                >
                    {children}
                </div>
            </FloatingFocusManager>
        </>
    );

    if (withinPortal) {
        return <Portal target={portalTarget}>{dropdownComponent}</Portal>;
    }

    return dropdownComponent;
};

MenuDropdown.displayName = "Menu.Dropdown";
