import { TransitionStyles } from "./types";

export const TRANSITIONS: Record<string, TransitionStyles> = {
    fade: {
        in: { opacity: 1 },
        out: { opacity: 0 },
        transitionProperty: "opacity"
    },

    "fade-up": {
        in: { opacity: 1, transform: "translateY(0)" },
        out: { opacity: 0, transform: "translateY(10px)" },
        transitionProperty: "opacity, transform"
    },

    "fade-down": {
        in: { opacity: 1, transform: "translateY(0)" },
        out: { opacity: 0, transform: "translateY(-10px)" },
        transitionProperty: "opacity, transform"
    },

    "fade-left": {
        in: { opacity: 1, transform: "translateX(0)" },
        out: { opacity: 0, transform: "translateX(10px)" },
        transitionProperty: "opacity, transform"
    },

    "fade-right": {
        in: { opacity: 1, transform: "translateX(0)" },
        out: { opacity: 0, transform: "translateX(-10px)" },
        transitionProperty: "opacity, transform"
    },

    scale: {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0.95)" },
        common: { transformOrigin: "center" },
        transitionProperty: "opacity, transform"
    },

    "scale-y": {
        in: { opacity: 1, transform: "scaleY(1)" },
        out: { opacity: 0, transform: "scaleY(0)" },
        common: { transformOrigin: "top" },
        transitionProperty: "opacity, transform"
    },

    "scale-x": {
        in: { opacity: 1, transform: "scaleX(1)" },
        out: { opacity: 0, transform: "scaleX(0)" },
        common: { transformOrigin: "left" },
        transitionProperty: "opacity, transform"
    },

    "skew-up": {
        in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
        out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
        transitionProperty: "opacity, transform"
    },

    "skew-down": {
        in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
        out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
        transitionProperty: "opacity, transform"
    },

    "rotate-left": {
        in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
        out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
        transitionProperty: "opacity, transform"
    },

    "rotate-right": {
        in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
        out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
        transitionProperty: "opacity, transform"
    },

    "slide-down": {
        in: { opacity: 1, transform: "translateY(0)" },
        out: { opacity: 0, transform: "translateY(-100%)" },
        transitionProperty: "opacity, transform"
    },

    "slide-up": {
        in: { opacity: 1, transform: "translateY(0)" },
        out: { opacity: 0, transform: "translateY(100%)" },
        transitionProperty: "opacity, transform"
    },

    "slide-left": {
        in: { opacity: 1, transform: "translateX(0)" },
        out: { opacity: 0, transform: "translateX(100%)" },
        transitionProperty: "opacity, transform"
    },

    "slide-right": {
        in: { opacity: 1, transform: "translateX(0)" },
        out: { opacity: 0, transform: "translateX(-100%)" },
        transitionProperty: "opacity, transform"
    },

    pop: {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0)" },
        common: { transformOrigin: "center" },
        transitionProperty: "opacity, transform"
    },

    "pop-bottom-left": {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0)" },
        common: { transformOrigin: "bottom left" },
        transitionProperty: "opacity, transform"
    },

    "pop-bottom-right": {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0)" },
        common: { transformOrigin: "bottom right" },
        transitionProperty: "opacity, transform"
    },

    "pop-top-left": {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0)" },
        common: { transformOrigin: "top left" },
        transitionProperty: "opacity, transform"
    },

    "pop-top-right": {
        in: { opacity: 1, transform: "scale(1)" },
        out: { opacity: 0, transform: "scale(0)" },
        common: { transformOrigin: "top right" },
        transitionProperty: "opacity, transform"
    }
};
