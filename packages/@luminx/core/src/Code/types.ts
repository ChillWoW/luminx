export interface CodeClassNames {
    container?: string;
    code?: string;
    copyButton?: string;
    scrollbar?: string;
}

export type CodeTheme =
    | "dark"
    | "dark-reasonable"
    | "light"
    | "arta"
    | "paraisoDark"
    | "paraisoLight"
    | "vs"
    | "vs2015"
    | "xcode"
    | "a11yDark"
    | "dracula";

export type CodeRadius = "none" | "sm" | "md" | "lg" | "xl";
export type CodeShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface CodeProps {
    children: string;
    className?: string;
    classNames?: CodeClassNames;
    language?: string;
    showLineNumbers?: boolean;
    theme?: CodeTheme;
    highlightLines?: number[];
    wrapLines?: boolean;
    wrapLongLines?: boolean;
    copyable?: boolean;
    onCopy?: (code?: string) => void;
    copyText?: string;
    copiedText?: string;

    showFileName?: boolean;
    fileName?: string;
    radius?: CodeRadius;
    shadow?: CodeShadow;
    maxHeight?: string | number;
    lineNumbersBackgroundColor?: string;
    lineNumbersStyle?: React.CSSProperties;
    startingLineNumber?: number;
    title?: string;
    color?: string;
}
