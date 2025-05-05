import { cx } from "../_theme";
import { AnchorProps } from "./types";

export const Anchor = ({
    children,
    underline = "hover",
    className,
    ...props
}: AnchorProps) => {
    return (
        <a
            className={cx(
                "text-[var(--lumin-primary)]",
                underline === "always" && "underline",
                underline === "hover" && "hover:underline",
                underline === "never" && "no-underline",
                className
            )}
            {...props}
        >
            {children}
        </a>
    );
};

Anchor.displayName = "@luminx/core/Anchor";
