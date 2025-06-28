import {
    useState,
    useCallback,
    useRef,
    useEffect,
    KeyboardEvent,
    FocusEvent
} from "react";
import { Input } from "../Input";
import { Pill } from "../Pill";
import { TagsInputProps } from "./types";
import { useTheme } from "../_theme";
import { CloseButton } from "../CloseButton";

export const TagsInput = ({
    value: controlledValue,
    defaultValue = [],
    onChange,
    maxTags,
    allowDuplicates = false,
    isDuplicate,
    splitChars = [",", "Enter"],
    acceptValueOnBlur = true,
    clearable = true,
    tagProps,
    renderTag,
    onTagAdd,
    onTagRemove,
    onTagClick,
    onMaxTagsReached,
    onDuplicateRejected,
    validateTag,
    transformTag,
    classNames,
    placeholder = "Enter tags...",
    disabled,
    readOnly,
    ...props
}: TagsInputProps) => {
    const { theme, cx } = useTheme();
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>(controlledValue ?? defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const currentTags = isControlled ? controlledValue : tags;

    useEffect(() => {
        if (isControlled) {
            setTags(controlledValue);
        }
    }, [controlledValue, isControlled]);

    const checkDuplicate = useCallback(
        (tag: string): boolean => {
            if (allowDuplicates) return false;

            if (isDuplicate) {
                return isDuplicate(tag, currentTags);
            }

            return currentTags.some(
                (existingTag) => existingTag.toLowerCase() === tag.toLowerCase()
            );
        },
        [currentTags, allowDuplicates, isDuplicate]
    );

    const validateAndTransformTag = useCallback(
        (rawTag: string): string | null => {
            let tag = rawTag.trim();

            if (!tag) return null;

            if (transformTag) {
                tag = transformTag(tag);
            }

            if (validateTag && !validateTag(tag)) {
                return null;
            }

            return tag;
        },
        [validateTag, transformTag]
    );

    const addTag = useCallback(
        (rawTag: string) => {
            const tag = validateAndTransformTag(rawTag);
            if (!tag) return;

            if (maxTags && currentTags.length >= maxTags) {
                onMaxTagsReached?.();
                return;
            }

            if (checkDuplicate(tag)) {
                onDuplicateRejected?.(tag);
                return;
            }

            const newTags = [...currentTags, tag];

            if (!isControlled) {
                setTags(newTags);
            }

            onChange?.(newTags);
            onTagAdd?.(tag);
            setInputValue("");
        },
        [
            validateAndTransformTag,
            maxTags,
            currentTags,
            checkDuplicate,
            isControlled,
            onChange,
            onTagAdd,
            onMaxTagsReached,
            onDuplicateRejected
        ]
    );

    const removeTag = useCallback(
        (index: number) => {
            const tagToRemove = currentTags[index];
            const newTags = currentTags.filter((_, i) => i !== index);

            if (!isControlled) {
                setTags(newTags);
            }

            onChange?.(newTags);
            onTagRemove?.(tagToRemove, index);

            setTimeout(() => inputRef.current?.focus(), 0);
        },
        [currentTags, isControlled, onChange, onTagRemove]
    );

    const clearAllTags = useCallback(() => {
        if (!isControlled) {
            setTags([]);
        }
        onChange?.([]);
        setInputValue("");
    }, [isControlled, onChange]);

    const handleInputChange = useCallback(
        (value: string) => {
            const splitCharsArray = Array.isArray(splitChars)
                ? splitChars
                : [splitChars];

            const nonEnterSplitChars = splitCharsArray.filter(
                (char) => char !== "Enter"
            );
            for (const splitChar of nonEnterSplitChars) {
                if (value.includes(splitChar)) {
                    const parts = value.split(splitChar);
                    const tagsToAdd = parts.slice(0, -1);
                    const remainingInput = parts[parts.length - 1];

                    tagsToAdd.forEach((tag) => addTag(tag));
                    setInputValue(remainingInput);
                    return;
                }
            }

            setInputValue(value);
        },
        [splitChars, addTag]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            const splitCharsArray = Array.isArray(splitChars)
                ? splitChars
                : [splitChars];

            if (splitCharsArray.includes("Enter") && e.key === "Enter") {
                e.preventDefault();
                if (inputValue.trim()) {
                    addTag(inputValue);
                }
            } else if (
                e.key === "Backspace" &&
                !inputValue &&
                currentTags.length > 0
            ) {
                removeTag(currentTags.length - 1);
            }

            props.onKeyDown?.(e);
        },
        [
            splitChars,
            inputValue,
            addTag,
            currentTags.length,
            removeTag,
            props.onKeyDown
        ]
    );

    const handleBlur = useCallback(
        (e: FocusEvent<HTMLInputElement>) => {
            if (acceptValueOnBlur && inputValue.trim()) {
                addTag(inputValue);
            }
            props.onBlur?.(e);
        },
        [acceptValueOnBlur, inputValue, addTag, props.onBlur]
    );

    const handleTagClick = useCallback(
        (tag: string, index: number) => {
            onTagClick?.(tag, index);
        },
        [onTagClick]
    );

    const renderTagElement = useCallback(
        (tag: string, index: number) => {
            const handleRemove = () => removeTag(index);

            if (renderTag) {
                return renderTag(tag, index, handleRemove);
            }

            const tagPropsFromCallback = tagProps?.(tag, index) || {};

            return (
                <Pill
                    key={index}
                    size="sm"
                    withRemoveButton={!disabled && !readOnly}
                    disabled={disabled}
                    onRemove={handleRemove}
                    onClick={() => handleTagClick(tag, index)}
                    className={cx("cursor-pointer", classNames?.tag)}
                    classNames={{
                        label: classNames?.tagLabel,
                        remove: classNames?.tagRemove
                    }}
                    {...tagPropsFromCallback}
                >
                    {tag}
                </Pill>
            );
        },
        [
            removeTag,
            renderTag,
            tagProps,
            disabled,
            readOnly,
            classNames,
            handleTagClick,
            cx
        ]
    );

    const leftSection = currentTags.length > 0 && (
        <div
            className={cx(
                "flex flex-wrap gap-1 overflow-hidden",
                classNames?.tagsContainer
            )}
        >
            {currentTags.map(renderTagElement)}
        </div>
    );

    const rightSection = (
        <div className="flex items-center gap-1">
            {clearable && currentTags.length > 0 && !disabled && !readOnly && (
                <CloseButton onClick={clearAllTags} />
            )}
            {props.rightSection}
        </div>
    );

    return (
        <Input
            {...props}
            inputRef={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={currentTags.length === 0 ? placeholder : ""}
            readOnly={
                readOnly || (maxTags ? currentTags.length >= maxTags : false)
            }
            leftSection={leftSection}
            rightSection={rightSection}
            classNames={{
                ...classNames,
                rightSection: "pr-1",
                input: cx(currentTags.length > 0 && "pl-1", classNames?.input)
            }}
        />
    );
};

TagsInput.displayName = "@luminx/core/TagsInput";
