import React, { useState, useCallback } from "react";
import { Input } from "../Input/Input";
import { PasswordInputProps } from "./types";
import { useTheme } from "../_theme";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export const PasswordInput = ({
    visible: externalVisible,
    onVisibilityChange,
    visibilityToggle = true,
    visibilityToggleIcon,
    classNames,
    ...props
}: PasswordInputProps) => {
    const { theme, cx } = useTheme();

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
        reveal ? <IconEyeOff size={20} /> : <IconEye size={20} />;

    const controlButton = visibilityToggle && (
        <div className="inline-flex flex-col h-full">
            <button
                type="button"
                className={cx(
                    "w-7 h-[30px] flex items-center justify-center rounded-full hover:bg-[var(--luminx-primary-light)]",
                    theme === "light"
                        ? "text-[var(--luminx-light-text)]"
                        : "text-[var(--luminx-dark-text)]",
                    classNames?.visibilityToggle
                )}
                onClick={handleToggleVisibility}
            >
                {visibilityToggleIcon
                    ? visibilityToggleIcon(isVisible)
                    : eyeIcon(isVisible)}
            </button>
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
