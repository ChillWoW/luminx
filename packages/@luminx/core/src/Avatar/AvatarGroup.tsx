import { cn } from "../_utils";

export interface AvatarGroupProps {
    children: React.ReactNode;
    spacing?: number;
    className?: string;
}

export const AvatarGroup = ({
    children,
    spacing = -8,
    className
}: AvatarGroupProps) => {
    const marginOffset = Math.abs(spacing);

    return (
        <div
            className={cn("flex items-center", className)}
            style={{ marginLeft: marginOffset }}
        >
            {children}
        </div>
    );
};
