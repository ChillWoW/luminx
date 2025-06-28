import React, {
    useCallback,
    useRef,
    useState,
    useEffect,
    forwardRef
} from "react";
import { useTheme } from "../_theme";
import { Button } from "../Button";
import {
    DropZoneProps,
    FileWithPreview,
    FileRejection,
    FileError,
    DropZoneStatus
} from "./types";
import { Loader } from "../Loader";
import { IconFile, IconFolder } from "@tabler/icons-react";
import { CloseButton } from "../CloseButton";
import { Progress } from "../Progress";

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
    (
        {
            onDrop,
            onDropAccepted,
            onDropRejected,
            onFileDialogCancel,
            onError,
            accept,
            maxSize = 5 * 1024 * 1024, // 5MB default
            minSize = 0,
            maxFiles = 10,
            validator,
            multiple = true,
            disabled = false,
            autoFocus = false,
            noClick = false,
            noKeyboard = false,
            noDrag = false,
            preventDropOnDocument = true,
            children,
            placeholder,
            loadingMessage = "Processing files...",
            errorMessage,
            withPreviews = true,
            previewLimit = 5,
            showFileSize = true,
            showFileName = true,
            allowRemove = true,
            onRemove,
            files = [],
            uploading = true,
            uploadProgress = {},
            className,
            classNames,
            size = "md",
            variant = "outline",
            fullWidth = false,
            height,
            aspectRatio,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [status, setStatus] = useState<DropZoneStatus>("idle");
        const [dragCounter, setDragCounter] = useState(0);
        const inputRef = useRef<HTMLInputElement>(null);

        const generateId = () => Math.random().toString(36).substr(2, 9);

        const validateFile = useCallback(
            (file: File): FileError[] => {
                const errors: FileError[] = [];

                if (maxSize && file.size > maxSize) {
                    errors.push({
                        code: "file-too-large",
                        message: `File is larger than ${formatBytes(maxSize)}`
                    });
                }

                if (minSize && file.size < minSize) {
                    errors.push({
                        code: "file-too-small",
                        message: `File is smaller than ${formatBytes(minSize)}`
                    });
                }

                if (accept) {
                    const acceptTypes = Array.isArray(accept)
                        ? accept
                        : accept.split(",").map((s) => s.trim());
                    const isValidType = acceptTypes.some((type) => {
                        if (type.startsWith(".")) {
                            return file.name
                                .toLowerCase()
                                .endsWith(type.toLowerCase());
                        }
                        if (type.includes("*")) {
                            const [mainType] = type.split("/");
                            return file.type.startsWith(mainType);
                        }
                        return file.type === type;
                    });

                    if (!isValidType) {
                        errors.push({
                            code: "file-invalid-type",
                            message: `File type not accepted. Accepted: ${acceptTypes.join(
                                ", "
                            )}`
                        });
                    }
                }

                if (validator) {
                    const customErrors = validator(file);
                    if (customErrors) {
                        errors.push(
                            ...(Array.isArray(customErrors)
                                ? customErrors
                                : [customErrors])
                        );
                    }
                }

                return errors;
            },
            [accept, maxSize, minSize, validator]
        );

        // Process dropped files
        const processFiles = useCallback(
            async (fileList: FileList) => {
                const filesArray = Array.from(fileList);

                if (!multiple && filesArray.length > 1) {
                    filesArray.splice(1);
                }

                if (maxFiles && filesArray.length > maxFiles) {
                    filesArray.splice(maxFiles);
                }

                const acceptedFiles: FileWithPreview[] = [];
                const rejectedFiles: FileRejection[] = [];

                for (const file of filesArray) {
                    const errors = validateFile(file);

                    if (errors.length === 0) {
                        const fileWithPreview: FileWithPreview = Object.assign(
                            file,
                            {
                                id: generateId(),
                                preview: file.type.startsWith("image/")
                                    ? URL.createObjectURL(file)
                                    : undefined
                            }
                        );
                        acceptedFiles.push(fileWithPreview);
                    } else {
                        rejectedFiles.push({ file, errors });
                    }
                }

                onDrop?.(acceptedFiles, rejectedFiles);
                if (acceptedFiles.length > 0) {
                    onDropAccepted?.(acceptedFiles);
                }
                if (rejectedFiles.length > 0) {
                    onDropRejected?.(rejectedFiles);
                }
            },
            [
                multiple,
                maxFiles,
                validateFile,
                onDrop,
                onDropAccepted,
                onDropRejected
            ]
        );

        // Drag event handlers
        const handleDragEnter = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();

                if (disabled || noDrag) return;

                setDragCounter((prev) => prev + 1);

                if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                    const hasFiles = Array.from(e.dataTransfer.items).some(
                        (item) => item.kind === "file"
                    );

                    if (hasFiles) {
                        setStatus("accept");
                    }
                }
            },
            [disabled, noDrag]
        );

        const handleDragOver = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();

                if (disabled || noDrag) return;

                e.dataTransfer.dropEffect = "copy";
            },
            [disabled, noDrag]
        );

        const handleDragLeave = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();

                if (disabled || noDrag) return;

                setDragCounter((prev) => {
                    const newCounter = prev - 1;
                    if (newCounter === 0) {
                        setStatus("idle");
                    }
                    return newCounter;
                });
            },
            [disabled, noDrag]
        );

        const handleDrop = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();

                if (disabled || noDrag) return;

                setDragCounter(0);
                setStatus("idle");

                const { files: droppedFiles } = e.dataTransfer;

                if (droppedFiles && droppedFiles.length > 0) {
                    processFiles(droppedFiles);
                }
            },
            [disabled, noDrag, processFiles]
        );

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const { files: selectedFiles } = e.target;

                if (selectedFiles && selectedFiles.length > 0) {
                    processFiles(selectedFiles);
                }

                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            },
            [processFiles]
        );

        const openFileDialog = useCallback(() => {
            if (disabled || noClick) return;
            inputRef.current?.click();
        }, [disabled, noClick]);

        const handleRemove = useCallback(
            (fileToRemove: FileWithPreview) => {
                if (fileToRemove.preview) {
                    URL.revokeObjectURL(fileToRemove.preview);
                }
                onRemove?.(fileToRemove);
            },
            [onRemove]
        );

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (disabled || noKeyboard) return;

                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFileDialog();
                }
            },
            [disabled, noKeyboard, openFileDialog]
        );

        useEffect(() => {
            if (!preventDropOnDocument) return;

            const handleDocumentDragOver = (e: DragEvent) => {
                e.preventDefault();
            };

            const handleDocumentDrop = (e: DragEvent) => {
                e.preventDefault();
            };

            document.addEventListener("dragover", handleDocumentDragOver);
            document.addEventListener("drop", handleDocumentDrop);

            return () => {
                document.removeEventListener(
                    "dragover",
                    handleDocumentDragOver
                );
                document.removeEventListener("drop", handleDocumentDrop);
            };
        }, [preventDropOnDocument]);

        useEffect(() => {
            return () => {
                files.forEach((file) => {
                    if (file.preview) {
                        URL.revokeObjectURL(file.preview);
                    }
                });
            };
        }, [files]);

        const formatBytes = (bytes: number, decimals = 2) => {
            if (bytes === 0) return "0 Bytes";

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ["Bytes", "KB", "MB", "GB"];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return (
                parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
                " " +
                sizes[i]
            );
        };

        const getSizeClasses = () => {
            const sizes = {
                xs: "min-h-20 p-2",
                sm: "min-h-24 p-3",
                md: "min-h-32 p-4",
                lg: "min-h-40 p-6",
                xl: "min-h-48 p-8"
            };
            return sizes[size] || sizes.md;
        };

        const getVariantClasses = () => {
            const isLight = theme === "light";

            const variants = {
                filled: isLight
                    ? "bg-[var(--luminx-light-background)] border-2 border-transparent"
                    : "bg-[var(--luminx-dark-background)] border-2 border-transparent",
                outline: isLight
                    ? "border-2 border-dashed border-[var(--luminx-light-border)] bg-transparent"
                    : "border-2 border-dashed border-[var(--luminx-dark-border)] bg-transparent",
                light: isLight
                    ? "bg-[var(--luminx-light-background-hover)] border-2 border-transparent"
                    : "bg-[var(--luminx-dark-background-hover)] border-2 border-transparent"
            };

            return variants[variant] || variants.outline;
        };

        const getStatusClasses = () => {
            if (disabled) return "opacity-60 cursor-not-allowed";

            const isLight = theme === "light";

            switch (status) {
                case "accept":
                    return isLight
                        ? "border-[var(--luminx-green-5)] bg-[var(--luminx-green-1)]"
                        : "border-[var(--luminx-green-5)] bg-[var(--luminx-green-9)]";
                case "reject":
                    return isLight
                        ? "border-[var(--luminx-red-5)] bg-[var(--luminx-red-1)]"
                        : "border-[var(--luminx-red-5)] bg-[var(--luminx-red-9)]";
                default:
                    return "hover:border-[var(--luminx-primary)] transition-colors";
            }
        };

        const acceptTypes = Array.isArray(accept) ? accept.join(",") : accept;

        return (
            <div
                ref={ref}
                className={cx(
                    "relative",
                    fullWidth && "w-full",
                    classNames?.root,
                    className
                )}
                style={{
                    height,
                    aspectRatio: aspectRatio ? `${aspectRatio}` : undefined
                }}
                {...props}
            >
                <div
                    className={cx(
                        "relative cursor-pointer transition-all duration-200 rounded-md",
                        getSizeClasses(),
                        getVariantClasses(),
                        getStatusClasses(),
                        status === "accept" && classNames?.dragAccept,
                        status === "reject" && classNames?.dragReject,
                        disabled && classNames?.disabled,
                        classNames?.wrapper
                    )}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                    onKeyDown={handleKeyDown}
                    tabIndex={disabled ? -1 : 0}
                    role="button"
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={acceptTypes}
                        multiple={multiple}
                        onChange={handleInputChange}
                        className="hidden"
                        disabled={disabled}
                    />

                    <div
                        className={cx(
                            "flex flex-col items-center justify-center h-full",
                            classNames?.inner
                        )}
                    >
                        {uploading ? (
                            <div
                                className={cx(
                                    "text-center",
                                    classNames?.loadingOverlay
                                )}
                            >
                                <Loader />
                                <p className="text-sm opacity-60">
                                    {loadingMessage}
                                </p>
                            </div>
                        ) : (
                            <>
                                {children || (
                                    <div
                                        className={cx(
                                            "text-center space-y-2",
                                            classNames?.placeholder
                                        )}
                                    >
                                        {placeholder || (
                                            <>
                                                <IconFolder
                                                    size={48}
                                                    className="opacity-40 mx-auto"
                                                />
                                                <p className="text-base font-medium">
                                                    Drop files here or browse
                                                </p>
                                                <p className="text-sm opacity-60">
                                                    {multiple
                                                        ? `Up to ${maxFiles} files`
                                                        : "Single file"}{" "}
                                                    • Max {formatBytes(maxSize)}
                                                </p>
                                                {accept && (
                                                    <p className="text-xs opacity-40">
                                                        Accepted: {acceptTypes}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {errorMessage && (
                        <div
                            className={cx(
                                "absolute bottom-2 left-2 right-2 text-[var(--luminx-red-5)] text-sm",
                                classNames?.errorMessage
                            )}
                        >
                            {errorMessage}
                        </div>
                    )}
                </div>

                {withPreviews && files.length > 0 && (
                    <div className={cx("mt-4", classNames?.preview)}>
                        <div
                            className={cx(
                                "grid gap-3",
                                files.length === 1
                                    ? "grid-cols-1"
                                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
                                classNames?.previewGrid
                            )}
                        >
                            {files.slice(0, previewLimit).map((file) => (
                                <div
                                    key={file.id}
                                    className={cx(
                                        "relative border rounded-md overflow-hidden",
                                        theme === "light"
                                            ? "border-[var(--luminx-light-border)]"
                                            : "border-[var(--luminx-dark-border)]",
                                        classNames?.previewItem
                                    )}
                                >
                                    {file.preview ? (
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            className={cx(
                                                "w-full h-24 object-cover",
                                                classNames?.previewImage
                                            )}
                                        />
                                    ) : (
                                        <div
                                            className={cx(
                                                "w-full h-24 flex items-center justify-center",
                                                theme === "light"
                                                    ? "bg-[var(--luminx-light-background)]"
                                                    : "bg-[var(--luminx-dark-background)]"
                                            )}
                                        >
                                            <IconFile
                                                size={24}
                                                className="opacity-40 mx-auto"
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={cx(
                                            "p-2",
                                            classNames?.previewContent
                                        )}
                                    >
                                        {showFileName && (
                                            <p
                                                className={cx(
                                                    "text-xs font-medium truncate",
                                                    classNames?.fileName
                                                )}
                                            >
                                                {file.name}
                                            </p>
                                        )}
                                        {showFileSize && (
                                            <p
                                                className={cx(
                                                    "text-xs opacity-60",
                                                    classNames?.fileSize
                                                )}
                                            >
                                                {formatBytes(file.size)}
                                            </p>
                                        )}

                                        {uploadProgress[file.id] !==
                                            undefined && (
                                            <div
                                                className={cx(
                                                    "mt-1",
                                                    classNames?.progressBar
                                                )}
                                            >
                                                <Progress
                                                    value={
                                                        uploadProgress[file.id]
                                                    }
                                                    size="xs"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {allowRemove && (
                                        <CloseButton
                                            onClick={() => handleRemove(file)}
                                            className={cx(
                                                "absolute top-1 right-1",
                                                classNames?.removeButton
                                            )}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {files.length > previewLimit && (
                            <p className="text-sm opacity-60 mt-2 text-center">
                                +{files.length - previewLimit} more files
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

DropZone.displayName = "@luminx/core/DropZone";

export { DropZone };
