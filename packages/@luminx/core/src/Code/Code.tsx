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
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { CodeProps } from "./types";
import { cx, getRadius, getShadow } from "../_theme";
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
    radius,
    shadow,
    maxHeight,
    lineNumbersBackgroundColor,
    lineNumbersStyle,
    startingLineNumber = 1,
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
            className={cx("relative group", classNames?.container, className)}
            style={{
                maxHeight: maxHeight,
                overflow: maxHeight ? "auto" : undefined
            }}
        >
            {copyable && (
                <button
                    onClick={handleCopy}
                    className={cx(
                        "absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md px-2 py-1",
                        classNames?.copyButton
                    )}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <IconCopyCheck size={18} />
                    ) : (
                        <IconCopy size={18} />
                    )}
                </button>
            )}

            <SyntaxHighlighter
                language={language}
                style={codeStyle}
                showLineNumbers={showLineNumbers}
                wrapLines={wrapLines || highlightLines.length > 0}
                wrapLongLines={wrapLongLines}
                lineProps={lineProps}
                lineNumberStyle={customLineNumberStyle}
                startingLineNumber={startingLineNumber}
                className={cx(
                    "overflow-auto lumin-scrollbar",
                    classNames?.scrollbar
                )}
                customStyle={{
                    margin: 0,
                    ...getRadius(radius),
                    ...getShadow(shadow)
                }}
                codeTagProps={{ className: classNames?.code }}
            >
                {children as string}
            </SyntaxHighlighter>
        </div>
    );
};

Code.displayName = "@luminx/core/Code";
