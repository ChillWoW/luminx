import { useState, useRef, useEffect } from "react";
import { Input } from "../Input/Input";
import { ColorInputProps } from "./types";
import { ColorSwatch } from "../ColorSwatch/ColorSwatch";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { parseColor } from "../ColorPicker/utils";
import { useTheme } from "../_theme";
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
    colorPickerProps,
    withPicker = true,
    transitionProps,
    classNames = {},
    ...props
}: ColorInputProps) => {
    const { theme, cx } = useTheme();

    const [currentColor, setCurrentColor] = useState(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
            className={cx("rounded-md", classNames.colorSwatch)}
            backgroundGrid
            {...colorSwatchProps}
        />
    );

    const eyedropperButton = (
        <button
            type="button"
            onClick={activateEyedropper}
            className="w-7 h-[30px] flex items-center justify-center hover:bg-[var(--luminx-primary-light)] rounded-full"
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
                }}
                containerRef={(node) => {
                    containerRef.current = node;
                    refs.setReference(node);
                }}
                {...getReferenceProps()}
                {...props}
            />

            {withPicker && (
                <div className="relative z-50">
                    <Transition
                        mounted={isOpen}
                        transition="fade-down"
                        duration={200}
                        {...transitionProps}
                    >
                        <div
                            ref={refs.setFloating}
                            className={cx(
                                "z-50 shadow-lg rounded-md overflow-hidden p-2 flex",
                                theme === "light"
                                    ? "bg-[var(--luminx-light-background)]"
                                    : "bg-[var(--luminx-dark-background)]",

                                classNames.colorPicker
                            )}
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                minWidth:
                                    containerRef.current?.offsetWidth || 200
                            }}
                            {...getFloatingProps()}
                        >
                            <ColorPicker
                                value={currentColor}
                                onChange={handleColorChange}
                                format={format}
                                fullWidth
                                {...colorPickerProps}
                            />
                        </div>
                    </Transition>
                </div>
            )}
        </div>
    );
};

ColorInput.displayName = "@luminx/core/ColorInput";
