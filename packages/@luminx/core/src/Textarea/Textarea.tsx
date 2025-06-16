import React from "react";
import { Input } from "../Input";
import { TextareaProps } from "./types";

export const Textarea = ({
    rows = 3,
    cols,
    resize = "vertical",
    minRows,
    maxRows,
    autoSize,
    ...props
}: TextareaProps) => {
    return (
        <Input
            component="textarea"
            rows={rows}
            cols={cols}
            resize={resize}
            autoSize={autoSize}
            minRows={minRows}
            maxRows={maxRows}
            style={{
                ...(props.style || {}),
                ...(autoSize
                    ? {}
                    : {
                          minHeight: minRows
                              ? `${minRows * 1.5}rem`
                              : undefined,
                          maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined
                      })
            }}
            {...props}
        />
    );
};

Textarea.displayName = "@luminx/core/Textarea";
