import { createContext } from "react";
import { LuminXContextType } from "./types";

export const LuminXContext = createContext<LuminXContextType>({
    theme: "dark",
    setTheme: () => {},
    themeAutoSave: false,
    setThemeAutoSave: () => {},
    lightVariantOpacity: 0.6
});
