import { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { TransitionProps } from "./types";
import { TRANSITIONS } from "./transitions";

export const Transition = ({
    children,
    mounted,
    transition,
    duration = 250,
    timingFunction = "ease",
    enterDelay = 0,
    exitDelay = 0,
    keepMounted = false,
    springConfig,
    onExited,
    onEntered
}: TransitionProps) => {
    const [visible, setVisible] = useState(mounted);

    const getTransition = () => {
        if (typeof transition === "string") {
            return TRANSITIONS[transition] || TRANSITIONS.fade;
        }
        return transition;
    };

    const transitionStyles = getTransition();

    const getFinalConfig = () => {
        if (springConfig) return springConfig;

        switch (timingFunction) {
            case "ease-in":
                return { ...config.gentle, tension: 200 };
            case "ease-out":
                return { ...config.gentle, friction: 14 };
            case "ease-in-out":
                return config.gentle;
            case "linear":
                return config.default;
            default:
                return {
                    ...config.default,
                    duration
                };
        }
    };

    const [styles, api] = useSpring(() => ({
        ...transitionStyles.out,
        ...(transitionStyles.common || {}),
        config: getFinalConfig(),
        immediate: true,
        onRest: (result) => {
            if (!result.value.opacity) {
                !keepMounted && setVisible(false);
                onExited?.();
            } else {
                onEntered?.();
            }
        }
    }));

    useEffect(() => {
        if (mounted) {
            setVisible(true);
            const timeout = window.setTimeout(() => {
                api.start({
                    ...transitionStyles.in,
                    ...(transitionStyles.common || {}),
                    config: getFinalConfig(),
                    immediate: false
                });
            }, enterDelay);

            return () => clearTimeout(timeout);
        } else {
            const timeout = window.setTimeout(() => {
                api.start({
                    ...transitionStyles.out,
                    ...(transitionStyles.common || {}),
                    config: getFinalConfig(),
                    immediate: false
                });
            }, exitDelay);

            return () => clearTimeout(timeout);
        }
    }, [mounted, api, enterDelay, exitDelay, transitionStyles]);

    if (!visible) {
        return null;
    }

    const AnimatedDiv = animated("div");

    return (
        <AnimatedDiv style={styles}>
            {typeof children === "function"
                ? children(styles as any)
                : children}
        </AnimatedDiv>
    );
};

Transition.displayName = "Transition";
