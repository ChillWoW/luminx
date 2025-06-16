import { forwardRef } from "react";
import { cx, useTheme } from "../_theme";
import {
    ProgressLabelProps,
    ProgressProps,
    ProgressSectionProps
} from "./types";
import "./Progress.css";

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressProps>(
    (props, ref) => {
        const { size = "md", className, children, ...others } = props;

        const { theme, cx } = useTheme();

        const sizeClasses = () => {
            const styles = {
                xs: "h-1",
                sm: "h-2",
                md: "h-4",
                lg: "h-6",
                xl: "h-8"
            };

            return styles[size];
        };

        return (
            <div
                ref={ref}
                className={cx(
                    "relative w-full overflow-hidden rounded-md",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    sizeClasses(),
                    className
                )}
                {...others}
            >
                <div className="flex absolute top-0 left-0 w-full h-full">
                    {children}
                </div>
            </div>
        );
    }
);

ProgressRoot.displayName = "@luminx/core/Progress.Root";

export const ProgressSection = forwardRef<HTMLDivElement, ProgressSectionProps>(
    (props, ref) => {
        const {
            value = 0,
            className,
            children,
            striped,
            animated,
            ...others
        } = props;

        const style = {
            width: `${Math.min(100, Math.max(0, value))}%`,
            transition: "width 200ms ease"
        };

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                className={cx(
                    "h-full relative bg-[var(--luminx-primary)]",
                    striped && "progress-striped",
                    animated && "progress-animated-stripes progress-striped",
                    className
                )}
                style={style}
                {...others}
            >
                {children}
            </div>
        );
    }
);

ProgressSection.displayName = "@luminx/core/Progress.Section";

export const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
    (props, ref) => {
        const { className, children, position = "left" } = props;
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "px-2 absolute top-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap",
                    position === "left" && "left-0",
                    position === "center" && "left-1/2 -translate-x-1/2",
                    position === "right" && "right-0",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)]"
                        : "text-[var(--luminx-dark-text)]",
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

ProgressLabel.displayName = "@luminx/core/Progress.Label";

const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
    const { label, labelPosition, striped, animated, ...others } = props;

    return (
        <ProgressRoot {...others} ref={ref}>
            <ProgressSection
                value={props.value ?? 0}
                striped={striped}
                animated={animated}
            >
                {label && (
                    <ProgressLabel position={labelPosition}>
                        {label}
                    </ProgressLabel>
                )}
            </ProgressSection>
        </ProgressRoot>
    );
});

Progress.displayName = "@luminx/core/Progress";

const ExtendedProgress = Object.assign(Progress, {
    Root: ProgressRoot,
    Section: ProgressSection,
    Label: ProgressLabel
});

export { ExtendedProgress as Progress };
