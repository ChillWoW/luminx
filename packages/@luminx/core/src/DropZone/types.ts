export interface FileWithPreview extends File {
    preview?: string;
    id: string;
}

export interface FileRejection {
    file: File;
    errors: FileError[];
}

export interface FileError {
    code: string;
    message: string;
}

export type DropZoneStatus = "idle" | "accept" | "reject" | "loading";

export interface DropZoneProps {
    onDrop?: (
        acceptedFiles: FileWithPreview[],
        rejectedFiles: FileRejection[]
    ) => void;
    onDropAccepted?: (files: FileWithPreview[]) => void;
    onDropRejected?: (fileRejections: FileRejection[]) => void;
    onFileDialogCancel?: () => void;
    onError?: (error: Error) => void;

    // File validation
    accept?: string | string[];
    maxSize?: number;
    minSize?: number;
    maxFiles?: number;
    validator?: (file: File) => FileError | FileError[] | null;

    // Behavior
    multiple?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    noClick?: boolean;
    noKeyboard?: boolean;
    noDrag?: boolean;
    preventDropOnDocument?: boolean;

    // Content
    children?: React.ReactNode;
    placeholder?: React.ReactNode;
    loadingMessage?: React.ReactNode;
    errorMessage?: React.ReactNode;

    // File previews
    withPreviews?: boolean;
    previewLimit?: number;
    showFileSize?: boolean;
    showFileName?: boolean;
    allowRemove?: boolean;
    onRemove?: (file: FileWithPreview) => void;

    // Upload progress
    files?: FileWithPreview[];
    uploading?: boolean;
    uploadProgress?: { [fileId: string]: number };

    // Styling
    className?: string;
    classNames?: DropZoneClassNames;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "filled" | "outline" | "light";

    // Layout
    fullWidth?: boolean;
    height?: number | string;
    aspectRatio?: number;
}

export interface DropZoneClassNames {
    root?: string;
    wrapper?: string;
    inner?: string;
    placeholder?: string;
    preview?: string;
    previewGrid?: string;
    previewItem?: string;
    previewImage?: string;
    previewContent?: string;
    fileName?: string;
    fileSize?: string;
    removeButton?: string;
    errorMessage?: string;
    loadingOverlay?: string;
    dragActive?: string;
    dragAccept?: string;
    dragReject?: string;
    disabled?: string;
    browse?: string;
    progressBar?: string;
}
