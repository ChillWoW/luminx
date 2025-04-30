import React from "react";
import { Input } from "../Input";
import { NativeSelectProps } from "./types";

export const NativeSelect = ({
    options,
    multiple,
    size,
    ...props
}: NativeSelectProps) => {
    return (
        <Input
            component="select"
            options={options}
            {...(multiple ? { multiple: true } : {})}
            {...(size ? { size } : {})}
            {...props}
        />
    );
};

NativeSelect.displayName = "NativeSelect";
