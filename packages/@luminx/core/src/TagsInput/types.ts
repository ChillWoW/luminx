import { InputClassNames, InputProps } from "../Input/types";

export interface TagsInputProps
    extends Omit<InputProps, "value" | "defaultValue" | "onChange"> {
    value?: string[];
    defaultValue?: string[];
    onChange?: (tags: string[]) => void;
    maxTags?: number;
    allowDuplicates?: boolean;
    isDuplicate?: (tagValue: string, currentTags: string[]) => boolean;
    splitChars?: string | string[];
    acceptValueOnBlur?: boolean;
    clearable?: boolean;
    tagProps?: (tag: string, index: number) => Record<string, any>;
    renderTag?: (
        tag: string,
        index: number,
        onRemove: () => void
    ) => React.ReactNode;
    onTagAdd?: (tag: string) => void;
    onTagRemove?: (tag: string, index: number) => void;
    onTagClick?: (tag: string, index: number) => void;
    onMaxTagsReached?: () => void;
    onDuplicateRejected?: (tag: string) => void;
    validateTag?: (tag: string) => boolean;
    transformTag?: (tag: string) => string;
    classNames?: TagsInputClassNames;
}

export interface TagsInputClassNames extends InputClassNames {
    tagsContainer?: string;
    tag?: string;
    tagLabel?: string;
    tagRemove?: string;
    inputWrapper?: string;
}
