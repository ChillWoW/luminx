import { Shadow } from "./types";

export const defaultShadowValues: { name: Shadow; value: string }[] = [
    { name: "none", value: "none" },
    { name: "xs", value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
    {
        name: "sm",
        value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    },
    {
        name: "md",
        value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    {
        name: "lg",
        value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    {
        name: "xl",
        value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    { name: "2xl", value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
    { name: "3xl", value: "0 35px 60px -15px rgba(0, 0, 0, 0.3)" },
    { name: "4xl", value: "0 50px 75px -20px rgba(0, 0, 0, 0.35)" }
];
