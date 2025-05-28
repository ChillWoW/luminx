import { defaultShadowValues } from "./default";
import { Shadow } from "./types";

const shadowMap = new Map(defaultShadowValues.map((s) => [s.name, s.value]));

const shadowHelper = (shadow?: Shadow, fallback: Shadow = "none") => {
    if (shadowMap.has(shadow as string)) return shadowMap.get(shadow as string);

    if (typeof shadow === "number") return `${shadow}px`;
    if (typeof shadow === "string") return shadow;

    return shadowMap.get(fallback) || "none";
};

export const getShadow = (shadow?: Shadow) => ({
    boxShadow: shadowHelper(shadow)
});
