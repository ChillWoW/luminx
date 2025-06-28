import React, { forwardRef, useEffect, useState, useCallback } from "react";
import { Input } from "../Input";
import { ValidatorInputProps } from "./types";

export const ValidatorInput = forwardRef<HTMLInputElement, ValidatorInputProps>(
    (
        {
            rules = [],
            validateOn = ["onChange"],
            showSuccess = false,
            successMessage = "Valid",
            customValidator,
            onValidationChange,
            forceValidation = false,
            resetValidation = false,
            onChange,
            onBlur,
            value,
            classNames,
            ...inputProps
        },
        ref
    ) => {
        const [validationState, setValidationState] = useState<{
            isValid: boolean;
            message?: string;
            hasBeenValidated: boolean;
        }>({
            isValid: true,
            message: undefined,
            hasBeenValidated: false
        });

        const validateValue = useCallback(
            (inputValue: string) => {
                if (rules.length === 0 && !customValidator) {
                    return { isValid: true, message: undefined };
                }

                if (customValidator) {
                    const customResult = customValidator(inputValue);
                    if (!customResult.isValid) {
                        return {
                            isValid: false,
                            message: customResult.message || "Invalid input"
                        };
                    }
                }

                for (const rule of rules) {
                    if (!rule.validate(inputValue)) {
                        return {
                            isValid: false,
                            message: rule.message
                        };
                    }
                }

                return { isValid: true, message: undefined };
            },
            [rules, customValidator]
        );

        const updateValidationState = useCallback(
            (inputValue: string, shouldValidate: boolean = true) => {
                if (!shouldValidate) return;

                const result = validateValue(inputValue);
                const newState = {
                    isValid: result.isValid,
                    message: result.message,
                    hasBeenValidated: true
                };

                setValidationState(newState);
                onValidationChange?.(result.isValid, result.message);
            },
            [validateValue, onValidationChange]
        );

        useEffect(() => {
            if (forceValidation && value !== undefined) {
                updateValidationState(value, true);
            }
        }, [forceValidation, value, updateValidationState]);

        useEffect(() => {
            if (resetValidation) {
                setValidationState({
                    isValid: true,
                    message: undefined,
                    hasBeenValidated: false
                });
            }
        }, [resetValidation]);

        const handleChange = (newValue: string) => {
            onChange?.(newValue);

            if (validateOn.includes("onChange")) {
                updateValidationState(newValue, true);
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            onBlur?.(e);

            if (validateOn.includes("onBlur")) {
                updateValidationState(e.target.value, true);
            }
        };

        const getDisplayProps = () => {
            if (!validationState.hasBeenValidated) {
                return {};
            }

            if (!validationState.isValid) {
                return {
                    error: validationState.message
                };
            }

            if (showSuccess && validationState.isValid) {
                return {
                    success: successMessage
                };
            }

            return {};
        };

        return (
            <Input
                inputRef={ref}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                classNames={classNames}
                {...inputProps}
                {...getDisplayProps()}
            />
        );
    }
);

ValidatorInput.displayName = "@luminx/core/ValidatorInput";
