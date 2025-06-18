import { forwardRef, useMemo } from "react";
import { NumberFormatProps } from "./types";
import { useTheme } from "../_theme";

const NumberFormat = forwardRef<HTMLSpanElement, NumberFormatProps>(
    (
        {
            value,
            style = "decimal",
            currency,
            unit,
            notation = "standard",
            compactDisplay = "short",
            useGrouping = true,
            minimumIntegerDigits,
            minimumFractionDigits,
            maximumFractionDigits,
            minimumSignificantDigits,
            maximumSignificantDigits,
            allowLeadingZeros,
            allowNegative,
            customInput,
            decimalScale,
            decimalSeparator,
            defaultValue,
            displayType,
            fixedDecimalScale,
            getInputRef,
            isAllowed,
            onBlur,
            onFocus,
            onKeyDown,
            onValueChange,
            prefix,
            renderText,
            suffix,
            thousandSeparator,
            thousandsGroupStyle,
            type,
            valueIsNumericString,
            ...htmlProps
        },
        ref
    ) => {
        const { locale } = useTheme();

        const formattedValue = useMemo(() => {
            const numericValue =
                typeof value === "string" ? parseFloat(value) : value;

            if (isNaN(numericValue)) {
                return "NaN";
            }

            const options: Intl.NumberFormatOptions = {
                useGrouping,
                minimumIntegerDigits,
                minimumFractionDigits,
                maximumFractionDigits,
                minimumSignificantDigits,
                maximumSignificantDigits
            };

            switch (style) {
                case "percent":
                    options.style = "percent";
                    return new Intl.NumberFormat(locale, options).format(
                        numericValue / 100
                    );

                case "currency":
                    options.style = "currency";
                    options.currency = currency || "USD";
                    return new Intl.NumberFormat(locale, options).format(
                        numericValue
                    );

                case "unit":
                    if (unit) {
                        options.style = "unit";
                        options.unit = unit;
                    }
                    return new Intl.NumberFormat(locale, options).format(
                        numericValue
                    );

                default:
                    options.style = "decimal";
                    options.notation = notation;
                    if (notation === "compact") {
                        options.compactDisplay = compactDisplay;
                    }
                    return new Intl.NumberFormat(locale, options).format(
                        numericValue
                    );
            }
        }, [
            value,
            style,
            currency,
            unit,
            notation,
            compactDisplay,
            useGrouping,
            minimumIntegerDigits,
            minimumFractionDigits,
            maximumFractionDigits,
            minimumSignificantDigits,
            maximumSignificantDigits,
            locale
        ]);

        return (
            <span ref={ref} {...htmlProps}>
                {formattedValue}
            </span>
        );
    }
);

NumberFormat.displayName = "@luminx/core/NumberFormat";

export { NumberFormat };
