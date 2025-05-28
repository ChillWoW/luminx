export const hexToRgb = (hex: string): string | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
              result[3],
              16
          )}`
        : null;
};

export const rgba = (color: string, opacity: number): string => {
    let colorRgb = null;

    if (color.startsWith("#")) {
        colorRgb = hexToRgb(color);
    }

    if (!colorRgb) {
        colorRgb = color;
    }

    return `rgba(${colorRgb}, ${opacity})`;
};
