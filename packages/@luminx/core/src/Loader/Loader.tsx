import React from "react";
import "./Loader.css";
import { LoaderProps } from "./types";
import { cn } from "../_utils";

export const Loader = ({
    size = 40,
    color = "white",
    speed = 0.8,
    stroke = 5,
    strokeLength = 0.25,
    bgOpacity = 0.1,
    className,
    variant = "spinner"
}: LoaderProps) => {
    const centerPoint = size / 2;
    const radius = Math.max(0, size / 2 - stroke / 2);
    const dashArray = `${strokeLength * 100} ${100 - strokeLength * 100}`;

    const viewBoxSize = size;
    const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;

    const renderLoader = () => {
        switch (variant) {
            case "spinner":
                return (
                    <svg
                        className="loader-svg"
                        viewBox={viewBox}
                        width={size}
                        height={size}
                        style={
                            { "--speed": `${speed}s` } as React.CSSProperties
                        }
                    >
                        <circle
                            className="loader-track"
                            cx={viewBoxSize / 2}
                            cy={viewBoxSize / 2}
                            r={radius}
                            strokeWidth={stroke}
                            style={{
                                stroke: color,
                                opacity: bgOpacity
                            }}
                        />
                        <circle
                            className="loader-circle"
                            cx={viewBoxSize / 2}
                            cy={viewBoxSize / 2}
                            r={radius}
                            strokeWidth={stroke}
                            strokeDasharray={dashArray}
                            strokeLinecap="round"
                            style={{ stroke: color }}
                        />
                    </svg>
                );
            case "dots":
                return (
                    <div
                        className="loader-dots"
                        style={
                            { "--speed": `${speed}s` } as React.CSSProperties
                        }
                    >
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="loader-dot"
                                style={{
                                    backgroundColor: color,
                                    width: size / 5,
                                    height: size / 5,
                                    animationDelay: `${i * 0.15}s`
                                }}
                            />
                        ))}
                    </div>
                );
            case "pulse":
                return (
                    <div
                        className="loader-pulse"
                        style={
                            {
                                "--speed": `${speed}s`,
                                width: size / 2,
                                height: size / 2,
                                backgroundColor: color
                            } as React.CSSProperties
                        }
                    />
                );
            case "bars":
                return (
                    <div
                        className="loader-bars"
                        style={
                            { "--speed": `${speed}s` } as React.CSSProperties
                        }
                    >
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="loader-bar"
                                style={{
                                    backgroundColor: color,
                                    width: size / 8,
                                    height: size / 2,
                                    animationDelay: `${i * 0.15}s`
                                }}
                            />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={cn("loader-container", className)}
            style={{ width: size, height: size }}
        >
            {renderLoader()}
        </div>
    );
};

Loader.displayName = "Loader";
