import React, { forwardRef } from "react";
import {
    ProgressLabelProps,
    ProgressProps,
    ProgressRootProps,
    ProgressSectionProps
} from "./types";
import { cn } from "../_utils";
import { getRadius } from "../_theme";

const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
    (props, ref) => {
        const {
            size = "sm",
            color = "var(--lumin-background)",
            radius = "md",
            className,
            children,
            ...others
        } = props;

        const actualSize =
            size === "xs"
                ? "h-1"
                : size === "sm"
                ? "h-2"
                : size === "md"
                ? "h-4"
                : size === "lg"
                ? "h-6"
                : size === "xl"
                ? "h-8"
                : typeof size === "number"
                ? `h-[${size}px]`
                : `h-[${size}]`;

        return (
            <div
                ref={ref}
                className={cn(
                    "relative w-full overflow-hidden bg-dark-300",
                    actualSize,
                    className
                )}
                style={{
                    ...getRadius(radius),
                    backgroundColor: color
                }}
                {...others}
            >
                <div className="flex absolute top-0 left-0 w-full h-full">
                    {children}
                </div>
            </div>
        );
    }
);

const ProgressSection = forwardRef<HTMLDivElement, ProgressSectionProps>(
    (props, ref) => {
        const {
            value = 0,
            color = "var(--lumin-primary)",
            className,
            children,
            "aria-label": ariaLabel,
            ...others
        } = props;

        const style = {
            width: `${Math.min(100, Math.max(0, value))}%`,
            transition: "width 200ms ease",
            backgroundColor: color
        };

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                aria-label={ariaLabel}
                className={cn("h-full relative", className)}
                style={style}
                {...others}
            >
                {children}
            </div>
        );
    }
);

const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
    (props, ref) => {
        const { className, children } = props;

        return (
            <div
                ref={ref}
                className={cn(
                    "px-2 absolute left-0 top-1/2 -translate-y-1/2 text-white text-xs font-medium whitespace-nowrap",
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

type ProgressComponentType = React.ForwardRefExoticComponent<
    ProgressProps & React.RefAttributes<HTMLDivElement>
> & {
    Root: typeof ProgressRoot;
    Section: typeof ProgressSection;
    Label: typeof ProgressLabel;
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
    const { value, label, ...others } = props;

    return (
        <ProgressRoot {...others} ref={ref}>
            <ProgressSection value={value}>
                {label && <ProgressLabel>{label}</ProgressLabel>}
            </ProgressSection>
        </ProgressRoot>
    );
}) as ProgressComponentType;

ProgressRoot.displayName = "Progress.Root";
ProgressSection.displayName = "Progress.Section";
ProgressLabel.displayName = "Progress.Label";
Progress.displayName = "Progress";

Progress.Root = ProgressRoot;
Progress.Section = ProgressSection;
Progress.Label = ProgressLabel;

export { Progress, ProgressRoot, ProgressSection, ProgressLabel };
