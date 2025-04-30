import { cn } from "../_utils";
import { PillGroupContext } from "./context";
import { PillGroupProps } from "./types";
import { PillGroupItem } from "./PillGroupItem";

export const PillGroup = ({
    size = "md",
    withRemoveButton = false,
    onRemove,
    disabled,
    children,
    className
}: PillGroupProps) => {
    return (
        <PillGroupContext.Provider
            value={{ size, withRemoveButton, disabled, onRemove }}
        >
            <div className={cn("flex flex-wrap gap-1", className)}>
                {children}
            </div>
        </PillGroupContext.Provider>
    );
};

PillGroup.Item = PillGroupItem;

PillGroup.displayName = "PillGroup";
