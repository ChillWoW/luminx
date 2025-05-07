import { MenuTargetProps } from "./types";
import { useMenu } from "./context";
import { cloneElement, isValidElement } from "react";

export const MenuTarget = ({ children }: MenuTargetProps) => {
    const { refs, getReferenceProps, targetId, dropdownId, opened } = useMenu();

    if (!isValidElement(children)) {
        throw new Error(
            "Menu.Target requires a valid React element as its child"
        );
    }

    const targetProps = {
        ref: refs.setReference,
        id: targetId,
        "aria-haspopup": "menu" as const,
        "aria-expanded": Boolean(opened),
        "aria-controls": dropdownId,
        ...getReferenceProps()
    };

    return cloneElement(children, targetProps);
};

MenuTarget.displayName = "@luminx/core/Menu.Target";
