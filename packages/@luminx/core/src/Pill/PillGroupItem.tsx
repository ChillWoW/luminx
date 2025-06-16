import { usePillGroupContext } from "./context";
import { Pill } from "./Pill";
import { PillProps } from "./types";

export const PillGroupItem = ({ ...props }: PillProps) => {
    const { size, withRemoveButton, disabled, onRemove } =
        usePillGroupContext();

    return (
        <Pill
            size={size}
            withRemoveButton={withRemoveButton}
            disabled={disabled}
            onRemove={onRemove}
            {...props}
        />
    );
};

PillGroupItem.displayName = "@luminx/core/PillGroup.Item";
