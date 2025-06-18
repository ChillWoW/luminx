import { InputClassNames, InputProps } from "../Input/types";

export type ValidationRule = {
    validate: (value: string) => boolean;
    message: string;
};

export type ValidationTrigger = "onChange" | "onBlur" | "onSubmit";

export interface ValidatorInputProps
    extends Omit<InputProps, "error" | "success"> {
    rules?: ValidationRule[];
    validateOn?: ValidationTrigger[];
    showSuccess?: boolean;
    successMessage?: string;
    customValidator?: (value: string) => {
        isValid: boolean;
        message?: string;
    };
    onValidationChange?: (isValid: boolean, message?: string) => void;
    forceValidation?: boolean;
    resetValidation?: boolean;
}

export interface ValidatorInputClassNames extends InputClassNames {
    validationMessage?: string;
}
