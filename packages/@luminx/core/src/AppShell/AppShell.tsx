import { forwardRef } from "react";
import { AppShellProps } from "./types";
import { useTheme } from "../_theme";
import { AppShellContext } from "./context";
import { AppShellNavbar } from "./AppShellNavbar";
import { AppShellHeader } from "./AppShellHeader";
import { AppShellFooter } from "./AppShellFooter";
import { AppShellMain } from "./AppShellMain";
import { AppShellAside } from "./AppShellAside";
import { AppShellNavbarHeader } from "./AppShellNavbarHeader";
import { AppShellNavbarFooter } from "./AppShellNavbarFooter";

const AppShell = forwardRef<HTMLDivElement, AppShellProps>((props, ref) => {
    const {
        children,
        navbar,
        header,
        footer,
        aside,
        navbarCollapsed = false,
        navbarWidth = "md",
        asideWidth = "md",
        headerHeight = "md",
        footerHeight = "md",
        withBorder = false,
        layout = "default",
        className,
        style,
        classNames,
        ...rest
    } = props;

    const { theme, cx } = useTheme();

    const getSizeValue = (size: string | number, type: "width" | "height") => {
        if (typeof size === "number") return `${size}px`;

        const sizeMap = {
            xs: type === "width" ? "200px" : "48px",
            sm: type === "width" ? "240px" : "56px",
            md: type === "width" ? "280px" : "64px",
            lg: type === "width" ? "320px" : "72px",
            xl: type === "width" ? "360px" : "80px"
        };

        return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
    };

    const getBorder = () => {
        if (!withBorder) return "";
        return theme === "light"
            ? "border-[var(--luminx-light-border)]"
            : "border-[var(--luminx-dark-border)]";
    };

    const contextValue = {
        navbarCollapsed,
        navbarWidth,
        asideWidth,
        headerHeight,
        footerHeight,
        withBorder,
        classNames
    };

    const navbarWidthValue = getSizeValue(navbarWidth, "width");
    const asideWidthValue = getSizeValue(asideWidth, "width");
    const headerHeightValue = getSizeValue(headerHeight, "height");
    const footerHeightValue = getSizeValue(footerHeight, "height");

    return (
        <AppShellContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cx(
                    "min-h-screen flex flex-col",
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    classNames?.root,
                    className
                )}
                style={
                    {
                        ...style,
                        "--appshell-navbar-width": navbarCollapsed
                            ? "0px"
                            : navbarWidthValue,
                        "--appshell-aside-width": asideWidthValue,
                        "--appshell-header-height": headerHeightValue,
                        "--appshell-footer-height": footerHeightValue
                    } as React.CSSProperties
                }
                {...rest}
            >
                {header && (
                    <div
                        className="flex-shrink-0"
                        style={{ height: headerHeightValue }}
                    >
                        {header}
                    </div>
                )}

                <div className="flex flex-1 min-h-0">
                    {navbar && !navbarCollapsed && (
                        <div
                            className="flex-shrink-0"
                            style={{ width: navbarWidthValue }}
                        >
                            {navbar}
                        </div>
                    )}

                    <div className="flex flex-1 min-w-0">
                        <div className="flex-1 min-w-0">{children}</div>

                        {aside && (
                            <div
                                className="flex-shrink-0"
                                style={{ width: asideWidthValue }}
                            >
                                {aside}
                            </div>
                        )}
                    </div>
                </div>

                {footer && (
                    <div
                        className="flex-shrink-0"
                        style={{ height: footerHeightValue }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </AppShellContext.Provider>
    );
});

const ExtendedAppShell = Object.assign(AppShell, {
    Navbar: AppShellNavbar,
    Header: AppShellHeader,
    Footer: AppShellFooter,
    Main: AppShellMain,
    Aside: AppShellAside,
    NavbarHeader: AppShellNavbarHeader,
    NavbarFooter: AppShellNavbarFooter
});

ExtendedAppShell.displayName = "@luminx/core/AppShell";

export { ExtendedAppShell as AppShell };
