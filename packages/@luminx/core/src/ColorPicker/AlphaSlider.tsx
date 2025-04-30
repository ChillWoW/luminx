// src/ui/ColorPicker/AlphaSlider.tsx
import React, { useRef, useEffect, useState } from "react";
import { AlphaSliderProps } from "./types";

export const AlphaSlider = ({
    value,
    onChange,
    color,
    size = "md",
    className,
    thumbSize,
    label = "Alpha",
    ...rest
}: AlphaSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getThumbSize = () => {
        if (thumbSize) return thumbSize;

        const sizes = {
            xs: 8,
            sm: 12,
            md: 16,
            lg: 20,
            xl: 24
        };

        return sizes[size];
    };

    const getPosition = (clientX: number) => {
        if (!sliderRef.current) return 0;

        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const left = clientX - rect.left;

        let position = Math.max(0, Math.min(left, width));
        return parseFloat((position / width).toFixed(2));
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        onChange(getPosition(e.clientX));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            onChange(Math.min(value + 0.01, 1));
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            onChange(Math.max(value - 0.01, 0));
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                onChange(getPosition(e.clientX));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, onChange]);

    const gradientBackground = `linear-gradient(to right, transparent, ${color})`;

    return (
        <div
            ref={sliderRef}
            className={`lumin-alpha-slider lumin-alpha-slider-${size} ${
                className || ""
            }`}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label={label}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={1}
            {...rest}
        >
            <div className="lumin-alpha-slider-checkerboard" />
            <div
                className="lumin-alpha-slider-overlay"
                style={{ background: gradientBackground }}
            />
            <div
                className="lumin-alpha-slider-thumb"
                style={{
                    left: `${value * 100}%`,
                    width: getThumbSize(),
                    height: getThumbSize()
                }}
            />
        </div>
    );
};
