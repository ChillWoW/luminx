import React, { useState, useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    arta,
    atomOneDark,
    atomOneDarkReasonable,
    github,
    paraisoDark,
    paraisoLight,
    vs,
    vs2015,
    xcode,
    a11yDark,
    dracula
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "../_utils";
import { CodeProps } from "./types";
import "../style.css";

const themeStyles = {
    light: github,
    dark: atomOneDark,
    "dark-reasonable": atomOneDarkReasonable,
    arta: arta,
    paraisoDark: paraisoDark,
    paraisoLight: paraisoLight,
    vs: vs,
    vs2015: vs2015,
    xcode: xcode,
    a11yDark: a11yDark,
    dracula: dracula
};

export const Code = ({
    children,
    className,
    classNames,
    language = "text",
    showLineNumbers = false,
    theme = "dark",
    highlightLines = [],
    wrapLines = false,
    wrapLongLines = false,
    copyable = true,
    onCopy,
    copyText = "Copy",
    copiedText = "Copied!",
    showFileName = false,
    fileName,
    radius = "md",
    shadow = "sm",
    maxHeight,
    lineNumbersBackgroundColor,
    lineNumbersStyle,
    startingLineNumber = 1,
    title,
    color
}: CodeProps) => {
    const [copied, setCopied] = useState(false);

    const codeStyle = themeStyles[theme] || themeStyles.dark;

    const handleCopy = () => {
        if (typeof children === "string") {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        onCopy?.(children);
    };

    const radiusClass = useMemo(() => {
        const radiusMap = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl"
        };
        return radiusMap[radius] || radiusMap.md;
    }, [radius]);

    const shadowClass = useMemo(() => {
        const shadowMap = {
            none: "shadow-none",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl"
        };
        return shadowMap[shadow] || shadowMap.sm;
    }, [shadow]);

    const lineProps = (lineNumber: number) => {
        const style: React.CSSProperties = { display: "block" };
        if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = color || "rgba(255, 255, 255, 0.1)";
        }
        return { style };
    };

    const customLineNumberStyle = lineNumbersStyle || {
        minWidth: "2.5em",
        paddingRight: "1em",
        textAlign: "right",
        userSelect: "none",
        borderRight: `1px solid ${
            theme === "light" ? "#ddd" : "var(--lumin-border)"
        }`,
        backgroundColor:
            lineNumbersBackgroundColor ||
            (theme === "light" ? "#f5f5f5" : "var(--lumin-secondary)")
    };

    return (
        <div
            className={cn(
                "relative group",
                radiusClass,
                shadowClass,
                classNames?.container,
                className
            )}
            style={{
                maxHeight: maxHeight,
                overflow: maxHeight ? "auto" : undefined
            }}
        >
            {(title || showFileName) && (
                <div
                    className={cn(
                        "text-sm font-medium px-4 py-2 border-b",
                        theme === "light"
                            ? "bg-gray-100 border-gray-200 text-gray-700"
                            : "bg-[var(--lumin-secondary)] border-[var(--lumin-border)] text-[var(--lumin-text)]"
                    )}
                >
                    {title || (showFileName && fileName) || language}
                </div>
            )}

            {copyable && (
                <button
                    onClick={handleCopy}
                    className={cn(
                        "absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md px-2 py-1",
                        theme === "light"
                            ? "text-gray-700 bg-gray-200 hover:text-gray-900 hover:bg-gray-300"
                            : "text-[var(--lumin-text)] bg-[var(--lumin-secondary)] hover:bg-[var(--lumin-border)]",
                        classNames?.copyButton
                    )}
                    aria-label="Copy code"
                >
                    {copied ? copiedText : copyText}
                </button>
            )}

            <div
                className={cn(
                    maxHeight && "lumin-scrollbar",
                    classNames?.scrollbar
                )}
            >
                <SyntaxHighlighter
                    language={language}
                    style={codeStyle}
                    showLineNumbers={showLineNumbers}
                    wrapLines={wrapLines || highlightLines.length > 0}
                    wrapLongLines={wrapLongLines}
                    lineProps={lineProps}
                    lineNumberStyle={customLineNumberStyle}
                    startingLineNumber={startingLineNumber}
                    className={cn(
                        "rounded-md overflow-auto",
                        classNames?.scrollbar
                    )}
                    customStyle={{
                        margin: 0,
                        borderRadius:
                            title || showFileName
                                ? "0 0 0.375rem 0.375rem"
                                : undefined
                    }}
                    codeTagProps={{ className: classNames?.code }}
                >
                    {children as string}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

Code.displayName = "Code";
