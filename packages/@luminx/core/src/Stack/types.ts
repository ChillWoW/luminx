import React from "react";

export type StackAlign = "stretch" | "center" | "flex-start" | "flex-end";
export type StackJustify =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around";
export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface StackProps {
  children: React.ReactNode;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  className?: string;
  style?: React.CSSProperties;
}
