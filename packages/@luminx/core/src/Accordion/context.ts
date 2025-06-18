import { createContext, useContext } from "react";
import { AccordionContextValue, AccordionItemContextValue } from "./types";

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
    null
);

export const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            "Accordion components must be used within an Accordion component"
        );
    }
    return context;
};

export const useAccordionItem = () => {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error(
            "AccordionControl and AccordionPanel must be used within an AccordionItem component"
        );
    }
    return context;
};

export { AccordionContext, AccordionItemContext };
