import { defaultShadowValues } from "./default";
import { GetShadowProps, Shadow } from "./types";

export const getShadow = (props: GetShadowProps | Shadow) => {
    const { shadow, defaultShadow = "none" } =
        typeof props === "string" ? { shadow: props as Shadow } : props;

    const shadowObj = defaultShadowValues.find((s) => s.name === shadow);

    if (shadowObj) return { boxShadow: shadowObj.value };

    const defaultShadowObj = defaultShadowValues.find(
        (s) => s.name === defaultShadow
    );

    return { boxShadow: defaultShadowObj?.value || "none" };
};
