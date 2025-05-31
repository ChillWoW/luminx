import React, { createContext, useState } from "react";
import {
    RadioGroupProps,
    RadioSize,
    RadioVariant,
    RadioLabelPosition
} from "./types";
import { useTheme } from "../_theme";

export interface RadioGroupContextValue {
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    size?: RadioSize;
    variant?: RadioVariant;
    labelPosition?: RadioLabelPosition;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
    null
);

export const RadioGroup: React.FC<RadioGroupProps> = ({
    children,
    value,
    defaultValue,
    onChange,
    name,
    size,
    variant = "filled",
    labelPosition = "right",
    disabled,
    readOnly,
    required,
    orientation = "vertical",
    spacing = "md",
    className,
    style
}) => {
    const { cx } = useTheme();
    const [internalValue, setInternalValue] = useState(defaultValue);

    const resolvedValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    const getSpacingClass = () => {
        const spacingMap = {
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-4",
            xl: "gap-5"
        };
        return spacingMap[spacing];
    };

    const contextValue: RadioGroupContextValue = {
        value: resolvedValue,
        onChange: handleChange,
        name,
        size,
        variant,
        labelPosition,
        disabled,
        readOnly,
        required
    };

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div
                className={cx(
                    "flex",
                    orientation === "horizontal" ? "flex-row" : "flex-col",
                    getSpacingClass(),
                    className
                )}
                style={style}
                role="radiogroup"
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};

RadioGroup.displayName = "@luminx/core/Radio.Group";
