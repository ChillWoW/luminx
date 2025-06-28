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

    const getVariantStyles = () => {
        const baseHover =
            theme === "light"
                ? "hover:bg-[var(--luminx-light-background-hover)]"
                : "hover:bg-[var(--luminx-dark-background-hover)]";

        switch (variant) {
            case "segmented":
                return [
                    "rounded-md font-medium transition-all duration-200",
                    !isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]",
                        baseHover
                    ],
                    isActive && [
                        theme === "light"
                            ? "bg-white text-[var(--luminx-light-text)] shadow-sm"
                            : "bg-[var(--luminx-dark-background-hover)] text-[var(--luminx-dark-text)] shadow-sm"
                    ]
                ];
            case "pills":
                return [
                    "rounded-full font-medium transition-all duration-200",
                    !isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]",
                        baseHover
                    ],
                    isActive && [
                        "bg-[var(--luminx-primary)] text-white shadow-sm"
                    ]
                ];
            case "underline":
                return [
                    "font-medium transition-all duration-200 border-b-2 border-transparent",
                    !isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]",
                        baseHover
                    ],
                    isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]"
                    ]
                ];
            default:
                return [
                    "transition-all duration-200",
                    !isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-hint)] hover:text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-hint)] hover:text-[var(--luminx-dark-text)]",
                        baseHover
                    ],
                    isActive && [
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]"
                    ]
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
                "flex items-center gap-2 cursor-pointer select-none",
                orientation === "horizontal" && variant === "default"
                    ? "rounded-t-md"
                    : "",
                orientation === "vertical" && variant === "default"
                    ? "rounded-l-md"
                    : "",
                sizeClasses[size],
                getVariantStyles(),
                disabled && "opacity-60 cursor-not-allowed pointer-events-none",
                grow && "flex-grow justify-center",
                isActive && classNames?.tabActive,
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
                        "transition-colors duration-200",
                        !isActive && [
                            theme === "light"
                                ? "text-[var(--luminx-light-section)]"
                                : "text-[var(--luminx-dark-section)]"
                        ],
                        isActive && [
                            variant === "pills"
                                ? "text-white"
                                : theme === "light"
                                ? "text-[var(--luminx-primary)]"
                                : "text-[var(--luminx-primary)]"
                        ],
                        classNames?.tabIcon
                    )}
                >
                    {leftSection}
                </span>
            )}

            <div className="flex flex-col min-w-0">
                <span
                    className={cx(
                        "font-medium transition-colors duration-200 truncate",
                        classNames?.tabLabel
                    )}
                >
                    {label}
                </span>

                {description && (
                    <span
                        className={cx(
                            "text-xs transition-colors duration-200 truncate",
                            !isActive && [
                                theme === "light"
                                    ? "text-[var(--luminx-light-hint)]"
                                    : "text-[var(--luminx-dark-hint)]"
                            ],
                            isActive && [
                                variant === "pills"
                                    ? "text-white opacity-90"
                                    : theme === "light"
                                    ? "text-[var(--luminx-primary)] opacity-80"
                                    : "text-[var(--luminx-primary)] opacity-80"
                            ],
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
                        "transition-colors duration-200",
                        !isActive && [
                            theme === "light"
                                ? "text-[var(--luminx-light-section)]"
                                : "text-[var(--luminx-dark-section)]"
                        ],
                        isActive && [
                            variant === "pills"
                                ? "text-white"
                                : theme === "light"
                                ? "text-[var(--luminx-primary)]"
                                : "text-[var(--luminx-primary)]"
                        ],
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
