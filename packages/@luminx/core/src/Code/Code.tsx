import React, { useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    atomDark,
    dracula,
    oneDark,
    materialDark,
    vscDarkPlus as vsDark,
    okaidia,
    prism,
    solarizedlight,
    ghcolors as github
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    IconCopy,
    IconCopyCheck,
    IconCode,
    IconTerminal2
} from "@tabler/icons-react";
import { CodeProps } from "./types";
import { cx, getRadius, getShadow } from "../_theme";
import "../style.css";
import { Tooltip } from "../Tooltip";

const themeStyles = {
    dark: oneDark,
    dracula: dracula,
    atomDark: atomDark,
    vsDark: vsDark,
    materialDark: materialDark,
    okaidia: okaidia,
    github: github,
    prism: prism,
    solarizedlight: solarizedlight
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
    lineNumbersStyle,
    startingLineNumber = 1,
    highlightColor,
    showFileName = false,
    fileName,
    showFileIcon = true,
    fileIcon,
    copyText = "Copy code",
    copiedText = "Copied!"
}: CodeProps) => {
    const [copied, setCopied] = useState(false);
    const codeStyle = themeStyles[theme] || themeStyles.dark;

    const handleCopy = useCallback(() => {
        if (typeof children === "string") {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            onCopy?.(children);
        }
    }, [children, onCopy]);

    const getLineProps = useCallback(
        (lineNumber: number) => {
            const style: React.CSSProperties = {};
            if (highlightLines.includes(lineNumber)) {
                style.backgroundColor =
                    highlightColor || "rgba(255, 255, 255, 0.1)";
                style.width = "100%";
                style.display = "block";
            }
            return { style };
        },
        [highlightLines, highlightColor]
    );

    const getFileIcon = () => {
        if (fileIcon) return fileIcon;

        if (!fileName) return <IconCode size={16} />;

        if (fileName.endsWith(".sh") || fileName.endsWith(".bash")) {
            return <IconTerminal2 size={16} />;
        }

        return <IconCode size={16} />;
    };

    const isDarkTheme = !["github", "prism", "solarizedlight"].includes(theme);

    const customLineNumberStyle = lineNumbersStyle || {
        minWidth: "2.5em",
        paddingRight: "1em",
        textAlign: "right",
        userSelect: "none",
        backgroundColor: isDarkTheme
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.05)"
    };

    return (
        <div
            className={cx(
                "relative group rounded-md overflow-hidden border-0",
                classNames?.container,
                className
            )}
            style={{
                ...getRadius(radius),
                ...getShadow(shadow)
            }}
        >
            {showFileName && (
                <div
                    className={cx(
                        "flex items-center gap-2 px-3 py-2 text-sm font-medium",
                        isDarkTheme
                            ? "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)]"
                            : "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)]",
                        classNames?.title
                    )}
                >
                    {showFileIcon && getFileIcon()}
                    <span>{fileName || language}</span>
                </div>
            )}

            <div className="relative">
                {copyable && (
                    <button
                        onClick={handleCopy}
                        className={cx(
                            "absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity",
                            classNames?.copyButton
                        )}
                    >
                        <Tooltip
                            label={copied ? copiedText : copyText}
                            position="bottom-end"
                        >
                            {copied ? (
                                <IconCopyCheck size={18} />
                            ) : (
                                <IconCopy size={18} />
                            )}
                        </Tooltip>
                    </button>
                )}

                <SyntaxHighlighter
                    language={language}
                    style={codeStyle}
                    showLineNumbers={showLineNumbers}
                    wrapLines={wrapLines || highlightLines.length > 0}
                    wrapLongLines={wrapLongLines}
                    lineProps={getLineProps}
                    lineNumberStyle={customLineNumberStyle}
                    startingLineNumber={startingLineNumber}
                    className={cx(
                        "!m-0 !p-4 !bg-transparent",
                        classNames?.scrollbar
                    )}
                    customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        maxHeight: maxHeight,
                        overflow: maxHeight ? "auto" : undefined
                    }}
                    codeTagProps={{
                        className: cx("font-mono", classNames?.code)
                    }}
                >
                    {children as string}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

Code.displayName = "@luminx/core/Code";
