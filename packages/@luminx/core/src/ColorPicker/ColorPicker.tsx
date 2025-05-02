import { forwardRef, Ref, useEffect, useState } from "react";
import { ColorPickerProps, HSVColor } from "./types";
import { cx } from "../_theme";
import { formatColor, hsvToRgb, parseColor, rgbToHex } from "./utils";
import { ColorSwatch } from "../ColorSwatch";
import { Saturation } from "./Saturation/index";
import { HueSlider } from "./HueSlider/index";
import { AlphaSlider } from "./AlphaSlider/index";

const ColorPickerBase = (props: ColorPickerProps, ref: Ref<HTMLDivElement>) => {
    const {
        value,
        defaultValue = "#ffffff",
        onChange,
        format = "hex",
        fullWidth,
        showColorPreview,
        withPicker = true,
        swatches,
        className,
        classNames,
        ...rest
    } = props;

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

    const previewColor = formatColor(color, format);
    const rgbColor = hsvToRgb(color);
    const hexColor = rgbToHex(rgbColor, false);

    const renderSwatch = (swatch: string, index: number) => {
        return (
            <ColorSwatch
                key={`${swatch}-${index}`}
                color={swatch}
                onClick={() => handleSwatchClick(swatch)}
                className={cx("cursor-pointer", classNames?.swatch)}
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
                            <div className="flex items-center w-full flex-col gap-2">
                                <HueSlider
                                    value={color.h}
                                    onChange={handleHueChange}
                                    className={cx(
                                        "w-full",
                                        classNames?.hueSlider
                                    )}
                                />

                                {useAlpha && (
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

                            {showColorPreview && (
                                <div
                                    className={cx(
                                        "w-10 h-8 rounded-md relative overflow-hidden",
                                        classNames?.colorPreview
                                    )}
                                >
                                    <div
                                        className="absolute inset-0 bg-[length:8px_8px] bg-white"
                                        style={{
                                            backgroundImage: `
                                linear-gradient(45deg, #ccc 25%, transparent 25%),
                                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                                linear-gradient(45deg, transparent 75%, #ccc 75%),
                                linear-gradient(-45deg, transparent 75%, #ccc 75%)
                                `,
                                            backgroundSize: "8px 8px",
                                            backgroundPosition:
                                                "0 0, 0 4px, 4px -4px, -4px 0px"
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundColor: previewColor
                                        }}
                                    />
                                </div>
                            )}
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
