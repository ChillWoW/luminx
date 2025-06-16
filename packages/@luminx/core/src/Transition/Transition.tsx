import { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    Variants,
    useAnimationControls
} from "framer-motion";
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
    onExited,
    onEntered,
    className
}: TransitionProps) => {
    const [visible, setVisible] = useState(mounted);
    const controls = useAnimationControls();

    const getTransition = () => {
        if (typeof transition === "string") {
            return TRANSITIONS[transition] || TRANSITIONS.fade;
        }
        return transition;
    };

    const transitionStyles = getTransition();

    const getEasing = () => {
        switch (timingFunction) {
            case "ease-in":
                return [0.4, 0, 1, 1];
            case "ease-out":
                return [0, 0, 0.2, 1];
            case "ease-in-out":
                return [0.4, 0, 0.2, 1];
            case "linear":
                return [0, 0, 1, 1];
            default:
                return [0.25, 0.1, 0.25, 1];
        }
    };

    useEffect(() => {
        if (mounted) {
            setVisible(true);
        } else if (!keepMounted) {
        }
    }, [mounted, keepMounted]);

    const convertStyles = (styles: Record<string, any>) => {
        const result: Record<string, any> = {};
        for (const key in styles) {
            result[key] = styles[key];
        }
        return result;
    };

    const initialStyles = convertStyles({
        ...transitionStyles.out,
        ...(transitionStyles.common || {})
    });

    const animateStyles = convertStyles({
        ...transitionStyles.in,
        ...(transitionStyles.common || {})
    });

    const exitStyles = convertStyles({
        ...transitionStyles.out,
        ...(transitionStyles.common || {})
    });

    const variants: Variants = {
        initial: initialStyles,
        animate: animateStyles,
        exit: exitStyles
    };

    const currentStyles = mounted ? animateStyles : initialStyles;

    return (
        <AnimatePresence
            onExitComplete={() => {
                !keepMounted && setVisible(false);
                onExited?.();
            }}
        >
            {(mounted || (keepMounted && visible)) && (
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{
                        duration: duration / 1000,
                        ease: getEasing(),
                        delay: mounted ? enterDelay / 1000 : exitDelay / 1000
                    }}
                    onAnimationComplete={() => {
                        if (mounted) {
                            onEntered?.();
                        }
                    }}
                    className={className}
                >
                    {typeof children === "function"
                        ? children(currentStyles)
                        : children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Transition.displayName = "@luminx/core/Transition";
