import React from "react";

export type CountdownFormat =
    | "DD:HH:MM:SS"
    | "HH:MM:SS"
    | "MM:SS"
    | "SS"
    | "custom";

export interface CountdownLabels {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
}

export interface CountdownClassNames {
    container?: string;
    unit?: string;
    label?: string;
    separator?: string;
}

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
    targetDate: Date;
    format?: CountdownFormat;
    customFormat?: string;
    labels?: CountdownLabels;
    showLabels?: boolean;
    expiredMessage?: string;
    onComplete?: () => void;
    interval?: number;
    separator?: string;
    className?: string;
    classNames?: CountdownClassNames;
    showLeadingZeros?: boolean;
}

export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
    expired: boolean;
}
