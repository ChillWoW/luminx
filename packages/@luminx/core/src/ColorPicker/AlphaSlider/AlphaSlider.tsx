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

    return (
        <div
            ref={sliderRef}
            className={cx(
                "relative h-3 rounded-full cursor-pointer overflow-hidden",
                className
            )}
            style={{
                background: `linear-gradient(to right, transparent, ${color})`
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="absolute bg-[var(--lumin-text)] rounded-full"
                style={{
                    left: `min(max(6px, ${value * 100}%), calc(100% - 6px))`,
                    width: "12px",
                    height: "12px",
                    transform: "translateX(-50%)",
                    top: "50%",
                    marginTop: "-6px",
                    border: "2px solid white",
                    boxSizing: "border-box"
                }}
            />
        </div>
    );
};
