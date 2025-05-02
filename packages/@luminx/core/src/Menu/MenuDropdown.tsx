import { useEffect, useRef } from "react";
import { useMenu } from "./context";
import { MenuDropdownProps } from "./types";
import { getPadding, getRadius, getShadow } from "../_theme";
import { cx } from "../_theme";
import { Portal } from "../Portal";
import { Transition } from "../Transition";
import "../style.css";

export const MenuDropdown = ({
    children,
    className,
    padding = "sm"
}: MenuDropdownProps) => {
    const {
        opened,
        targetElement,
        dropdownId,
        targetId,
        trigger,
        withinPortal,
        portalTarget,
        trapFocus,
        setOpened,
        radius,
        shadow,
        position = "bottom",
        offset,
        classNames,
        transitionProps
    } = useMenu();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!opened) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef.current || !targetElement) return;

            const target = event.target as Node;

            if (targetElement.contains(target)) return;
            if (dropdownRef.current.contains(target)) return;

            setOpened(false);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [opened, targetElement, setOpened]);

    useEffect(() => {
        if (!opened || !dropdownRef.current || !targetElement) return;

        const dropdown = dropdownRef.current;
        const targetRect = targetElement.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const offsetValue = offset || 8;

        let top = 0;
        let left = 0;

        if (position.startsWith("bottom")) {
            top = targetRect.bottom + offsetValue;
        } else if (position.startsWith("top")) {
            top = targetRect.top - dropdownRect.height - offsetValue;
        } else if (
            position.startsWith("left") ||
            position.startsWith("right")
        ) {
            top =
                targetRect.top + (targetRect.height - dropdownRect.height) / 2;
        }

        if (position.startsWith("bottom") || position.startsWith("top")) {
            if (position.endsWith("start")) {
                left = targetRect.left;
            } else if (position.endsWith("end")) {
                left = targetRect.right - dropdownRect.width;
            } else {
                left =
                    targetRect.left +
                    (targetRect.width - dropdownRect.width) / 2;
            }
        } else if (position.startsWith("left")) {
            left = targetRect.left - dropdownRect.width - offsetValue;
        } else if (position.startsWith("right")) {
            left = targetRect.right + offsetValue;
        }

        dropdown.style.position = "fixed";
        dropdown.style.top = `${top}px`;
        dropdown.style.left = `${left}px`;

        const dropdownRight = left + dropdownRect.width;
        const dropdownBottom = top + dropdownRect.height;

        if (dropdownRight > windowWidth) {
            dropdown.style.left = `${windowWidth - dropdownRect.width - 10}px`;
        }

        if (dropdownBottom > windowHeight) {
            if (position.startsWith("bottom")) {
                dropdown.style.top = `${
                    targetRect.top - dropdownRect.height - offsetValue
                }px`;
            } else {
                dropdown.style.top = `${
                    windowHeight - dropdownRect.height - 10
                }px`;
            }
        }

        if (left < 0) {
            dropdown.style.left = "10px";
        }

        if (top < 0) {
            if (position.startsWith("top")) {
                dropdown.style.top = `${targetRect.bottom + offsetValue}px`;
            } else {
                dropdown.style.top = "10px";
            }
        }
    }, [opened, targetElement, position, offset]);

    useEffect(() => {
        if (!opened || !dropdownRef.current || !trapFocus) return;

        const dropdown = dropdownRef.current;
        const focusableElements = dropdown.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstFocusable = focusableElements[0] as HTMLElement;
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }, [opened, trapFocus]);

    useEffect(() => {
        if (!opened || !dropdownRef.current) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpened(false);
                if (targetElement) {
                    targetElement.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [opened, targetElement]);

    if (!opened) return null;

    const handleMouseEnter = () => {
        if (trigger === "hover" || trigger === "click-hover") {
            setOpened(true);
        }
    };

    const handleMouseLeave = () => {
        if (trigger === "hover" || trigger === "click-hover") {
            setOpened(false);
        }
    };

    const dropdownComponent = (
        <Transition
            mounted={opened}
            transition={transitionProps?.transition || "fade"}
            {...transitionProps}
        >
            {(styles) => (
                <div style={styles}>
                    <div
                        ref={dropdownRef}
                        id={dropdownId}
                        role="menu"
                        aria-labelledby={targetId}
                        className={cx(
                            "menu-dropdown absolute z-[var(--menu-z-index,300)] w-[var(--menu-width,auto)] bg-[var(--lumin-background)] overflow-hidden",
                            className,
                            classNames?.dropdown
                        )}
                        style={{
                            ...getRadius(radius || "md"),
                            ...getShadow(shadow || "md"),
                            ...getPadding(padding || "md")
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        data-position={position}
                    >
                        {children}
                    </div>
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
