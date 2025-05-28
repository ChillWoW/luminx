import { useState, useEffect } from "react";
import { LuminXContext } from "./context";
import { LuminXTheme } from "./types";
import { LuminXProviderProps } from "./types";
import { themeToVars } from "../colors/themeToVars";

const DEFAULT_KEY = "luminx-theme-value";

export const LuminXProvider = ({
    children,
    theme = "dark",
    themeAutoSave = true,
    lightVariantOpacity = 0.6
}: LuminXProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<LuminXTheme>(theme);
    const [isThemeAutoSave, setIsThemeAutoSave] =
        useState<boolean>(themeAutoSave);

    useEffect(() => {
        if (isThemeAutoSave) {
            const savedTheme = localStorage.getItem(DEFAULT_KEY);
            if (
                savedTheme &&
                (savedTheme === "dark" || savedTheme === "light")
            ) {
                setCurrentTheme(savedTheme as LuminXTheme);
            }
        }
    }, []);

    useEffect(() => {
        if (isThemeAutoSave) {
            localStorage.setItem(DEFAULT_KEY, currentTheme);
        }
    }, [currentTheme, isThemeAutoSave]);

    return (
        <LuminXContext.Provider
            value={{
                theme: currentTheme,
                setTheme: setCurrentTheme,
                themeAutoSave: isThemeAutoSave,
                setThemeAutoSave: setIsThemeAutoSave,
                lightVariantOpacity
            }}
        >
            <div style={themeToVars()}>{children}</div>
        </LuminXContext.Provider>
    );
};
