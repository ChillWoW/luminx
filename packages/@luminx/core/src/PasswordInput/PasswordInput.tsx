import React, { useState, useCallback } from "react";
import { Input } from "../Input/Input";
import { PasswordInputProps } from "./types";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { IconButton } from "../IconButton";

export const PasswordInput = ({
    visible: externalVisible,
    onVisibilityChange,
    visibilityToggle = true,
    visibilityToggleIcon,
    classNames,
    ...props
}: PasswordInputProps) => {
    const [internalVisible, setInternalVisible] = useState(false);

    const isVisible =
        externalVisible !== undefined ? externalVisible : internalVisible;

    const handleToggleVisibility = useCallback(() => {
        const newVisible = !isVisible;
        if (onVisibilityChange) {
            onVisibilityChange(newVisible);
        } else {
            setInternalVisible(newVisible);
        }
    }, [isVisible, onVisibilityChange]);

    const eyeIcon = (reveal: boolean) =>
        reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />;

    const controlButton = visibilityToggle && (
        <div className="inline-flex flex-col h-full">
            <IconButton onClick={handleToggleVisibility}>
                {visibilityToggleIcon
                    ? visibilityToggleIcon(isVisible)
                    : eyeIcon(isVisible)}
            </IconButton>
        </div>
    );

    return (
        <Input
            type={isVisible ? "text" : "password"}
            rightSection={controlButton}
            disabled={props.disabled}
            classNames={{
                rightSection: "p-1",
                ...classNames
            }}
            {...props}
        />
    );
};

PasswordInput.displayName = "@luminx/core/PasswordInput";
