import React from "react";

export interface PortalProps {
    children: React.ReactNode;
    target?: HTMLElement | string | null;
    reuseTargetNode?: boolean;
}

export interface OptionalPortalProps extends Omit<PortalProps, "children"> {
    children: React.ReactNode;
    withinPortal?: boolean;
}
