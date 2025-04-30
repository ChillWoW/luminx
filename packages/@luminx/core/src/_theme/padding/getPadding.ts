import { defaultPaddingValues } from "./default";
import { GetPaddingProps, Padding } from "./types";

export const getPadding = (props: GetPaddingProps | Padding) => {
    const { padding, defaultPadding = "md" } =
        typeof props === "string" ? { padding: props as Padding } : props;

    const paddingObj = defaultPaddingValues.find((p) => p.name === padding);

    if (paddingObj) return { padding: paddingObj.value };

    const defaultPaddingObj = defaultPaddingValues.find(
        (p) => p.name === defaultPadding
    );

    return { padding: defaultPaddingObj?.value || "0rem" };
};
