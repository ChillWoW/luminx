import React, { useState, useCallback } from "react";
import { Input } from "../Input/Input";
import { PasswordInputProps } from "./types";
import { VisibilityIcon } from "../_icons";
import "../style.css";

export const PasswordInput = ({
    visible: externalVisible,
    onVisibilityChange,
    visibilityToggle = true,
    visibilityToggleIcon,
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

    const controlButton = visibilityToggle && (
        <div className="inline-flex flex-col h-full">
            <button
                type="button"
                className="w-7 h-[30px] flex items-center justify-center hover:bg-[var(--lumin-secondary)] rounded-md"
                onClick={handleToggleVisibility}
            >
                {visibilityToggleIcon ? (
                    visibilityToggleIcon(isVisible)
                ) : (
                    <VisibilityIcon size={18} reveal={isVisible} />
                )}
            </button>
        </div>
    );

    return (
        <Input
            type={isVisible ? "text" : "password"}
            rightSection={controlButton}
            rightSectionPadding={0}
            disabled={props.disabled}
            classNames={{
                rightSection: "p-1",
                ...props.classNames
            }}
            {...props}
        />
    );
};
