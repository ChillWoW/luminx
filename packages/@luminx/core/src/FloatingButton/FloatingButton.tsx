import React, { forwardRef, useState, useEffect, useRef } from "react";
import { FloatingButtonProps, FloatingButtonContextValue } from "./types";
import { FloatingButtonContext } from "./context";
import { FloatingButtonAction } from "./FloatingButtonAction";
import { useTheme } from "../_theme";
import { Portal } from "../Portal";
import { Transition } from "../Transition";

const defaultProps = (
    props: FloatingButtonProps
): Required<
    Omit<
        FloatingButtonProps,
        | "children"
        | "icon"
        | "label"
        | "opened"
        | "onChange"
        | "onClick"
        | "className"
        | "style"
        | "classNames"
        | "portalTarget"
    >
> &
    Pick<
        FloatingButtonProps,
        | "children"
        | "icon"
        | "label"
        | "opened"
        | "onChange"
        | "onClick"
        | "className"
        | "style"
        | "classNames"
        | "portalTarget"
    > => ({
    ...props,
    size: props.size || "md",
    position: props.position || "bottom-right",
    trigger: props.trigger || "click",
    direction: props.direction || "up",
    disabled: props.disabled || false,
    defaultOpened: props.defaultOpened || false,
    animationDuration: props.animationDuration || 200,
    actionSpacing: props.actionSpacing || 16,
    withBlur: props.withBlur || false,
    closeOnActionClick: props.closeOnActionClick !== false,
    closeOnOutsideClick: props.closeOnOutsideClick !== false,
    zIndex: props.zIndex || 1000,
    withinPortal: props.withinPortal !== false,
    withHover: props.withHover || false
});

