import { useTheme } from "../_theme";
import { useMenu } from "./context";
import { MenuLabelProps } from "./types";

const getPosition = (position: MenuLabelProps["position"]) => {
    switch (position) {
        case "right":
            return "text-right";
        case "center":
            return "text-center";
        default:
            return "text-left";
    }
};

export const MenuLabel = ({
    children,
    className,
    position = "left"
}: MenuLabelProps) => {
    const { theme, cx } = useTheme();
    const { classNames } = useMenu();

    return (
        <div
            className={cx(
                "text-xs font-semibold px-3 pt-2",
                theme === "light"
                    ? "text-[var(--luminx-light-hint)]"
                    : "text-[var(--luminx-dark-hint)]",
                getPosition(position),
                className,
                classNames?.label
            )}
        >
            {children}
        </div>
    );
};

MenuLabel.displayName = "@luminx/core/Menu.Label";
