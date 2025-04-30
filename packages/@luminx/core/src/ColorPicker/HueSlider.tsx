// src/ui/ColorPicker/HueSlider.tsx
import React, { useRef, useEffect, useState } from "react";
import { HueSliderProps } from "./types";

export const HueSlider = ({
    value,
    onChange,
    size = "md",
    className,
    thumbSize,
    label = "Hue",
    ...rest
}: HueSliderProps) => {
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
        return Math.round((position / width) * 360);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        onChange(getPosition(e.clientX));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            onChange(Math.min(value + 1, 360));
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            onChange(Math.max(value - 1, 0));
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

    return (
        <div
            ref={sliderRef}
            className={`lumin-hue-slider lumin-hue-slider-${size} ${
                className || ""
            }`}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label={label}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={360}
            {...rest}
        >
            <div className="lumin-hue-slider-overlay" />
            <div
                className="lumin-hue-slider-thumb"
                style={{
                    left: `${(value / 360) * 100}%`,
                    width: getThumbSize(),
                    height: getThumbSize(),
                    transform: "translateX(-50%)",
                    top: "50%",
                    marginTop: `-${getThumbSize() / 1.8}px`
                }}
            />
        </div>
    );
};
