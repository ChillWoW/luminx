import { colors } from "./colors";

/**
 * Gets a color from the theme or returns the color if it's a valid CSS color
 * @param colorValue - A color ID like "dark.5" or a CSS color value
 * @returns The resolved color
 */
export function getColor(colorValue: string): string {
    if (colorValue.includes(".")) {
        const [palette, indexStr] = colorValue.split(".");
        const index = parseInt(indexStr, 10);

        if (
            palette in colors &&
            !isNaN(index) &&
            index >= 0 &&
            index < colors[palette as keyof typeof colors].length
        ) {
            return colors[palette as keyof typeof colors][index];
        }
    }

    if (
        colorValue in colors &&
        Array.isArray(colors[colorValue as keyof typeof colors])
    ) {
        return colors[colorValue as keyof typeof colors][5];
    }

    return colorValue;
}
