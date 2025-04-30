import { cn } from "../_utils";
import { AnchorProps } from "./types";

export const Anchor = ({
    children,
    underline = "hover",
    ...props
}: AnchorProps) => {
    return (
        <a
            className={cn(
                "text-[var(--lumin-blue)]",
                underline === "always" && "underline",
                underline === "hover" && "hover:underline",
                underline === "never" && "no-underline"
            )}
            {...props}
        >
            {children}
        </a>
    );
};

Anchor.displayName = "Anchor";
