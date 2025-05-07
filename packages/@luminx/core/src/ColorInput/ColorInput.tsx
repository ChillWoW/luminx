import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input/Input";
import { ColorInputProps } from "./types";
import { ColorSwatch } from "../ColorSwatch/ColorSwatch";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { parseColor } from "../ColorPicker/utils";
import { cx } from "../_theme";
import { IconPencil } from "@tabler/icons-react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions
} from "@floating-ui/react";
import { Transition } from "../Transition";

export const ColorInput = ({
    value = "#ffffff",
    defaultValue = "#ffffff",
    onChange,
    format = "hex",
    hidePreview,
    showEyeDropper,
    colorSwatchProps,
    withPicker = true,
    classNames = {},
    ...props
}: ColorInputProps) => {
    const [currentColor, setCurrentColor] = useState(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const { x, y, strategy, refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "dialog" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);

    useEffect(() => {
        if (value) {
            setCurrentColor(value);
        }
    }, [value]);

    const handleColorChange = (newColor: string) => {
        setCurrentColor(newColor);
        onChange?.(newColor);
    };

    const handleInputChange = (inputValue: string) => {
        try {
            parseColor(inputValue);
            handleColorChange(inputValue);
        } catch (e) {
            setCurrentColor(inputValue);
            onChange?.(inputValue);
        }
    };

    const activateEyedropper = async () => {
        try {
            if ("EyeDropper" in window) {
                // @ts-ignore - EyeDropper API is not yet in TypeScript types
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                handleColorChange(result.sRGBHex);
            } else {
                alert("Eyedropper not supported in this browser");
            }
        } catch (e) {
            console.error("Error using eyedropper:", e);
        }
    };

    const colorSwatch = (
        <ColorSwatch
            color={currentColor}
            size={24}
            radius="full"
            className={classNames.colorSwatch}
            {...colorSwatchProps}
        />
    );

    const eyedropperButton = (
        <button
            type="button"
            onClick={activateEyedropper}
            className="w-7 h-[30px] flex items-center justify-center hover:bg-[var(--lumin-secondary)] rounded-full"
        >
            <IconPencil size={18} />
        </button>
    );

    return (
        <div className="relative">
            <Input
                type="text"
                value={currentColor}
                onChange={handleInputChange}
                leftSection={hidePreview ? null : colorSwatch}
                rightSection={showEyeDropper ? eyedropperButton : null}
                inputRef={(node) => {
                    inputRef.current = node;
                    refs.setReference(node);
                }}
                {...getReferenceProps()}
                {...props}
            />

            {withPicker && (
                <Transition mounted={isOpen} transition="fade">
                    {(styles) => (
                        <div
                            ref={refs.setFloating}
                            className={cx(
                                "z-50 shadow-lg rounded-md overflow-hidden bg-[var(--lumin-background)] p-2 flex"
                            )}
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                minWidth: inputRef.current?.offsetWidth || 200,
                                ...styles
                            }}
                            {...getFloatingProps()}
                        >
                            <ColorPicker
                                value={currentColor}
                                onChange={handleColorChange}
                                format={format}
                                fullWidth
                            />
                        </div>
                    )}
                </Transition>
            )}
        </div>
    );
};

ColorInput.displayName = "@luminx/core/ColorInput";
