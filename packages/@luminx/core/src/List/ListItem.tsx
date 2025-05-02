import { cn } from "../_utils";
import { useListContext } from "./context";
import { ListItemProps } from "./types";

export function ListItem({
    className,
    children,
    icon,
    style,
    ...others
}: ListItemProps) {
    const ctx = useListContext();
    const itemIcon = icon || ctx.icon;

    const classes = cn(
        "relative",
        ctx.center && itemIcon && "flex items-start",
        className
    );

    let sizeClass = "";
    if (typeof ctx.size === "number") {
        sizeClass = `text-[${ctx.size}px]`;
    } else {
        switch (ctx.size) {
            case "xs":
                sizeClass = "text-xs";
                break;
            case "sm":
                sizeClass = "text-sm";
                break;
            case "md":
                sizeClass = "text-base";
                break;
            case "lg":
                sizeClass = "text-lg";
                break;
            case "xl":
                sizeClass = "text-xl";
                break;
            default:
                sizeClass = `text-[${ctx.size}]`;
        }
    }

    return (
        <li className={classes} style={style} {...others}>
            {itemIcon ? (
                <>
                    <span
                        className={cn(
                            "inline-block mr-2",
                            ctx.center ? "mt-0.5" : ""
                        )}
                    >
                        {itemIcon}
                    </span>
                    <span className={cn(sizeClass, "flex-grow")}>
                        {children}
                    </span>
                </>
            ) : (
                <span className={sizeClass}>{children}</span>
            )}
        </li>
    );
}

ListItem.displayName = "@luminx/core/ListItem";
