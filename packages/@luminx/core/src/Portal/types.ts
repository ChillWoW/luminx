import React from "react";

export interface PortalProps {
    /** Portal children, for example, modal or popover */
    children: React.ReactNode;

    /** DOM node where portal should be rendered, by default portal is rendered in document.body */
    target?: HTMLElement | string | null;

    /** Determines whether the same target node should be reused for multiple portals */
    reuseTargetNode?: boolean;
}

export interface OptionalPortalProps extends Omit<PortalProps, "children"> {
    /** Portal children, for example, modal or popover */
    children: React.ReactNode;

    /** Determines whether content should be rendered in portal */
    withinPortal?: boolean;
}
