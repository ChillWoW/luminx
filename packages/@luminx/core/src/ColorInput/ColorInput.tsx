import { useState, useRef } from "react";
import { Input } from "../Input/Input";
import { ColorInputProps } from "./types";
import { ColorSwatch } from "../ColorSwatch/ColorSwatch";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { parseColor } from "../ColorPicker/utils";
import { useTheme } from "../_theme";
import { IconPencil } from "@tabler/icons-react";

export const ColorInput = ({
    value = "#ffffff",
    defaultValue = "#ffffff",
    onChange,
    format = "hex",
    hidePreview,
    showEyeDropper,
    colorSwatchProps,
    colorPickerProps,
    withPicker = true,
    classNames = {},
    ...props
}: ColorInputProps) => {
    const { theme, cx } = useTheme();

    const [currentColor, setCurrentColor] = useState(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

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
            radius="full"
            className={classNames.colorSwatch}
            {...colorSwatchProps}
        />
    );

    const eyedropperButton = (
        <button
            type="button"
            onClick={activateEyedropper}
            className="w-7 h-[30px] flex items-center justify-center hover:bg-[var(--luminx-primary-light)] rounded-full"
        >
            <IconPencil size={18} />
        </button>
    );

    return (
        <div className="relative">
            <Input
                type="text"
                value={currentColor}
                onChange={handleInputChange}
                leftSection={hidePreview ? null : colorSwatch}
                rightSection={showEyeDropper ? eyedropperButton : null}
                inputRef={(node) => {
                    inputRef.current = node;
                }}
                {...props}
            />

            {withPicker && (
                <div
                    className={cx(
                        "z-50 shadow-lg rounded-md overflow-hidden p-2 flex",
                        theme === "light"
                            ? "bg-[var(--luminx-light-background)]"
                            : "bg-[var(--luminx-dark-background)]",

                        classNames.colorPicker
                    )}
                >
                    <ColorPicker
                        value={currentColor}
                        onChange={handleColorChange}
                        format={format}
                        fullWidth
                        {...colorPickerProps}
                    />
                </div>
            )}
        </div>
    );
};

ColorInput.displayName = "@luminx/core/ColorInput";
