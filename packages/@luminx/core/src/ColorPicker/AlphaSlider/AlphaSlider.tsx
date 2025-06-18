import { useEffect, useState } from "react";
import { useRef } from "react";
import { AlphaSliderProps } from "./types";
import { cx } from "../../_theme";

export const AlphaSlider = ({
    value,
    onChange,
    color,
    className,
    ...rest
}: AlphaSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

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

    const transparencyGridStyle = {
        backgroundImage: `
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)
        `,
        backgroundSize: "8px 8px",
        backgroundPosition: "0 0, 4px 4px",
        backgroundColor: "#ffffff"
    };

    return (
        <div
            ref={sliderRef}
            className={cx(
                "relative h-4 rounded-md cursor-pointer overflow-hidden",
                className
            )}
            style={transparencyGridStyle}
            onMouseDown={handleMouseDown}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to right, transparent, ${color})`
                }}
            />
            <div
                className="absolute rounded-full shadow-lg w-3 h-3 ring-2 ring-[var(--luminx-white)] shadow-sm"
                style={{
                    left: `min(max(8px, ${value * 100}%), calc(100% - 8px))`,
                    transform: "translateX(-50%)",
                    top: "50%",
                    marginTop: "-6px"
                }}
            />
        </div>
    );
};
