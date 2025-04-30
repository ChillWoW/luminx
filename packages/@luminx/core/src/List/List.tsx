import React, { createContext, useContext } from "react";
import { cn } from "../_utils";
import { ListProps, ListItemProps, ListContextValue } from "./types";
import { ListContext } from "./context";
import { ListItem } from "./ListItem";

export function List({
    children,
    type = "unordered",
    listStyleType = type === "ordered" ? "decimal" : "disc",
    size = "md",
    icon = null,
    spacing = 0,
    center = false,
    withPadding = false,
    className,
    ...others
}: ListProps) {
    const Component = type === "ordered" ? "ol" : "ul";

    let spacingValue: string;
    if (typeof spacing === "number") {
        spacingValue = `${spacing}px`;
    } else {
        switch (spacing) {
            case "xs":
                spacingValue = "0.25rem";
                break;
            case "sm":
                spacingValue = "0.5rem";
                break;
            case "md":
                spacingValue = "0.75rem";
                break;
            case "lg":
                spacingValue = "1rem";
                break;
            case "xl":
                spacingValue = "1.5rem";
                break;
            default:
                spacingValue = spacing;
        }
    }

    const classes = cn(
        icon ? "list-none" : `list-${listStyleType}`,
        withPadding && "pl-6",
        className
    );

    const itemStyle = spacing ? { marginTop: spacingValue } : undefined;

    const contextValue: ListContextValue = {
        spacing,
        center,
        icon,
        size
    };

    return (
        <ListContext.Provider value={contextValue}>
            <Component className={classes} {...others}>
                {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) return child;

                    const style = index === 0 ? {} : itemStyle;

                    return React.cloneElement(child, {
                        ...(child.props as any),
                        style: { ...style, ...(child.props as any).style }
                    });
                })}
            </Component>
        </ListContext.Provider>
    );
}

List.Item = ListItem;
List.displayName = "List";
