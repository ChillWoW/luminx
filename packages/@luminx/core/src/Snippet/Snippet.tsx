import React, { useState } from "react";
import { SnippetProps } from "./types";
import { useTheme } from "../_theme";
import { CopyButton } from "../CopyButton";

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
            <CopyButton
                content={children}
                copiedText={copiedText}
                copyText={copyText}
                onCopy={onCopy}
            />
        ) : null;

    return (
        <div
            className={cx(
                "relative group inline-block rounded-md border",
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
                <div className="flex-1 font-mono">{children}</div>
                {renderSection(rightSection || copyButton, "right")}
            </div>
        </div>
    );
};

Snippet.displayName = "@luminx/core/Snippet";
