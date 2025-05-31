import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    ReactElement
} from "react";
import { CardProps } from "./types";
import { useTheme } from "../_theme";
import { CardSection } from "./CardSection";

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, withBorder, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        const getBorder = () => {
            if (!withBorder) return "";

            switch (theme) {
                case "light":
                    return "border border-[var(--luminx-light-border)]";
                default:
                    return "border border-[var(--luminx-dark-border)]";
            }
        };

        return (
            <div
                ref={ref}
                className={cx(
                    theme === "light"
                        ? "bg-[var(--luminx-light-background)]"
                        : "bg-[var(--luminx-dark-background)]",
                    "rounded-md",
                    getBorder(),
                    className
                )}
                {...props}
            >
                {Children.map(children, (child, index) => {
                    if (isValidElement(child)) {
                        const element = child as ReactElement<{
                            className?: string;
                        }>;

                        // Check if this is a Card.Section component
                        const isCardSection = element.type === CardSection;

                        return cloneElement(element, {
                            className: cx(
                                // Only add padding if it's NOT a Card.Section
                                !isCardSection ? "p-2" : "",
                                element.props.className
                            )
                        });
                    }
                    return child;
                })}
            </div>
        );
    }
);

const ExtendedCard = Object.assign(Card, {
    Section: CardSection
});

ExtendedCard.displayName = "@luminx/core/Card";

export { ExtendedCard as Card };
