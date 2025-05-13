import { forwardRef } from "react";
import { MenuItemProps } from "./types";
import { useMenu } from "./context";
import { getRadius, useTheme } from "../_theme";

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
    (props, ref) => {
        const { theme, cx } = useTheme();

        const Component = props.component || "button";
        const { itemTabIndex, setOpened, classNames } = useMenu();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (props.disabled) {
                event.preventDefault();
                return;
            }

            props.onClick?.(event);
            setOpened(false);
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
                setOpened(false);
            }
        };

        const {
            leftSection,
            rightSection,
            component,
            children,
            className,
            disabled,
            radius,
            ...otherProps
        } = props;

        const commonProps = {
            ref,
            tabIndex: props.disabled ? -1 : itemTabIndex,
            disabled: props.disabled,
            role: "menuitem",
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            className: cx(
                "flex items-center w-full text-left px-3 py-2 text-sm transition-colors",
                theme === "light"
                    ? "hover:bg-[var(--luminx-light-background-hover)] text-[var(--luminx-light-text)]"
                    : "hover:bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)]",
                disabled &&
                    "opacity-60 cursor-not-allowed hover:bg-transparent",
                className,
                classNames?.item
            ),
            style: {
                ...getRadius(radius || "md")
            },
            ...otherProps
        };

        return (
            <Component {...commonProps}>
                {leftSection && (
                    <span className={cx("mr-2", classNames?.itemSection)}>
                        {leftSection}
                    </span>
                )}
                <span className={cx("flex-grow", classNames?.itemLabel)}>
                    {children}
                </span>
                {rightSection && (
                    <span className={cx("ml-2", classNames?.itemSection)}>
                        {rightSection}
                    </span>
                )}
            </Component>
        );
    }
);

MenuItem.displayName = "@luminx/core/Menu.Item";
