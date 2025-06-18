import { useState, useEffect } from "react";
import { LuminXContext } from "./context";
import { LuminXTheme } from "./types";
import { LuminXProviderProps } from "./types";
import { themeToVars, generateThemeVars } from "../colors/themeToVars";

const DEFAULT_KEY = "luminx-theme-value";

export const LuminXProvider = ({
    children,
    theme = "dark",
    themeAutoSave = true,
    lightVariantOpacity = 0.6,
    locale = "en-US"
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

    useEffect(() => {
        const themeVars = generateThemeVars(lightVariantOpacity);

        Object.entries(themeVars).forEach(([property, value]) => {
            const cssProperty = property.startsWith("--")
                ? property
                : `--${property}`;
            document.body.style.setProperty(cssProperty, value);
        });

        return () => {
            Object.keys(themeVars).forEach((property) => {
                const cssProperty = property.startsWith("--")
                    ? property
                    : `--${property}`;
                document.body.style.removeProperty(cssProperty);
            });
        };
    }, [currentTheme, lightVariantOpacity]);

    return (
        <LuminXContext.Provider
            value={{
                theme: currentTheme,
                setTheme: setCurrentTheme,
                themeAutoSave: isThemeAutoSave,
                setThemeAutoSave: setIsThemeAutoSave,
                lightVariantOpacity,
                locale
            }}
        >
            <div style={themeToVars()}>{children}</div>
        </LuminXContext.Provider>
    );
};
