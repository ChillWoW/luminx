import { forwardRef } from "react";
import { cx } from "../_theme";
import { IconProps } from "./types";
import { getRadius, getShadow } from "../_theme";

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      children,
      size = "md",
      radius,
      shadow,
      className,
      classNames,
      component: Component = "div",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-14 h-14",
    };

    return (
      <Component
        ref={ref}
        className={cx(
          "flex items-center justify-center",
          "bg-[var(--luminx-primary-light)]",
          sizeClasses[size],
          classNames?.root,
          className
        )}
        style={{
          ...getRadius(radius),
          ...getShadow(shadow),
        }}
        {...props}
      >
        <div className={classNames?.icon}>{children}</div>
      </Component>
    );
  }
);

Icon.displayName = "@luminx/core/Icon";
