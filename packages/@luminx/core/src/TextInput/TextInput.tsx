import React from "react";
import { Input } from "../Input/Input";
import { InputProps } from "../Input/types";

export const TextInput = (props: InputProps) => {
    return <Input type="text" {...props} />;
};
