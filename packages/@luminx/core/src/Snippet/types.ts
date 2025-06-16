export interface SnippetClassNames {
    root?: string;
    label?: string;
    content?: string;
    leftSection?: string;
    rightSection?: string;
    copyButton?: string;
}

export interface SnippetProps {
    children: string;
    copyable?: boolean;
    onCopy?: (code?: string) => void;
    copyText?: string;
    copiedText?: string;
    maxWidth?: string | number;
    label?: string;
    withBorder?: boolean;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    className?: string;
    classNames?: SnippetClassNames;
}
