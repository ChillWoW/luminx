import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { cx } from "../_theme";

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
    const style: React.CSSProperties = {
        ["--avatar-group-margin-offset" as any]: `${spacing}px`
    };

    return (
        <div className={cx("flex items-center", className)} style={style}>
            {Children.map(children, (child, index) => {
                if (isValidElement(child)) {
                    const element = child as ReactElement<{
                        className?: string;
                    }>;

                    return cloneElement(element, {
                        className: cx(
                            index !== 0
                                ? "ml-[var(--avatar-group-margin-offset)]"
                                : "",
                            element.props.className
                        )
                    });
                }
                return child;
            })}
        </div>
    );
};
