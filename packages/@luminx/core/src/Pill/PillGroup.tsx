import { cx } from "../_theme";
import { PillGroupContext } from "./context";
import { PillGroupProps } from "./types";
import { PillGroupItem } from "./PillGroupItem";
import "../style.css";

export const PillGroup = ({
    size = "md",
    withRemoveButton = false,
    onRemove,
    disabled,
    children,
    radius,
    shadow,
    className
}: PillGroupProps) => {
    return (
        <PillGroupContext.Provider
            value={{
                size,
                withRemoveButton,
                disabled,
                onRemove,
                radius,
                shadow
            }}
        >
            <div className={cx("flex flex-wrap gap-1", className)}>
                {children}
            </div>
        </PillGroupContext.Provider>
    );
};

PillGroup.Item = PillGroupItem;

PillGroup.displayName = "@luminx/core/PillGroup";
