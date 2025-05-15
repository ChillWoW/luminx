import React, { forwardRef } from "react";
import { HighlightProps } from "./types";
import { Text } from "../Text";
import { cx } from "../_theme";

export const Highlight = forwardRef<HTMLParagraphElement, HighlightProps>(
    ({ highlight, children, className, classNames, ...props }, ref) => {
        const highlightArray = Array.isArray(highlight)
            ? highlight
            : [highlight];

        if (highlightArray.length === 0 || !children) {
            return (
                <Text ref={ref} className={classNames?.text} {...props}>
                    {children}
                </Text>
            );
        }

        // Some goofy regex, created by Claude 3.7 Sonnet.
        const escapedHighlights = highlightArray.map((h) =>
            h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );

        const highlightRegex = new RegExp(
            `(${escapedHighlights.join("|")})`,
            "gi"
        );

        const parts = children.split(highlightRegex);

        const elements = parts.map((part, i) => {
            const isHighlighted = highlightRegex.test(part);
            highlightRegex.lastIndex = 0;

            if (isHighlighted) {
                return (
                    <mark
                        key={i}
                        className={cx(
                            "bg-[var(--luminx-yellow-5)] px-0.5",
                            classNames?.highlight,
                            className
                        )}
                    >
                        {part}
                    </mark>
                );
            }

            return part;
        });

        return (
            <Text ref={ref} className={classNames?.text} {...props}>
                {elements}
            </Text>
        );
    }
);

Highlight.displayName = "@luminx/core/Highlight";
