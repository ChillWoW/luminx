import { defaultRadiusValues } from "./default";
import { GetCornerRadiusProps, Radius } from "./types";

const radiusMap = new Map(defaultRadiusValues.map((r) => [r.name, r.value]));

const radiusHelper = (radius?: Radius, fallback: Radius = "md") => {
    if (radiusMap.has(radius as string))
        return radiusMap.get(radius as string)!;

    if (typeof radius === "number") return `${radius}px`;
    if (typeof radius === "string") return radius;

    return radiusMap.get(fallback) || "0rem";
};

export const getRadius = (radius?: Radius) => ({
    borderRadius: radiusHelper(radius)
});

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
