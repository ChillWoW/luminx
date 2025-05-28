import { useTheme } from "../_theme";
import { useTabs } from "./context";
import { TabsPanelProps } from "./types";

export const TabsPanel = ({
    value,
    children,
    className,
    keepMounted = false
}: TabsPanelProps) => {
    const { theme, cx } = useTheme();

    const { value: activeValue, withBorder, classNames } = useTabs();
    const isActive = activeValue === value;

    if (!isActive && !keepMounted) {
        return null;
    }

    return (
        <div
            role="tabpanel"
            aria-hidden={!isActive}
            className={cx(
                "p-4",
                withBorder && "border-t-0",
                theme === "light"
                    ? "border-[var(--luminx-light-border)]"
                    : "border-[var(--luminx-dark-border)]",
                !isActive && "hidden",
                classNames?.panel,
                className
            )}
        >
            {children}
        </div>
    );
};

TabsPanel.displayName = "@luminx/core/Tabs.Panel";
