import { useContext } from "react";
import { LuminXContext } from "./context";
import { cx } from "../cx";
import { colors } from "../colors";

export const useTheme = () => {
    const { theme, setTheme, lightVariantOpacity, locale } =
        useContext(LuminXContext);

    if (!theme || !setTheme) {
        throw new Error("useTheme must be used within a LuminXProvider");
    }

    return { theme, setTheme, cx, colors, lightVariantOpacity, locale };
};