const FloatingButton = forwardRef<HTMLDivElement, FloatingButtonProps>(
    (props, ref) => {
        const resolvedProps = defaultProps(props);

        const [isOpened, setIsOpened] = useState(resolvedProps.defaultOpened);
        const containerRef = useRef<HTMLDivElement>(null);
        const { theme, cx } = useTheme();

        const currentOpened =
            resolvedProps.opened !== undefined
                ? resolvedProps.opened
                : isOpened;

        useEffect(() => {
            if (!resolvedProps.closeOnOutsideClick) return;

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node) &&
                    currentOpened
                ) {
                    setOpened(false);
                }
            };

            if (currentOpened) {
                document.addEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [currentOpened, resolvedProps.closeOnOutsideClick]);

        const setOpened = (opened: boolean) => {
            if (resolvedProps.opened === undefined) {
                setIsOpened(opened);
            }
            resolvedProps.onChange?.(opened);
        };

        const toggle = () => {
            setOpened(!currentOpened);
        };

        const handleMainButtonClick = () => {
            if (resolvedProps.disabled) return;

            resolvedProps.onClick?.();

            if (resolvedProps.trigger === "click") {
                toggle();
            }
        };

        const handleMouseEnter = () => {
            if (resolvedProps.disabled || resolvedProps.trigger !== "hover")
                return;
            setOpened(true);
        };

        const handleMouseLeave = () => {
            if (resolvedProps.disabled || resolvedProps.trigger !== "hover")
                return;
            setOpened(false);
        };

        const getPositionClasses = () => {
            const styles = {
                "bottom-right": "bottom-6 right-6",
                "bottom-left": "bottom-6 left-6",
                "top-right": "top-6 right-6",
                "top-left": "top-6 left-6"
            };
            return styles[resolvedProps.position];
        };

        const getSizeClasses = () => {
            const styles = {
                xs: "w-10 h-10 text-sm",
                sm: "w-12 h-12 text-sm",
                md: "w-14 h-14 text-base",
                lg: "w-16 h-16 text-lg",
                xl: "w-20 h-20 text-xl"
            };
            return styles[resolvedProps.size];
        };

        const getMainButtonVariant = () => {
            const isLight = theme === "light";

            const light = {
                background:
                    "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
            };

            const dark = {
                background:
                    "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
            };

            return isLight ? light.background : dark.background;
        };

        const getActionPositions = () => {
            if (!resolvedProps.children) return [];

            const children = Array.isArray(resolvedProps.children)
                ? resolvedProps.children
                : [resolvedProps.children];

            const mainButtonSize = getSizeFromProps();
            const actionSize = getActionSizeFromProps();

            return children.map((_, index) => {
                const distance =
                    (index + 1) * (actionSize + resolvedProps.actionSpacing);

                const centerOffset = (mainButtonSize - actionSize) / 2;

                switch (resolvedProps.direction) {
                    case "up":
                        return {
                            transform: `translateY(-${distance}px)`,
                            left: `${centerOffset}px`
                        };
                    case "down":
                        return {
                            transform: `translateY(${distance}px)`,
                            left: `${centerOffset}px`
                        };
                    case "left":
                        return {
                            transform: `translateX(-${distance}px)`,
                            top: `${centerOffset}px`
                        };
                    case "right":
                        return {
                            transform: `translateX(${distance}px)`,
                            top: `${centerOffset}px`
                        };
                    default:
                        return {
                            transform: `translateY(-${distance}px)`,
                            left: `${centerOffset}px`
                        };
                }
            });
        };

        const getSizeFromProps = () => {
            const sizes = { xs: 40, sm: 48, md: 56, lg: 64, xl: 72 };
            return sizes[resolvedProps.size];
        };

        const getActionSizeFromProps = () => {
            const sizes = { xs: 32, sm: 40, md: 48, lg: 56, xl: 64 };
            return sizes[resolvedProps.size];
        };

        const contextValue: FloatingButtonContextValue = {
            opened: currentOpened,
            setOpened,
            toggle,
            closeOnActionClick: resolvedProps.closeOnActionClick,
            size: resolvedProps.size,
            direction: resolvedProps.direction,
            animationDuration: resolvedProps.animationDuration,
            actionSpacing: resolvedProps.actionSpacing,
            disabled: resolvedProps.disabled,
            withHover: resolvedProps.withHover,
            classNames: resolvedProps.classNames
        };

        const renderMainButton = () => (
            <button
                className={cx(
                    "inline-flex items-center justify-center rounded-full font-medium cursor-pointer transition-all duration-200 active:scale-95",
                    resolvedProps.withHover && "hover:scale-110",
                    getSizeClasses(),
                    getMainButtonVariant(),
                    currentOpened && "rotate-45",
                    resolvedProps.disabled &&
                        "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
                    resolvedProps.classNames?.button,
                    resolvedProps.className
                )}
                disabled={resolvedProps.disabled}
                onClick={handleMainButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={resolvedProps.style}
            >
                {resolvedProps.icon && (
                    <span
                        className={cx(
                            "flex items-center justify-center transition-transform duration-200",
                            resolvedProps.classNames?.icon
                        )}
                    >
                        {resolvedProps.icon}
                    </span>
                )}
                {!resolvedProps.icon && resolvedProps.label && (
                    <span
                        className={cx(
                            "flex items-center justify-center",
                            resolvedProps.classNames?.label
                        )}
                    >
                        {resolvedProps.label}
                    </span>
                )}
                {!resolvedProps.icon && !resolvedProps.label && (
                    <span className="text-xl">+</span>
                )}
            </button>
        );

        const renderActions = () => {
            if (!resolvedProps.children) return null;

            const children = Array.isArray(resolvedProps.children)
                ? resolvedProps.children
                : [resolvedProps.children];

            const actionPositions = getActionPositions();

            return children.map((child, index) => (
                <Transition
                    key={index}
                    mounted={currentOpened}
                    transition="scale"
                    duration={resolvedProps.animationDuration}
                    enterDelay={index * 50}
                >
                    <div className="absolute" style={actionPositions[index]}>
                        {child}
                    </div>
                </Transition>
            ));
        };

        const renderBackdrop = () => {
            if (!resolvedProps.withBlur) return null;

            return (
                <Transition
                    mounted={currentOpened}
                    transition="fade"
                    duration={resolvedProps.animationDuration}
                >
                    <div
                        className={cx(
                            "fixed inset-0 bg-black/20",
                            resolvedProps.classNames?.backdrop
                        )}
                        style={{ zIndex: resolvedProps.zIndex - 1 }}
                        onClick={() =>
                            resolvedProps.closeOnOutsideClick &&
                            setOpened(false)
                        }
                    />
                </Transition>
            );
        };

        const content = (
            <FloatingButtonContext.Provider value={contextValue}>
                {renderBackdrop()}
                <div
                    ref={containerRef}
                    className={cx(
                        "fixed",
                        getPositionClasses(),
                        resolvedProps.classNames?.root
                    )}
                    style={{ zIndex: resolvedProps.zIndex }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className={cx(
                            "relative",
                            resolvedProps.classNames?.actions
                        )}
                    >
                        {renderActions()}
                        {renderMainButton()}
                    </div>
                </div>
            </FloatingButtonContext.Provider>
        );

        if (resolvedProps.withinPortal) {
            return (
                <Portal target={resolvedProps.portalTarget}>{content}</Portal>
            );
        }

        return content;
    }
);

FloatingButton.displayName = "@luminx/core/FloatingButton";

const ExtendedFloatingButton = Object.assign(FloatingButton, {
    Action: FloatingButtonAction
});

export { ExtendedFloatingButton as FloatingButton };
