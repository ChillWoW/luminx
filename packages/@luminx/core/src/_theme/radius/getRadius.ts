import { defaultRadiusValues } from "./default";
import { GetCornerRadiusProps, GetRadiusProps, Radius } from "./types";

export const getRadius = (props: GetRadiusProps | Radius) => {
    const { radius, defaultRadius = "md" } =
        typeof props === "string" ? { radius: props as Radius } : props;

    const radiusObj = defaultRadiusValues.find((r) => r.name === radius);

    if (radiusObj) return { borderRadius: radiusObj.value };

    const defaultRadiusObj = defaultRadiusValues.find(
        (r) => r.name === defaultRadius
    );

    return { borderRadius: defaultRadiusObj?.value || "0rem" };
};

export const getCornerRadius = (props: GetCornerRadiusProps) => {
    const { radius, defaultRadius = "md", corner } = props;

    const radiusObj = defaultRadiusValues.find((r) => r.name === radius);
    const actualRadius = radiusObj
        ? radiusObj.value
        : defaultRadiusValues.find((r) => r.name === defaultRadius)?.value ||
          "0rem";

    switch (corner) {
        case "all":
            return { borderRadius: actualRadius };
        case "top":
            return {
                borderTopLeftRadius: actualRadius,
                borderTopRightRadius: actualRadius
            };
        case "bottom":
            return {
                borderBottomLeftRadius: actualRadius,
                borderBottomRightRadius: actualRadius
            };
        case "left":
            return {
                borderTopLeftRadius: actualRadius,
                borderBottomLeftRadius: actualRadius
            };
        case "right":
            return {
                borderTopRightRadius: actualRadius,
                borderBottomRightRadius: actualRadius
            };
        case "topLeft":
            return { borderTopLeftRadius: actualRadius };
        case "topRight":
            return { borderTopRightRadius: actualRadius };
        case "bottomLeft":
            return { borderBottomLeftRadius: actualRadius };
        case "bottomRight":
            return { borderBottomRightRadius: actualRadius };
        default:
            return { borderRadius: actualRadius };
    }
};
