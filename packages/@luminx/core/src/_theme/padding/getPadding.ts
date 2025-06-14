import { defaultPaddingValues } from "./default";
import { Padding } from "./types";

export const getPadding = (padding?: Padding) => {
    const paddingObj = defaultPaddingValues.find((p) => p.name === padding);

    if (paddingObj) return { padding: paddingObj.value };

    const defaultPaddingObj = defaultPaddingValues.find((p) => p.name === "md");

    return { padding: defaultPaddingObj?.value || "0rem" };
};
