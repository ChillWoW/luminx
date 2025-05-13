import { forwardRef, createElement } from "react";
import { FlexProps } from "./types";
import { cx } from "../_theme";

const getSpacingClass = (value: string | number | undefined) => {
    if (value === undefined) return "";
    if (typeof value === "number") return `gap-[${value}px]`;

    const spacingMap: Record<string, string> = {
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8"
    };

    return spacingMap[value] || `gap-[${value}]`;
};

const getDirectionClass = (direction: string | undefined) => {
    if (!direction) return "";

    const directionMap: Record<string, string> = {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse"
    };

    return directionMap[direction] || "";
};

const getAlignClass = (align: string | undefined) => {
    if (!align) return "";

    const alignMap: Record<string, string> = {
        "flex-start": "items-start",
        "flex-end": "items-end",
        center: "items-center",
        stretch: "items-stretch",
        baseline: "items-baseline"
    };

    return alignMap[align] || "";
};

const getJustifyClass = (justify: string | undefined) => {
    if (!justify) return "";

    const justifyMap: Record<string, string> = {
        "flex-start": "justify-start",
        "flex-end": "justify-end",
        center: "justify-center",
        "space-between": "justify-between",
        "space-around": "justify-around",
        "space-evenly": "justify-evenly"
    };

    return justifyMap[justify] || "";
};

const getWrapClass = (wrap: string | undefined) => {
    if (!wrap) return "";

    const wrapMap: Record<string, string> = {
        wrap: "flex-wrap",
        nowrap: "flex-nowrap",
        "wrap-reverse": "flex-wrap-reverse"
    };

    return wrapMap[wrap] || "";
};

const getResponsiveClasses = (
    prop: any,
    classGetter: (val: string) => string
) => {
    if (!prop) return "";

    if (typeof prop === "object") {
        const classes = [];

        if (prop.base) classes.push(classGetter(prop.base));
        if (prop.sm) classes.push(`sm:${classGetter(prop.sm)}`);
        if (prop.md) classes.push(`md:${classGetter(prop.md)}`);
        if (prop.lg) classes.push(`lg:${classGetter(prop.lg)}`);
        if (prop.xl) classes.push(`xl:${classGetter(prop.xl)}`);

        return classes.join(" ");
    }

    return classGetter(prop);
};

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    (
        {
            children,
            style,
            className,
            gap,
            rowGap,
            columnGap,
            direction = "row",
            align = "flex-start",
            justify = "flex-start",
            wrap = "nowrap",
            as = "div",
            ...props
        },
        ref
    ) => {
        const gapClasses = getResponsiveClasses(gap, getSpacingClass);
        const rowGapClasses = rowGap
            ? getResponsiveClasses(rowGap, (val) => {
                  if (typeof val === "number") return `row-gap-[${val}px]`;
                  const spacingMap: Record<string, string> = {
                      xs: "row-gap-1",
                      sm: "row-gap-2",
                      md: "row-gap-4",
                      lg: "row-gap-6",
                      xl: "row-gap-8"
                  };
                  return spacingMap[val] || `row-gap-[${val}]`;
              })
            : "";

        const columnGapClasses = columnGap
            ? getResponsiveClasses(columnGap, (val) => {
                  if (typeof val === "number") return `column-gap-[${val}px]`;
                  const spacingMap: Record<string, string> = {
                      xs: "column-gap-1",
                      sm: "column-gap-2",
                      md: "column-gap-4",
                      lg: "column-gap-6",
                      xl: "column-gap-8"
                  };
                  return spacingMap[val] || `column-gap-[${val}]`;
              })
            : "";

        const directionClasses = getResponsiveClasses(
            direction,
            getDirectionClass
        );
        const alignClasses = getResponsiveClasses(align, getAlignClass);
        const justifyClasses = getResponsiveClasses(justify, getJustifyClass);
        const wrapClasses = getResponsiveClasses(wrap, getWrapClass);

        return createElement(
            as as any,
            {
                className: cx(
                    "flex",
                    gapClasses,
                    rowGapClasses,
                    columnGapClasses,
                    directionClasses,
                    alignClasses,
                    justifyClasses,
                    wrapClasses,
                    className
                ),
                style,
                ref,
                ...props
            },
            children
        );
    }
);

Flex.displayName = "@luminx/core/Flex";
