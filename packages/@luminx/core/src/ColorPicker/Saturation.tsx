// src/ui/ColorPicker/Saturation.tsx
import React, { useRef, useEffect, useState } from "react";
import { SaturationProps } from "./types";

export const Saturation = ({
    value,
    onChange,
    size = "md",
    color,
    className,
    label = "Saturation",
    ...rest
}: SaturationProps) => {
    const saturationRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getPosition = (clientX: number, clientY: number) => {
        if (!saturationRef.current) return { s: 0, v: 0 };

        const rect = saturationRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const x = Math.max(0, Math.min(clientX - rect.left, width));
        const y = Math.max(0, Math.min(clientY - rect.top, height));

        return {
            s: x / width,
            v: 1 - y / height
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);

        const { s, v } = getPosition(e.clientX, e.clientY);
        onChange({ ...value, s, v });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        let newValue = { ...value };

        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                newValue.v = Math.min(newValue.v + 0.01, 1);
                onChange(newValue);
                break;
            case "ArrowDown":
                e.preventDefault();
                newValue.v = Math.max(newValue.v - 0.01, 0);
                onChange(newValue);
                break;
            case "ArrowRight":
                e.preventDefault();
                newValue.s = Math.min(newValue.s + 0.01, 1);
                onChange(newValue);
                break;
            case "ArrowLeft":
                e.preventDefault();
                newValue.s = Math.max(newValue.s - 0.01, 0);
                onChange(newValue);
                break;
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const { s, v } = getPosition(e.clientX, e.clientY);
                onChange({ ...value, s, v });
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
    }, [isDragging, onChange, value]);

    const background = `hsl(${value.h}, 100%, 50%)`;

    return (
        <div
            ref={saturationRef}
            className={`lumin-saturation lumin-saturation-${size} ${
                className || ""
            }`}
            style={{ background }}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label={label}
            {...rest}
        >
            <div className="lumin-saturation-white" />
            <div className="lumin-saturation-black" />
            <div
                className="lumin-saturation-thumb"
                style={{
                    left: `${value.s * 100}%`,
                    top: `${(1 - value.v) * 100}%`
                }}
            />
        </div>
    );
};
