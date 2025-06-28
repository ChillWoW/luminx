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

    const { value: activeValue, withBorder, classNames, variant } = useTabs();
    const isActive = activeValue === value;

    if (!isActive && !keepMounted) {
        return null;
    }

    const getPanelStyles = () => {
        switch (variant) {
            case "segmented":
            case "pills":
                return "p-4 mt-4";
            case "underline":
                return "p-4 pt-6";
            default:
                return cx(
                    "p-4",
                    withBorder && "border-t-0",
                    theme === "light"
                        ? "border-[var(--luminx-light-border)]"
                        : "border-[var(--luminx-dark-border)]"
                );
        }
    };

    return (
        <div
            role="tabpanel"
            aria-hidden={!isActive}
            className={cx(
                "transition-opacity duration-200",
                getPanelStyles(),
                !isActive && "hidden",
                isActive && "animate-in fade-in-0 duration-200",
                classNames?.panel,
                className
            )}
        >
            {children}
        </div>
    );
};

TabsPanel.displayName = "@luminx/core/Tabs.Panel";
