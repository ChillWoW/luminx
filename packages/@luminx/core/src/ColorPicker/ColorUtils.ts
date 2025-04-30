// src/ui/ColorPicker/ColorUtils.ts
export interface HSVColor {
    h: number;
    s: number;
    v: number;
    a: number;
}

export interface RGBColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface HSLColor {
    h: number;
    s: number;
    l: number;
    a: number;
}

// Convert hex to RGB
export function hexToRgb(hex: string): RGBColor {
    hex = hex.replace(/^#/, "");

    let r,
        g,
        b,
        a = 1;

    if (hex.length === 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 4) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
        a = parseInt(hex.charAt(3) + hex.charAt(3), 16) / 255;
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 8) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = parseInt(hex.substring(6, 8), 16) / 255;
    } else {
        throw new Error("Invalid hex color format");
    }

    return { r, g, b, a };
}

// Convert RGB to hex
export function rgbToHex(rgb: RGBColor, includeAlpha: boolean = false): string {
    const toHex = (value: number) => {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    let hex = "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);

    if (includeAlpha && rgb.a < 1) {
        hex += toHex(Math.round(rgb.a * 255));
    }

    return hex;
}

// Convert RGB to HSV
export function rgbToHsv(rgb: RGBColor): HSVColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s,
        v,
        a: rgb.a
    };
}

// Convert HSV to RGB
export function hsvToRgb(hsv: HSVColor): RGBColor {
    const h = hsv.h / 360;
    const s = hsv.s;
    const v = hsv.v;

    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            r = 0;
            g = 0;
            b = 0;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: hsv.a
    };
}

// Parse color string to HSV
export function parseColor(color: string): HSVColor {
    color = color.trim().toLowerCase();

    // Check for hex format
    if (color.startsWith("#")) {
        return rgbToHsv(hexToRgb(color));
    }

    // Check for rgb/rgba format
    if (color.startsWith("rgb")) {
        const values = color.match(/[\d.]+/g);
        if (values) {
            const rgb = {
                r: parseInt(values[0], 10),
                g: parseInt(values[1], 10),
                b: parseInt(values[2], 10),
                a: values.length > 3 ? parseFloat(values[3]) : 1
            };
            return rgbToHsv(rgb);
        }
    }

    // Check for hsl/hsla format
    if (color.startsWith("hsl")) {
        const values = color.match(/[\d.]+/g);
        if (values) {
            const h = parseInt(values[0], 10);
            const s = parseInt(values[1], 10) / 100;
            const l = parseInt(values[2], 10) / 100;
            const a = values.length > 3 ? parseFloat(values[3]) : 1;

            // Convert HSL to HSV
            const v = l + s * Math.min(l, 1 - l);
            const s2 = v === 0 ? 0 : 2 * (1 - l / v);

            return { h, s: s2, v, a };
        }
    }

    throw new Error("Unsupported color format");
}

// Format color based on specified format
export function formatColor(hsv: HSVColor, format: string): string {
    const rgb = hsvToRgb(hsv);

    switch (format) {
        case "hex":
            return rgbToHex(rgb, false);
        case "hexa":
            return rgbToHex(rgb, true);
        case "rgb":
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case "rgba":
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${hsv.a.toFixed(2)})`;
        case "hsl": {
            // Convert to HSL
            const l = hsv.v * (1 - hsv.s / 2);
            const s = l === 0 || l === 1 ? 0 : (hsv.v - l) / Math.min(l, 1 - l);
            return `hsl(${hsv.h}, ${Math.round(s * 100)}%, ${Math.round(
                l * 100
            )}%)`;
        }
        case "hsla": {
            // Convert to HSL
            const l = hsv.v * (1 - hsv.s / 2);
            const s = l === 0 || l === 1 ? 0 : (hsv.v - l) / Math.min(l, 1 - l);
            return `hsla(${hsv.h}, ${Math.round(s * 100)}%, ${Math.round(
                l * 100
            )}%, ${hsv.a.toFixed(2)})`;
        }
        case "hsv":
            return `hsv(${hsv.h}, ${Math.round(hsv.s * 100)}%, ${Math.round(
                hsv.v * 100
            )}%)`;
        case "hsva":
            return `hsva(${hsv.h}, ${Math.round(hsv.s * 100)}%, ${Math.round(
                hsv.v * 100
            )}%, ${hsv.a.toFixed(2)})`;
        default:
            return rgbToHex(rgb, false);
    }
}
