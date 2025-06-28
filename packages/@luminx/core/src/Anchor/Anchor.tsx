import { forwardRef } from "react";
import { cx } from "../_theme";
import { AnchorProps } from "./types";

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
    ({ children, underline = "hover", href, className, ...props }, ref) => {
        const isExternal = typeof href === "string" && href.startsWith("http");

        return (
            <a
                className={cx(
                    "text-[var(--luminx-primary)]",
                    underline === "always" && "underline",
                    underline === "hover" && "hover:underline",
                    underline === "never" && "no-underline",
                    className
                )}
                rel={isExternal ? "noopener noreferrer" : undefined}
                ref={ref}
                href={href}
                {...props}
            >
                {children}
            </a>
        );
    }
);

Anchor.displayName = "@luminx/core/Anchor";
