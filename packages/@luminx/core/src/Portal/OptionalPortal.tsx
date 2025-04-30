import React from "react";
import { Portal } from "./Portal";
import { OptionalPortalProps } from "./types";

export const OptionalPortal = ({
    children,
    withinPortal = false,
    ...others
}: OptionalPortalProps) => {
    if (withinPortal) {
        return <Portal {...others}>{children}</Portal>;
    }

    return <>{children}</>;
};

export default OptionalPortal;
