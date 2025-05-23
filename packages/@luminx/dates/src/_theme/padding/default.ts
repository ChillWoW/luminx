import { Padding } from "./types";

export const defaultPaddingValues: { name: Padding; value: string }[] = [
    { name: "none", value: "0" }, // 0px
    { name: "xs", value: "0.25rem" }, // 4px
    { name: "sm", value: "0.5rem" }, // 8px
    { name: "md", value: "0.75rem" }, // 12px
    { name: "lg", value: "1rem" }, // 16px
    { name: "xl", value: "1.5rem" }, // 24px
    { name: "2xl", value: "2rem" }, // 32px
    { name: "3xl", value: "3rem" }, // 48px
    { name: "4xl", value: "4rem" } // 64px
];
