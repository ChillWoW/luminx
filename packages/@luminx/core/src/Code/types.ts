import { Radius, Shadow } from "../_theme";

export interface CodeClassNames {
    container?: string;
    code?: string;
    copyButton?: string;
    scrollbar?: string;
    title?: string;
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
    radius?: Radius;
    shadow?: Shadow;
    maxHeight?: string | number;
    lineNumbersBackgroundColor?: string;
    lineNumbersStyle?: React.CSSProperties;
    startingLineNumber?: number;
    color?: string;
}
