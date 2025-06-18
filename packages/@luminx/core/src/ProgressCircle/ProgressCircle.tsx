import { forwardRef } from "react";
import { cx, useTheme } from "../_theme";
import {
    ProgressCircleLabelProps,
    ProgressCircleProps,
    ProgressCircleSectionProps
} from "./types";

export const ProgressCircleRoot = forwardRef<
    HTMLDivElement,
    ProgressCircleProps
>((props, ref) => {
    const {
        size = "md",
        className,
        children,
        thickness = 4,
        ...others
    } = props;

    const { theme, cx } = useTheme();

    const sizeClasses = () => {
        const styles = {
            xs: "w-8 h-8",
            sm: "w-12 h-12",
            md: "w-16 h-16",
            lg: "w-24 h-24",
            xl: "w-32 h-32"
        };

        return styles[size];
    };

    return (
        <div
            ref={ref}
            className={cx(
                "relative inline-flex items-center justify-center",
                sizeClasses(),
                className
            )}
            {...others}
        >
            {children}
        </div>
    );
});

ProgressCircleRoot.displayName = "@luminx/core/ProgressCircle.Root";

export const ProgressCircleSection = forwardRef<
    HTMLDivElement,
    ProgressCircleSectionProps
>((props, ref) => {
    const { value = 0, className, children, color, ...others } = props;

    const { theme } = useTheme();
    const normalizedValue = Math.min(100, Math.max(0, value));
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset =
        circumference - (normalizedValue / 100) * circumference;

    const strokeColor = color || "var(--luminx-primary)";
    const backgroundStroke =
        theme === "light"
            ? "var(--luminx-light-background)"
            : "var(--luminx-dark-background)";

    return (
        <div
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className={cx("absolute inset-0", className)}
            {...others}
        >
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={backgroundStroke}
                    strokeWidth="8"
                    className="opacity-20"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                />
            </svg>
            {children}
        </div>
    );
});

ProgressCircleSection.displayName = "@luminx/core/ProgressCircle.Section";

export const ProgressCircleLabel = forwardRef<
    HTMLDivElement,
    ProgressCircleLabelProps
>((props, ref) => {
    const { className, children, position = "center" } = props;
    const { theme, cx } = useTheme();

    return (
        <div
            ref={ref}
            className={cx(
                "text-sm font-medium whitespace-nowrap",
                position === "center" &&
                    "absolute inset-0 flex items-center justify-center",
                position === "bottom" && "mt-2 text-center",
                theme === "light"
                    ? "text-[var(--luminx-light-text)]"
                    : "text-[var(--luminx-dark-text)]",
                className
            )}
        >
            {children}
        </div>
    );
});

ProgressCircleLabel.displayName = "@luminx/core/ProgressCircle.Label";

const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
    (props, ref) => {
        const { label, labelPosition = "center", color, ...others } = props;

        return (
            <div
                className={
                    labelPosition === "bottom"
                        ? "flex flex-col items-center"
                        : "relative"
                }
            >
                <ProgressCircleRoot {...others} ref={ref}>
                    <ProgressCircleSection
                        value={props.value ?? 0}
                        color={color}
                    >
                        {label && labelPosition === "center" && (
                            <ProgressCircleLabel position={labelPosition}>
                                {label}
                            </ProgressCircleLabel>
                        )}
                    </ProgressCircleSection>
                </ProgressCircleRoot>
                {label && labelPosition === "bottom" && (
                    <ProgressCircleLabel position={labelPosition}>
                        {label}
                    </ProgressCircleLabel>
                )}
            </div>
        );
    }
);

ProgressCircle.displayName = "@luminx/core/ProgressCircle";

const ExtendedProgressCircle = Object.assign(ProgressCircle, {
    Root: ProgressCircleRoot,
    Section: ProgressCircleSection,
    Label: ProgressCircleLabel
});

export { ExtendedProgressCircle as ProgressCircle };
