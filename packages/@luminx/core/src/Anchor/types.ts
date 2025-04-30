import { AnchorHTMLAttributes } from "react";

export type AnchorUnderline = "always" | "hover" | "never";

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    target?: string;
    underline?: AnchorUnderline;
}
