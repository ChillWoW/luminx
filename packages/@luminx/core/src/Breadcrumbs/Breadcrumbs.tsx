import React, {
    forwardRef,
    Children,
    cloneElement,
    isValidElement
} from "react";
import { useTheme } from "../_theme";
import { BreadcrumbsProps, BreadcrumbItemProps } from "./types";
import { Anchor } from "../Anchor";

const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
    ({ children, href, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        if (href) {
            return (
                <Anchor
                    ref={ref as React.RefObject<HTMLAnchorElement>}
                    href={href}
                    className={className}
                    {...props}
                >
                    {children}
                </Anchor>
            );
        }

        return (
            <span
                ref={ref as React.RefObject<HTMLSpanElement>}
                className={cx(
                    theme === "light"
                        ? "text-[var(--luminx-light-text)]"
                        : "text-[var(--luminx-dark-text)]",
                    "cursor-default",
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

BreadcrumbItem.displayName = "@luminx/core/BreadcrumbItem";

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
    ({ children, separator = "/", className, ...props }, ref) => {
        const { cx } = useTheme();

        const childrenArray = Children.toArray(children);
        const validChildren = childrenArray.filter(isValidElement);

        return (
            <nav
                ref={ref}
                className={cx("flex items-center gap-2 text-sm", className)}
                aria-label="Breadcrumb"
                {...props}
            >
                <ol className="flex items-center gap-2">
                    {validChildren.map((child, index) => {
                        const isLast = index === validChildren.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-2">
                                {cloneElement(child, {
                                    ...(isLast && {
                                        "aria-current": "page" as const
                                    })
                                })}
                                {!isLast && (
                                    <span
                                        className="text-[var(--luminx-dark-text)] select-none"
                                        aria-hidden="true"
                                    >
                                        {separator}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        );
    }
);

Breadcrumbs.displayName = "@luminx/core/Breadcrumbs";

const ExtendedBreadcrumbs = Object.assign(Breadcrumbs, {
    Item: BreadcrumbItem
});

export { ExtendedBreadcrumbs as Breadcrumbs, BreadcrumbItem };
