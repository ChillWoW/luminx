import React, { forwardRef, useMemo } from "react";
import { RingProgressProps, RingProgressSection } from "./types";
import { cn } from "../_utils";

export const RingProgress = forwardRef<HTMLDivElement, RingProgressProps>(
    (props, ref) => {
        const {
            size = 120,
            thickness = 12,
            sections,
            label,
            roundCaps = false,
            rootColor = "var(--lumin-background)",
            transitionDuration = 0,
            className,
            style,
            children,
            ...others
        } = props;

        const getSize = useMemo(() => {
            if (typeof size === "number") {
                return size;
            }

            switch (size) {
                case "xs":
                    return 80;
                case "sm":
                    return 100;
                case "md":
                    return 120;
                case "lg":
                    return 140;
                case "xl":
                    return 160;
                default:
                    return 120;
            }
        }, [size]);

        const totalValue = sections.reduce(
            (acc, section) => acc + section.value,
            0
        );

        const normalizedSections =
            totalValue <= 100
                ? sections
                : sections.map((section) => ({
                      ...section,
                      value: (section.value / totalValue) * 100
                  }));

        const radius = (getSize - thickness) / 2;
        const circumference = 2 * Math.PI * radius;
        const center = getSize / 2;

        let currentOffset = 0;

        const sectionElements = normalizedSections.map((section, index) => {
            const {
                value,
                color = "var(--lumin-primary)",
                tooltip,
                ...sectionProps
            } = section;
            const strokeDasharray = (value * circumference) / 100;
            const rotationAngle = (currentOffset * 360) / 100 - 90;

            currentOffset += value;

            return (
                <circle
                    key={index}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeDasharray={`${strokeDasharray} ${
                        circumference - strokeDasharray
                    }`}
                    strokeLinecap={roundCaps ? "round" : "butt"}
                    transform={`rotate(${rotationAngle} ${center} ${center})`}
                    style={{
                        transition: transitionDuration
                            ? `stroke-dasharray ${transitionDuration}ms ease`
                            : undefined
                    }}
                    {...sectionProps}
                />
            );
        });

        return (
            <div
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center",
                    className
                )}
                style={{ width: getSize, height: getSize, ...style }}
                {...others}
            >
                <svg
                    width={getSize}
                    height={getSize}
                    viewBox={`0 0 ${getSize} ${getSize}`}
                    className="transform"
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke={rootColor}
                        strokeWidth={thickness}
                    />
                    {sectionElements}
                </svg>

                {label && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {label}
                    </div>
                )}

                {children}
            </div>
        );
    }
);

RingProgress.displayName = "RingProgress";
