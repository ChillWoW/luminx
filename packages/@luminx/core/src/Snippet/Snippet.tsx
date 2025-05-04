import React, { useState } from "react";
import { SnippetProps } from "./types";
import { cx, getRadius, getShadow } from "../_theme";
import { Tooltip } from "../Tooltip";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import "../style.css";

export const Snippet = ({
    children,
    copyable = true,
    onCopy,
    copyText = "Copy",
    copiedText = "Copied!",
    radius,
    shadow,
    maxWidth,
    label,
    withBorder,
    leftSection,
    rightSection,
    className,
    classNames
}: SnippetProps) => {
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

        const baseClasses =
            "flex items-center justify-center text-[var(--lumin-section)]";
        const sideClasses = side === "left" ? "mr-2" : "ml-2";
        const sectionClasses =
            side === "left"
                ? classNames?.leftSection
                : classNames?.rightSection;

        return (
            <div className={cx(baseClasses, sideClasses, sectionClasses)}>
                {content}
            </div>
        );
    };

    const copyButton =
        copyable && !rightSection ? (
            <Tooltip label={copied ? copiedText : copyText}>
                <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-[var(--lumin-hover)] rounded cursor-pointer"
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
                "relative font-mono group inline-block",
                "bg-[var(--lumin-background)] text-[var(--lumin-text)]",
                withBorder && "border border-[var(--lumin-border)]",
                classNames?.root,
                className
            )}
            style={{
                maxWidth: maxWidth,
                ...getRadius(radius),
                ...getShadow(shadow)
            }}
        >
            {label && (
                <div
                    className={cx(
                        "text-xs font-medium px-3 py-1 border-b border-[var(--lumin-border)]",
                        classNames?.label
                    )}
                >
                    {label}
                </div>
            )}

            <div
                className={cx(
                    "px-3 py-2 text-sm overflow-x-auto lumin-scrollbar flex items-center w-full",
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
