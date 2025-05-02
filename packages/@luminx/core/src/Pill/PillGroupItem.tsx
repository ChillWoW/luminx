import { usePillGroupContext } from "./context";
import { Pill } from "./Pill";
import { PillProps } from "./types";
import "../style.css";

export const PillGroupItem = ({ ...props }: PillProps) => {
    const { size, withRemoveButton, disabled, onRemove, radius, shadow } =
        usePillGroupContext();

    return (
        <Pill
            size={size}
            withRemoveButton={withRemoveButton}
            disabled={disabled}
            onRemove={onRemove}
            radius={radius}
            shadow={shadow}
            {...props}
        />
    );
};

PillGroupItem.displayName = "@luminx/core/PillGroup.Item";
