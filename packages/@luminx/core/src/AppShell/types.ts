import { CSSProperties, ReactNode } from "react";

export type AppShellNavbarWidth = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type AppShellAsideWidth = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type AppShellHeaderHeight = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type AppShellFooterHeight = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface AppShellProps {
    children: ReactNode;
    navbar?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    aside?: ReactNode;
    navbarCollapsed?: boolean;
    onNavbarToggle?: () => void;
    navbarWidth?: AppShellNavbarWidth;
    asideWidth?: AppShellAsideWidth;
    headerHeight?: AppShellHeaderHeight;
    footerHeight?: AppShellFooterHeight;
    navbarBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
    withBorder?: boolean;
    layout?: "alt" | "default";
    className?: string;
    style?: CSSProperties;
    classNames?: AppShellClassNames;
}

export interface AppShellNavbarProps {
    children?: ReactNode;
    width?: AppShellNavbarWidth;
    collapsed?: boolean;
    withBorder?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellHeaderProps {
    children?: ReactNode;
    height?: AppShellHeaderHeight;
    withBorder?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellFooterProps {
    children?: ReactNode;
    height?: AppShellFooterHeight;
    withBorder?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellMainProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellAsideProps {
    children?: ReactNode;
    width?: AppShellAsideWidth;
    withBorder?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellNavbarHeaderProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellNavbarFooterProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface AppShellClassNames {
    root?: string;
    navbar?: string;
    header?: string;
    footer?: string;
    main?: string;
    aside?: string;
    navbarHeader?: string;
    navbarFooter?: string;
}

export interface AppShellContextType {
    navbarCollapsed: boolean;
    navbarWidth: AppShellNavbarWidth;
    asideWidth: AppShellAsideWidth;
    headerHeight: AppShellHeaderHeight;
    footerHeight: AppShellFooterHeight;
    withBorder: boolean;
    classNames?: AppShellClassNames;
}
