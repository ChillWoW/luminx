import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input/Input";
import { ColorInputProps } from "./types";
import { ColorSwatch } from "../ColorSwatch/ColorSwatch";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { parseColor } from "../ColorPicker/ColorUtils";

const EyedropperIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L13.84 6.41L3 17.25V21H6.75L17.59 10.16L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63ZM6.23 19H5V17.77L15.11 7.66L16.34 8.89L6.23 19ZM17.59 7.64L16.36 6.41L17.66 5.11L18.89 6.34L17.59 7.64Z"
            fill="currentColor"
        />
    </svg>
);

export const ColorInput = ({
    value = "#ffffff",
    defaultValue = "#ffffff",
    onChange,
    format = "hex",
    hidePreview,
    showEyeDropper,
    colorSwatchProps,
    classNames = {},
    ...props
}: ColorInputProps) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState(value || defaultValue);
    const pickerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value) {
            setCurrentColor(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsPickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleColorChange = (newColor: string) => {
        setCurrentColor(newColor);
        onChange?.(newColor);
    };

    const handleInputChange = (inputValue: string) => {
        try {
            parseColor(inputValue);
            handleColorChange(inputValue);
        } catch (e) {
            setCurrentColor(inputValue);
            onChange?.(inputValue);
        }
    };

    const togglePicker = () => {
        setIsPickerOpen(!isPickerOpen);
    };

    const activateEyedropper = async () => {
        try {
            if ("EyeDropper" in window) {
                // @ts-ignore - EyeDropper API is not yet in TypeScript types
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                handleColorChange(result.sRGBHex);
            } else {
                alert("Eyedropper not supported in this browser");
            }
        } catch (e) {
            console.error("Error using eyedropper:", e);
        }
    };

    const colorSwatch = (
        <ColorSwatch
            color={currentColor}
            size={24}
            className={classNames.colorSwatch}
            {...colorSwatchProps}
        />
    );

    const eyedropperButton = (
        <button
            type="button"
            onClick={activateEyedropper}
            className="w-7 h-[30px] flex items-center justify-center hover:bg-[var(--lumin-secondary)] rounded-md"
            title="Pick color from screen"
        >
            <EyedropperIcon />
        </button>
    );

    return (
        <div className="relative">
            <Input
                type="text"
                value={currentColor}
                onChange={handleInputChange}
                onClick={togglePicker}
                leftSection={hidePreview ? null : colorSwatch}
                rightSection={showEyeDropper ? eyedropperButton : null}
                leftSectionPadding={1}
                rightSectionPadding={1}
                inputRef={inputRef}
                classNames={{
                    ...classNames,
                    leftSection: "ml-1",
                    rightSection: "mr-1"
                }}
                {...props}
            />

            {isPickerOpen && (
                <div
                    ref={pickerRef}
                    className="absolute z-50 mt-1 shadow-lg rounded-md overflow-hidden bg-[var(--lumin-background)] p-2 flex"
                    style={{ minWidth: inputRef.current?.offsetWidth || 200 }}
                >
                    <ColorPicker
                        value={currentColor}
                        onChange={handleColorChange}
                        format={format}
                        size="sm"
                        classNames={{
                            wrapper: "w-full"
                        }}
                    />
                </div>
            )}
        </div>
    );
};
