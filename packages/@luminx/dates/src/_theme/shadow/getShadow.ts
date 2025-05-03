import { defaultShadowValues } from "./default";
import { Shadow } from "./types";

export const getShadow = (shadow?: Shadow) => {
    const shadowObj = defaultShadowValues.find((s) => s.name === shadow);

    if (shadowObj) return { boxShadow: shadowObj.value };

    const defaultShadowObj = defaultShadowValues.find((s) => s.name === "none");

    return { boxShadow: defaultShadowObj?.value || "none" };
};

// Hook-based version for components
export const useShadow = (shadow?: Shadow) => {
    const shadowToUse = shadow || "none";
    const shadowObj = defaultShadowValues.find((s) => s.name === shadowToUse);

    return shadowObj?.value || "none";
};
