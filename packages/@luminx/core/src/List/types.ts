import React from "react";

export type ListStyleType = "disc" | "circle" | "square" | "decimal" | "none";
export type ListSize = "xs" | "sm" | "md" | "lg" | "xl" | string | number;

export interface ListContextValue {
  spacing: React.CSSProperties["marginTop"] | number;
  center: boolean;
  icon: React.ReactNode;
  size: ListProps["size"];
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  type?: "ordered" | "unordered";
  listStyleType?: ListStyleType;
  size?: ListSize;
  icon?: React.ReactNode;
  spacing?: React.CSSProperties["marginTop"] | number;
  center?: boolean;
  withPadding?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * @deprecated Getting removed soon
   */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
