import { Radius } from "./types";

export const defaultRadiusValues: { name: Radius; value: string }[] = [
    { name: "none", value: "0" }, // 0px
    { name: "xs", value: "0.125rem" }, // 2px
    { name: "sm", value: "0.25rem" }, // 4px
    { name: "md", value: "0.375rem" }, // 6px
    { name: "lg", value: "0.5rem" }, // 8px
    { name: "xl", value: "0.75rem" }, // 12px
    { name: "2xl", value: "1rem" }, // 16px
    { name: "3xl", value: "1.5rem" }, // 24px
    { name: "full", value: "9999px" } // full rounding
];
