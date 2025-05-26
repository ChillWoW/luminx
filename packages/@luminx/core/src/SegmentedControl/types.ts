import { HTMLAttributes, ReactNode } from "react";
import { Radius, Shadow } from "../_theme";

export type SegmentedControlSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SegmentedControlOrientation = "horizontal" | "vertical";

export type SegmentedControlItem =
    | string
    | {
          value: string;
          label: ReactNode;
          icon?: ReactNode;
          disabled?: boolean;
      };

export type SegmentedControlData = SegmentedControlItem[];

export interface SegmentedControlProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    data: SegmentedControlData;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    size?: SegmentedControlSize;
    radius?: Radius;
    shadow?: Shadow;
    fullWidth?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    orientation?: SegmentedControlOrientation;
    className?: string;
    classNames?: SegmentedControlClassNames;
}

export interface SegmentedControlClassNames {
    root?: string;
    control?: string;
    item?: string;
    activeItem?: string;
    input?: string;
    label?: string;
    icon?: string;
    indicator?: string;
    innerLabel?: string;
}
