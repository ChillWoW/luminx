import { MenuTargetProps } from "./types";
import { useMenu } from "./context";
import {
    cloneElement,
    isValidElement,
    MouseEvent,
    useEffect,
    useRef
} from "react";

export const MenuTarget = ({ children }: MenuTargetProps) => {
    const {
        setTargetElement,
        toggle,
        opened,
        targetId,
        dropdownId,
        trigger,
        setOpened
    } = useMenu();
    const ref = useRef<HTMLElement>(null);

    if (!isValidElement(children)) {
        throw new Error(
            "Menu.Target requires a valid React element as its child"
        );
    }

    useEffect(() => {
        setTargetElement(ref.current);
    }, [setTargetElement]);

    const handleMouseEnter = (event: MouseEvent) => {
        const props = children.props as any;

        props.onMouseEnter?.(event);
        if (trigger === "hover" || trigger === "click-hover") {
            setOpened(true);
        }
    };

    const handleMouseLeave = (event: MouseEvent) => {
        const props = children.props as any;

        props.onMouseLeave?.(event);
        if (trigger === "hover" || trigger === "click-hover") {
            setOpened(false);
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        const props = children.props as any;

        props.onClick?.(event);
        if (trigger === "click" || trigger === "click-hover") {
            toggle();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const props = children.props as any;

        props.onKeyDown?.(event);
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
        }
    };

    const targetProps: {
        ref: React.RefObject<HTMLElement>;
        id: string;
        "aria-haspopup": "menu";
        "aria-expanded": boolean;
        "aria-controls": string;
        onClick: (event: React.MouseEvent) => void;
        onKeyDown: (event: React.KeyboardEvent) => void;
        onMouseEnter?: (event: React.MouseEvent) => void;
        onMouseLeave?: (event: React.MouseEvent) => void;
    } = {
        ref: ref as React.RefObject<HTMLElement>,
        id: targetId,
        "aria-haspopup": "menu",
        "aria-expanded": Boolean(opened),
        "aria-controls": dropdownId,
        onClick: handleClick,
        onKeyDown: handleKeyDown
    };

    if (trigger === "hover" || trigger === "click-hover") {
        targetProps.onMouseEnter = handleMouseEnter;
        targetProps.onMouseLeave = handleMouseLeave;
    }

    return cloneElement(children, targetProps);
};

MenuTarget.displayName = "Menu.Target";
