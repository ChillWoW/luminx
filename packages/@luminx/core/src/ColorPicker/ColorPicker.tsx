// src/ui/ColorPicker/ColorPicker.tsx
import React, { useState, useEffect } from "react";
import { ColorPickerProps } from "./types";
import { HueSlider } from "./HueSlider";
import { AlphaSlider } from "./AlphaSlider";
import { Saturation } from "./Saturation";
import {
    HSVColor,
    parseColor,
    formatColor,
    hsvToRgb,
    rgbToHex
} from "./ColorUtils";
import "./ColorPicker.css";
import { Tooltip } from "../Tooltip";

export const ColorPicker = ({
    value,
    defaultValue = "#ffffff",
    onChange,
    format = "hex",
    size = "md",
    fullWidth = false,
    swatches,
    swatchesPerRow = 7,
    swatchesTooltip = false,
    withPicker = true,
    saturationLabel = "Saturation",
    hueLabel = "Hue",
    alphaLabel = "Alpha",
    className,
    classNames = {},
    ...rest
}: ColorPickerProps) => {
    const [color, setColor] = useState<HSVColor>(() => {
        try {
            return parseColor(value || defaultValue);
        } catch (e) {
            return parseColor("#ffffff");
        }
    });

    const supportsAlpha = ["hexa", "rgba", "hsla", "hsva"].includes(format);

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

    const getContainerClass = () => {
        const classes = [
            "lumin-color-picker",
            `lumin-color-picker-${size}`,
            classNames.wrapper || "",
            className || ""
        ];

        if (fullWidth) {
            classes.push("lumin-color-picker-fullwidth");
        }

        return classes.filter(Boolean).join(" ");
    };

    const previewColor = formatColor(color, format);
    const rgbColor = hsvToRgb(color);
    const hexColor = rgbToHex(rgbColor, false);

    const renderSwatch = (swatch: string, index: number) => {
        return (
            <button
                key={`${swatch}-${index}`}
                className={`lumin-color-swatch ${classNames.swatch || ""}`}
                style={{ backgroundColor: swatch }}
                onClick={() => handleSwatchClick(swatch)}
                aria-label={`Color swatch: ${swatch}`}
                type="button"
            />
        );
    };

    return (
        <div className={getContainerClass()} {...rest}>
            {withPicker && (
                <div
                    className={`lumin-color-picker-body ${
                        classNames.body || ""
                    }`}
                >
                    <Saturation
                        value={color}
                        onChange={handleSaturationChange}
                        color={hexColor}
                        size={size}
                        className={classNames.saturation}
                        label={saturationLabel}
                    />

                    <div
                        className={`lumin-color-picker-sliders ${
                            classNames.sliders || ""
                        }`}
                    >
                        <HueSlider
                            value={color.h}
                            onChange={handleHueChange}
                            size={size}
                            className={classNames.slider}
                            label={hueLabel}
                        />

                        {supportsAlpha && (
                            <AlphaSlider
                                value={color.a}
                                onChange={handleAlphaChange}
                                color={hexColor}
                                size={size}
                                className={classNames.slider}
                                label={alphaLabel}
                            />
                        )}

                        {supportsAlpha && (
                            <div
                                className={`lumin-color-preview ${
                                    classNames.preview || ""
                                }`}
                            >
                                <div className="lumin-color-preview-checker" />
                                <div
                                    className="lumin-color-preview-color"
                                    style={{ backgroundColor: previewColor }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {swatches && swatches.length > 0 && (
                <div
                    className={`lumin-color-swatches ${
                        classNames.swatches || ""
                    }`}
                    style={{
                        gridTemplateColumns: `repeat(${swatchesPerRow}, 1fr)`
                    }}
                >
                    {swatches.map((swatch, index) =>
                        swatchesTooltip ? (
                            <Tooltip label={swatch} key={index}>
                                {renderSwatch(swatch, index)}
                            </Tooltip>
                        ) : (
                            renderSwatch(swatch, index)
                        )
                    )}
                </div>
            )}
        </div>
    );
};
