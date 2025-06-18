import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { ButtonGroupProps, ButtonProps } from "./types";
import { useTheme } from "../_theme";

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
    (
        {
            children,
            orientation = "horizontal",
            variant = "filled",
            size = "md",
            disabled = false,
            withSeparator = true,
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const isVertical = orientation === "vertical";

        const childrenArray = Children.toArray(children).filter(Boolean);

        const enhancedChildren = childrenArray.map((child, index) => {
            if (!isValidElement<ButtonProps>(child)) return child;

            const isFirst = index === 0;
            const isLast = index === childrenArray.length - 1;
            const isMiddle = !isFirst && !isLast;

            const borderRadius = isVertical
                ? cx(
                      isFirst && "rounded-t-md rounded-b-none",
                      isLast && "rounded-b-md rounded-t-none",
                      isMiddle && "rounded-none"
                  )
                : cx(
                      isFirst && "rounded-l-md rounded-r-none",
                      isLast && "rounded-r-md rounded-l-none",
                      isMiddle && "rounded-none"
                  );

            const borderClasses = isVertical
                ? cx(!isLast && withSeparator && "border-b", "relative")
                : cx(!isLast && withSeparator && "border-r", "relative");

            return cloneElement(child, {
                variant,
                size,
                disabled,
                className: cx(
                    theme === "light"
                        ? "border-[var(--luminx-light-border)]"
                        : "border-[var(--luminx-dark-border)]",
                    borderRadius,
                    borderClasses,
                    child.props.className
                )
            });
        });

        return (
            <div
                ref={ref}
                className={cx(
                    "inline-flex",
                    isVertical ? "flex-col" : "flex-row",
                    className
                )}
                {...props}
            >
                {enhancedChildren}
            </div>
        );
    }
);

ButtonGroup.displayName = "@luminx/core/Button.Group";
