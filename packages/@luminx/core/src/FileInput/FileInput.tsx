import React, { useRef, useState, useEffect } from "react";
import { Input } from "../Input";
import { FileInputProps } from "./types";
import { cx } from "../_theme";
import { CloseButton } from "../CloseButton";

const DefaultValueComponent: React.FC<{ value: File | null | File[] }> = ({
    value
}) => {
    if (!value) return null;

    if (Array.isArray(value)) {
        return (
            <span className="truncate inline-block max-w-full">
                {value.length > 0 ? `${value.length} files selected` : null}
            </span>
        );
    }

    return (
        <span className="truncate inline-block max-w-full">{value.name}</span>
    );
};

export const FileInput = ({
    value,
    onChange,
    multiple = false,
    accept,
    clearable = false,
    valueComponent: CustomValueComponent,
    classNames,
    ...props
}: FileInputProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File | null | File[]>(
        value || (multiple ? [] : null)
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedFiles(value);
        }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            const newValue = multiple ? [] : null;
            setSelectedFiles(newValue);
            onChange?.(newValue);
            return;
        }

        if (multiple) {
            const fileArray = Array.from(files);
            setSelectedFiles(fileArray);
            onChange?.(fileArray);
        } else {
            setSelectedFiles(files[0]);
            onChange?.(files[0]);
        }
    };

    const clearFiles = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = multiple ? [] : null;
        setSelectedFiles(newValue);
        onChange?.(newValue);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const ValueComponent = CustomValueComponent || DefaultValueComponent;
    const hasValue = multiple
        ? Array.isArray(selectedFiles) && selectedFiles.length > 0
        : selectedFiles !== null;

    const clearButton =
        clearable && hasValue ? <CloseButton onClick={clearFiles} /> : null;

    return (
        <div
            onClick={handleClick}
            className={cx(
                "cursor-pointer",
                props.disabled && "cursor-not-allowed"
            )}
        >
            <Input
                readOnly
                {...props}
                type="text"
                placeholder={
                    hasValue ? undefined : props.placeholder || "Select file"
                }
                value=""
                leftSection={
                    <div
                        className={cx(
                            "flex items-center w-full overflow-hidden",
                            classNames?.valueComponent
                        )}
                    >
                        <ValueComponent value={selectedFiles} />
                    </div>
                }
                rightSection={
                    <div className="flex items-center gap-2">
                        {clearButton}
                        {props?.rightSection}
                    </div>
                }
            />
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
                className="hidden"
                disabled={props.disabled}
            />
        </div>
    );
};

FileInput.displayName = "@luminx/core/FileInput";
