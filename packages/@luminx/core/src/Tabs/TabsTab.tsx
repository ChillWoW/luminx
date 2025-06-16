import { useRef, useEffect } from "react";
import { useTheme } from "../_theme";
import { useTabs } from "./context";
import { TabsTabProps } from "./types";

export const TabsTab = ({
    value,
    label,
    leftSection,
    rightSection,
    description,
    disabled,
    className,
    registerTab
}: TabsTabProps) => {
    const {
        value: activeValue,
        onChange,
        size,
        variant,
        grow,
        classNames,
        orientation
    } = useTabs();

    const { theme, cx } = useTheme();

    const isActive = activeValue === value;
    const tabRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (registerTab && tabRef.current) {
            registerTab(value, tabRef.current);
        }
    }, [value, registerTab]);

    const handleClick = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    const sizeClasses = {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
        xl: "px-6 py-3 text-lg"
    };

    const variantClasses = () => {
        switch (variant) {
            case "pills":
                return [
                    "rounded-md",
                    theme === "light"
                        ? "hover:bg-[var(--luminx-light-background-hover)]"
                        : "hover:bg-[var(--luminx-dark-background-hover)]"
                ];
            default:
                return [
                    theme === "light"
                        ? "hover:bg-[var(--luminx-light-background-hover)]"
                        : "hover:bg-[var(--luminx-dark-background-hover)]"
                ];
        }
    };

    return (
        <div
            ref={tabRef}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cx(
                "flex items-center gap-2 cursor-pointer transition-all duration-200",
                orientation === "horizontal" ? "rounded-t-md" : "rounded-l-md",
                sizeClasses[size],
                variantClasses(),
                isActive && variant === "pills" && "bg-[var(--luminx-primary)]",
                isActive && classNames?.tabActive,
                disabled && "opacity-60 cursor-not-allowed pointer-events-none",
                grow && "flex-grow justify-center",
                classNames?.tab,
                className
            )}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            {leftSection && (
                <span
                    className={cx(
                        theme === "light"
                            ? "text-[var(--luminx-light-section)]"
                            : "text-[var(--luminx-dark-section)]",
                        isActive && theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]",
                        classNames?.tabIcon
                    )}
                >
                    {leftSection}
                </span>
            )}

            <div className="flex flex-col">
                <span
                    className={cx(
                        "font-medium",
                        isActive
                            ? theme === "light"
                                ? "text-[var(--luminx-light-text)]"
                                : "text-[var(--luminx-dark-text)]"
                            : theme === "light"
                            ? "text-[var(--luminx-light-hint)]"
                            : "text-[var(--luminx-dark-hint)]",
                        classNames?.tabLabel
                    )}
                >
                    {label}
                </span>

                {description && (
                    <span
                        className={cx(
                            "text-xs",
                            theme === "light"
                                ? "text-[var(--luminx-light-hint)]"
                                : "text-[var(--luminx-dark-hint)]",
                            classNames?.tabDescription
                        )}
                    >
                        {description}
                    </span>
                )}
            </div>

            {rightSection && (
                <span
                    className={cx(
                        theme === "light"
                            ? "text-[var(--luminx-light-section)]"
                            : "text-[var(--luminx-dark-section)]",
                        isActive && theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]",
                        classNames?.tabRightSection
                    )}
                >
                    {rightSection}
                </span>
            )}
        </div>
    );
};

TabsTab.displayName = "@luminx/core/Tabs.Tab";
