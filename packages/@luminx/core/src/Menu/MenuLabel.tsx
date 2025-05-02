import { cx } from "../_theme";
import { useMenu } from "./context";
import { MenuLabelProps } from "./types";
import "../style.css";

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
    const { classNames } = useMenu();

    return (
        <div
            className={cx(
                "text-xs font-medium text-[var(--lumin-hint)]",
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
