import { forwardRef, Ref, useEffect, useState } from "react";
import { ColorPickerProps, HSVColor } from "./types";
import { useTheme } from "../_theme";
import { formatColor, hsvToRgb, parseColor, rgbToHex } from "./utils";
import { ColorSwatch } from "../ColorSwatch";
import { Saturation } from "./Saturation/index";
import { HueSlider } from "./HueSlider/index";
import { AlphaSlider } from "./AlphaSlider/index";
import { IconPencil } from "@tabler/icons-react";

const ColorPickerBase = (props: ColorPickerProps, ref: Ref<HTMLDivElement>) => {
    const {
        value,
        defaultValue = "#ffffff",
        onChange,
        format = "hex",
        fullWidth,
        withPicker = true,
        hideEyeDropper,
        hideAlpha,
        swatches,
        className,
        classNames,
        ...rest
    } = props;
    const { theme, cx } = useTheme();

    const [color, setColor] = useState<HSVColor>(() => {
        try {
            return parseColor(value || defaultValue);
        } catch (e) {
            return parseColor("#ffffff");
        }
    });
    const useAlpha = ["hexa", "rgba", "hsla", "hsva"].includes(format);

    useEffect(() => {
        if (value) {
            try {
                setColor(parseColor(value));
            } catch (e) {
                console.error("Invalid color value:", value);
            }
        }
    }, [value]);

    const handleChange = (newColor: HSVColor) => {
        setColor(newColor);
        onChange?.(formatColor(newColor, format));
    };

    const handleHueChange = (hue: number) => {
        handleChange({ ...color, h: hue });
    };

    const handleAlphaChange = (alpha: number) => {
        handleChange({ ...color, a: alpha });
    };

    const handleSaturationChange = (newColor: HSVColor) => {
        handleChange(newColor);
    };

    const handleSwatchClick = (swatchColor: string) => {
        try {
            const parsed = parseColor(swatchColor);
            setColor(parsed);
            onChange?.(formatColor(parsed, format));
        } catch (e) {
            console.error("Invalid swatch color:", swatchColor);
        }
    };

    const activateEyedropper = async () => {
        try {
            if ("EyeDropper" in window) {
                // @ts-ignore
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                handleChange(parseColor(result.sRGBHex));
            } else {
                alert("Eyedropper not supported in this browser");
            }
        } catch (e) {
            console.error("Error using eyedropper:", e);
        }
    };

    const rgbColor = hsvToRgb(color);
    const hexColor = rgbToHex(rgbColor, false);

    const renderSwatch = (swatch: string, index: number) => {
        return (
            <ColorSwatch
                key={`${swatch}-${index}`}
                color={swatch}
                onClick={() => handleSwatchClick(swatch)}
                className={cx(
                    "cursor-pointer rounded-md hover:scale-110 transition-transform w-5 h-5",
                    classNames?.swatch
                )}
            />
        );
    };

    return (
        <div
            className={cx(
                "w-56",
                fullWidth && "w-full",
                classNames?.root,
                className
            )}
        >
            <div
                className={cx("flex flex-col gap-2", classNames?.body)}
                {...rest}
            >
                {withPicker && (
                    <>
                        <Saturation
                            value={color}
                            onChange={handleSaturationChange}
                            color={hexColor}
                            className={classNames?.saturation}
                        />

                        <div className={cx("flex gap-3", classNames?.sliders)}>
                            {!hideEyeDropper && (
                                <button
                                    type="button"
                                    className={cx(
                                        "flex items-center justify-center rounded-md p-3 min-w-[44px] h-11 transition-all duration-200 border",
                                        theme === "light"
                                            ? "border-[var(--luminx-light-border)] hover:bg-[var(--luminx-light-background-hover)]"
                                            : "border-[var(--luminx-dark-border)] hover:bg-[var(--luminx-dark-background-hover)]"
                                    )}
                                    onClick={activateEyedropper}
                                >
                                    <IconPencil size={20} />
                                </button>
                            )}

                            <div className="flex items-center w-full flex-col gap-2">
                                <HueSlider
                                    value={color.h}
                                    onChange={handleHueChange}
                                    className={cx(
                                        "w-full",
                                        classNames?.hueSlider
                                    )}
                                />

                                {!hideAlpha && (
                                    <AlphaSlider
                                        value={color.a}
                                        onChange={handleAlphaChange}
                                        color={hexColor}
                                        className={cx(
                                            "w-full",
                                            classNames?.alphaSlider
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}

                {swatches && swatches.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {swatches.map(renderSwatch)}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
    (props, ref) => ColorPickerBase(props, ref)
);

ColorPicker.displayName = "@luminx/core/ColorPicker";
