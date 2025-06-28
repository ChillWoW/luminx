import { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    separator?: ReactNode;
    className?: string;
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    href?: string;
    className?: string;
}
