import { InputClassNames, InputProps } from "../Input";

export interface FileInputProps extends Omit<InputProps, "onChange" | "value"> {
    value?: File | null | File[];
    multiple?: boolean;
    accept?: string;
    clearable?: boolean;
    onChange?: (files: File | null | File[]) => void;
    valueComponent?: React.FC<{ value: File | null | File[] }>;
    classNames?: FileInputClassNames & InputProps["classNames"];
}

export interface FileInputClassNames extends InputClassNames {
    valueComponent?: string;
    clearButton?: string;
}
