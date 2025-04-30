import { forwardRef } from "react";
import { FieldsetProps } from "./types";
import { cn, getRadius } from "..";

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
    (
        {
            legend,
            children,
            radius = "md",
            disabled,
            classNames,
            style,
            ...props
        },
        ref
    ) => {
        return (
            <fieldset
                ref={ref}
                className={cn(
                    "border border-[var(--lumin-border)] p-4",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.root
                )}
                style={{
                    ...getRadius(radius),
                    ...style
                }}
                disabled={disabled}
                {...props}
            >
                {legend && (
                    <legend
                        className={cn(
                            "px-2 text-sm font-medium text-[var(--lumin-hint)]",
                            disabled && "opacity-60",
                            classNames?.legend
                        )}
                    >
                        {legend}
                    </legend>
                )}
                <div className="space-y-2">{children}</div>
            </fieldset>
        );
    }
);
