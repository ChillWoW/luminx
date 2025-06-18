import { ReactNode } from "react";

export type AccordionChevronPosition = "left" | "right";

export interface AccordionClassNames {
    root?: string;
    item?: string;
    control?: string;
    label?: string;
    chevron?: string;
    panel?: string;
}

export interface AccordionProps {
    children: ReactNode;
    multiple?: boolean;
    value?: string | string[] | null;
    defaultValue?: string | string[] | null;
    onChange?: (value: string | string[] | null) => void;
    chevron?: ReactNode;
    chevronPosition?: AccordionChevronPosition;
    chevronSize?: number;
    disableChevronRotation?: boolean;
    transitionDuration?: number;
    className?: string;
    classNames?: AccordionClassNames;
}

export interface AccordionItemProps {
    children: ReactNode;
    value: string;
    className?: string;
}

export interface AccordionControlProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    icon?: ReactNode;
    disabled?: boolean;
}

export interface AccordionPanelProps {
    children: ReactNode;
    className?: string;
}

export interface AccordionContextValue {
    value: string | string[] | null;
    onChange: (itemValue: string) => void;
    multiple: boolean;
    chevron?: ReactNode;
    chevronPosition: AccordionChevronPosition;
    chevronSize: number;
    disableChevronRotation: boolean;
    transitionDuration: number;
    classNames?: AccordionClassNames;
}

export interface AccordionItemContextValue {
    value: string;
    isActive: boolean;
}
