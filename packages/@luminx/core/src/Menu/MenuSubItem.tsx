import { forwardRef } from "react";
import { MenuItemProps } from "./types";
import { useMenuSubmenu } from "./MenuSub";
import { useMenu } from "./context";
import { useTheme } from "../_theme";

export const MenuSubItem = forwardRef<HTMLButtonElement, MenuItemProps>(
    (props, ref) => {
        const { theme, cx } = useTheme();
        const submenu = useMenuSubmenu();
        const parentMenu = useMenu();

        const Component = props.component || "button";

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (props.disabled) {
                event.preventDefault();
                return;
            }

            props.onClick?.(event);
            submenu.setOpened(false);
            parentMenu.setOpened(false);
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLButtonElement>
        ) => {
            if (props.disabled) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                props.onClick?.(
                    event as unknown as React.MouseEvent<HTMLButtonElement>
                );
                submenu.setOpened(false);
                parentMenu.setOpened(false);
            }
        };

        const {
            leftSection,
            rightSection,
            component,
            children,
            className,
            disabled,
            ...otherProps
        } = props;

        const commonProps = {
            ref,
            tabIndex: props.disabled ? -1 : -1,
            disabled: props.disabled,
            role: "menuitem",
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            className: cx(
                "flex items-center w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-150 ease-in-out",
                theme === "light"
                    ? "hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
                    : "hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                disabled &&
                    "opacity-60 cursor-not-allowed hover:bg-transparent",
                submenu.classNames?.item,
                className
            ),
            ...otherProps
        };

        return (
            <Component {...commonProps}>
                {leftSection && (
                    <span
                        className={cx(
                            "mr-2 flex-shrink-0 flex items-center justify-center",
                            submenu.classNames?.itemSection
                        )}
                    >
                        {leftSection}
                    </span>
                )}
                <span
                    className={cx("flex-grow", submenu.classNames?.itemLabel)}
                >
                    {children}
                </span>
                {rightSection && (
                    <span
                        className={cx(
                            "ml-2 flex-shrink-0 flex items-center justify-center",
                            submenu.classNames?.itemSection
                        )}
                    >
                        {rightSection}
                    </span>
                )}
            </Component>
        );
    }
);

MenuSubItem.displayName = "@luminx/core/Menu.Sub.Item";
