import { forwardRef } from "react";
import prettyBytes from "pretty-bytes";
import { ByteFormatProps } from "./types";
import { useTheme } from "../_theme";

const ByteFormat = forwardRef<HTMLSpanElement, ByteFormatProps>(
    (
        {
            value,
            binary = false,
            signed = false,
            bits = false,
            space = true,
            minimumFractionDigits,
            maximumFractionDigits,
            ...props
        },
        ref
    ) => {
        const { locale } = useTheme();

        const formattedValue = prettyBytes(value, {
            binary,
            signed,
            bits,
            space,
            minimumFractionDigits,
            maximumFractionDigits,
            locale
        });

        return (
            <span ref={ref} {...props}>
                {formattedValue}
            </span>
        );
    }
);

ByteFormat.displayName = "@luminx/core/ByteFormat";

export { ByteFormat };
