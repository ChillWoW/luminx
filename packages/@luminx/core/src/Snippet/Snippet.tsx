import React, { useState } from "react";
import { SnippetProps } from "./types";
import { useTheme } from "../_theme";
import { Tooltip } from "../Tooltip";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

export const Snippet = ({
    children,
    copyable = true,
    onCopy,
    copyText = "Copy",
    copiedText = "Copied!",
    maxWidth,
    label,
    withBorder,
    leftSection,
    rightSection,
    className,
    classNames
}: SnippetProps) => {
    const { theme, cx } = useTheme();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof children === "string") {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            onCopy?.(children);
        }
    };

    const renderSection = (
        content: React.ReactNode,
        side: "left" | "right"
    ) => {
        if (!content) return null;

        const baseClasses = "flex items-center justify-center";
        const colorClasses =
            theme === "light"
                ? "text-[var(--luminx-light-section)]"
                : "text-[var(--luminx-dark-section)]";
        const sideClasses = side === "left" ? "mr-2" : "ml-2";
        const sectionClasses =
            side === "left"
                ? classNames?.leftSection
                : classNames?.rightSection;

        return (
            <div
                className={cx(
                    baseClasses,
                    colorClasses,
                    sideClasses,
                    sectionClasses
                )}
            >
                {content}
            </div>
        );
    };

    const copyButton =
        copyable && !rightSection ? (
            <Tooltip label={copied ? copiedText : copyText}>
                <button
                    onClick={handleCopy}
                    className={cx(
                        "p-1 rounded cursor-pointer",
                        theme === "light"
                            ? "text-[var(--luminx-light-text)]"
                            : "text-[var(--luminx-dark-text)]",
                        classNames?.copyButton
                    )}
                    aria-label={copied ? copiedText : copyText}
                >
                    {copied ? (
                        <IconCopyCheck size={18} />
                    ) : (
                        <IconCopy size={18} />
                    )}
                </button>
            </Tooltip>
        ) : null;

    return (
        <div
            className={cx(
                "relative font-mono group inline-block rounded-md",
                theme === "light"
                    ? "bg-[var(--luminx-light-background)] text-[var(--luminx-light-text)] border-[var(--luminx-light-border)]"
                    : "bg-[var(--luminx-dark-background)] text-[var(--luminx-dark-text)] border-[var(--luminx-dark-border)]",
                withBorder && "border",
                classNames?.root,
                className
            )}
            style={{
                maxWidth: maxWidth
            }}
        >
            {label && (
                <div
                    className={cx(
                        "text-xs font-medium px-3 py-1 border-b",
                        theme === "light"
                            ? "border-[var(--luminx-light-border)]"
                            : "border-[var(--luminx-dark-border)]",
                        classNames?.label
                    )}
                >
                    {label}
                </div>
            )}

            <div
                className={cx(
                    "px-3 py-2 text-sm flex items-center w-full",
                    classNames?.content
                )}
            >
                {renderSection(leftSection, "left")}
                <div className="flex-1">{children}</div>
                {renderSection(rightSection || copyButton, "right")}
            </div>
        </div>
    );
};

Snippet.displayName = "@luminx/core/Snippet";
