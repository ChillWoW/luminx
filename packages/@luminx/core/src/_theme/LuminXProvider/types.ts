export type LuminXTheme = "dark" | "light";

export interface LuminXProviderProps {
    children: React.ReactNode;
    theme?: LuminXTheme;
    themeAutoSave?: boolean;
    lightVariantOpacity?: number;
}

export interface LuminXContextType {
    theme: LuminXTheme;
    setTheme: (theme: LuminXTheme) => void;
    themeAutoSave: boolean;
    setThemeAutoSave: (themeAutoSave: boolean) => void;
    lightVariantOpacity: number;
}
