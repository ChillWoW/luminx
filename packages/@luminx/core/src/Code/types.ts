import { Radius, Shadow } from "../_theme";
import { ReactNode } from "react";

export interface CodeClassNames {
    container?: string;
    code?: string;
    copyButton?: string;
    scrollbar?: string;
    title?: string;
}

export type CodeTheme =
    | "dark"
    | "dracula"
    | "atomDark"
    | "vsDark"
    | "materialDark"
    | "okaidia"
    | "github"
    | "prism"
    | "solarizedlight";

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
    showFileIcon?: boolean;
    fileIcon?: ReactNode;
    radius?: Radius;
    shadow?: Shadow;
    maxHeight?: string | number;
    lineNumbersBackgroundColor?: string;
    lineNumbersStyle?: React.CSSProperties;
    startingLineNumber?: number;
    highlightColor?: string;
}
