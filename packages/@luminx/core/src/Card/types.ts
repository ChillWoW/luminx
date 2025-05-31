import { ReactNode } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    withBorder?: boolean;
    className?: string;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    withDivider?: boolean;
    className?: string;
}
