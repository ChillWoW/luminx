import React, { useRef, useEffect } from "react";
import { cn } from "../_utils";
import { useTabs } from "./context";
import { TabsTabProps } from "./types";
import "../style.css";

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
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-4 text-lg"
    };

    const variantClasses = {
        default: "hover:bg-[var(--lumin-secondary)]",
        outline: "border border-transparent hover:border-[var(--lumin-border)]",
        pills: "rounded-md hover:bg-[var(--lumin-secondary)]"
    };

    return (
        <div
            ref={tabRef}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cn(
                "flex items-center gap-2 cursor-pointer transition-all duration-200",
                orientation === "horizontal" ? "rounded-t-md" : "rounded-l-md",
                sizeClasses[size],
                variantClasses[variant],
                isActive &&
                    variant === "pills" &&
                    "bg-[var(--lumin-secondary)]",
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
                    className={cn(
                        "text-[var(--lumin-hint)]",
                        isActive && "text-[var(--lumin-text)]",
                        classNames?.tabIcon
                    )}
                >
                    {leftSection}
                </span>
            )}

            <div className="flex flex-col">
                <span
                    className={cn(
                        "font-medium",
                        isActive
                            ? "text-[var(--lumin-text)]"
                            : "text-[var(--lumin-hint)]",
                        classNames?.tabLabel
                    )}
                >
                    {label}
                </span>

                {description && (
                    <span
                        className={cn(
                            "text-xs text-[var(--lumin-hint)]",
                            classNames?.tabDescription
                        )}
                    >
                        {description}
                    </span>
                )}
            </div>

            {rightSection && (
                <span className={classNames?.tabRightSection}>
                    {rightSection}
                </span>
            )}
        </div>
    );
};

TabsTab.displayName = "TabsTab";
