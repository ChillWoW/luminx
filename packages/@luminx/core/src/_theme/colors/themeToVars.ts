import { useTheme } from "../LuminXProvider";
import { colors } from "./colors";
import { rgba } from "./utils";

const DEFAULT_TEMPLATE = "--luminx";

interface ThemeVars {
    [key: string]: string;
}

const getThemeColors = () => {
    const vars: ThemeVars = {};

    vars[`${DEFAULT_TEMPLATE}-dark-background`] = colors.dark[6];
    vars[`${DEFAULT_TEMPLATE}-dark-background-hover`] = colors.dark[5];
    vars[`${DEFAULT_TEMPLATE}-dark-border`] = colors.dark[4];
    vars[`${DEFAULT_TEMPLATE}-dark-border-hover`] = colors.dark[3];
    vars[`${DEFAULT_TEMPLATE}-dark-text`] = colors.white;
    vars[`${DEFAULT_TEMPLATE}-dark-hint`] = colors.dark[1];
    vars[`${DEFAULT_TEMPLATE}-dark-placeholder`] = colors.dark[1];
    vars[`${DEFAULT_TEMPLATE}-dark-section`] = colors.dark[0];

    vars[`${DEFAULT_TEMPLATE}-light-background`] = colors.light[3];
    vars[`${DEFAULT_TEMPLATE}-light-background-hover`] = colors.light[4];
    vars[`${DEFAULT_TEMPLATE}-light-border`] = colors.light[5];
    vars[`${DEFAULT_TEMPLATE}-light-border-hover`] = colors.light[6];
    vars[`${DEFAULT_TEMPLATE}-light-text`] = colors.black;
    vars[`${DEFAULT_TEMPLATE}-light-hint`] = colors.dark[2];
    vars[`${DEFAULT_TEMPLATE}-light-placeholder`] = colors.dark[5];
    vars[`${DEFAULT_TEMPLATE}-light-section`] = colors.dark[1];

    const primaryColor = colors.blue[6];
    vars[`${DEFAULT_TEMPLATE}-primary`] = primaryColor;
    vars[`${DEFAULT_TEMPLATE}-primary-hover`] = colors.blue[5];
    vars[`${DEFAULT_TEMPLATE}-primary-light`] = rgba(primaryColor, 0.6);

    vars[`${DEFAULT_TEMPLATE}-secondary`] = colors.gray[6];
    vars[`${DEFAULT_TEMPLATE}-secondary-hover`] = colors.gray[5];

    vars[`${DEFAULT_TEMPLATE}-error`] = colors.red[6];
    vars[`${DEFAULT_TEMPLATE}-success`] = colors.green[6];

    return vars;
};

export const themeToVars = (): ThemeVars => {
    const { lightVariantOpacity } = useTheme();
    const vars: ThemeVars = {};

    Object.entries(colors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((color, index) => {
                vars[`${DEFAULT_TEMPLATE}-${key}-${index}`] = color;
                vars[`${DEFAULT_TEMPLATE}-${key}-light-${index}`] = rgba(
                    color,
                    lightVariantOpacity
                );
            });
        } else {
            vars[`${DEFAULT_TEMPLATE}-${key}`] = value;
        }
    });

    const additionalVars = getThemeColors();

    Object.entries(additionalVars).forEach(([key, value]) => {
        vars[key] = value;
    });

    return vars;
};
