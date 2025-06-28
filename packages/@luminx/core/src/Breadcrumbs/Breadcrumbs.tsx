import React, {
    forwardRef,
    Children,
    cloneElement,
    isValidElement
} from "react";
import { useTheme } from "../_theme";
import { BreadcrumbsProps, BreadcrumbItemProps } from "./types";

const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
    ({ children, href, className, ...props }, ref) => {
        const { cx } = useTheme();

        if (href) {
            return (
                <a
                    ref={ref as React.RefObject<HTMLAnchorElement>}
                    href={href}
                    className={cx(
                        "text-[var(--luminx-primary)] hover:underline transition-colors",
                        className
                    )}
                    {...props}
                >
                    {children}
                </a>
            );
        }

        return (
            <span
                ref={ref as React.RefObject<HTMLSpanElement>}
                className={cx(
                    "text-[var(--luminx-text-secondary)] cursor-default",
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
                                        className="text-[var(--luminx-text-secondary)] select-none"
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
