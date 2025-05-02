import React from "react";
import { cx } from "../_theme";
import { ListProps, ListContextValue } from "./types";
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
    withPadding = true,
    className,
    ...others
}: ListProps) {
    const Component = type === "ordered" ? "ol" : "ul";

    let spacingClass = "";
    if (typeof spacing === "number") {
        if (spacing === 0) {
            spacingClass = "space-y-0";
        } else if (spacing <= 1) {
            spacingClass = "space-y-px";
        } else if (spacing <= 4) {
            spacingClass = "space-y-1";
        } else if (spacing <= 8) {
            spacingClass = "space-y-2";
        } else if (spacing <= 12) {
            spacingClass = "space-y-3";
        } else if (spacing <= 16) {
            spacingClass = "space-y-4";
        } else if (spacing <= 24) {
            spacingClass = "space-y-6";
        } else {
            spacingClass = "space-y-8";
        }
    } else {
        switch (spacing) {
            case "xs":
                spacingClass = "space-y-1";
                break;
            case "sm":
                spacingClass = "space-y-2";
                break;
            case "md":
                spacingClass = "space-y-3";
                break;
            case "lg":
                spacingClass = "space-y-4";
                break;
            case "xl":
                spacingClass = "space-y-6";
                break;
            default:
                spacingClass = "";
        }
    }

    let listStyleClass = "";
    if (icon) {
        listStyleClass = "list-none";
    } else {
        switch (listStyleType) {
            case "disc":
                listStyleClass = "list-disc";
                break;
            case "circle":
                listStyleClass = "list-[circle]";
                break;
            case "square":
                listStyleClass = "list-[square]";
                break;
            case "decimal":
                listStyleClass = "list-decimal";
                break;
            case "none":
                listStyleClass = "list-none";
                break;
            default:
                listStyleClass = `list-[${listStyleType}]`;
        }
    }

    const classes = cx(
        listStyleClass,
        spacingClass,
        withPadding && "pl-6",
        className
    );

    const contextValue: ListContextValue = {
        spacing,
        center,
        icon,
        size
    };

    return (
        <ListContext.Provider value={contextValue}>
            <Component className={classes} {...others}>
                {children}
            </Component>
        </ListContext.Provider>
    );
}

List.Item = ListItem;
List.displayName = "@luminx/core/List";
