import { createContext, useContext } from "react";
import { TimelineContextValue } from "./types";

export const TimelineContext = createContext<TimelineContextValue | null>(null);

export const useTimelineContext = () => {
    const context = useContext(TimelineContext);
    if (!context) {
        throw new Error("Timeline components must be used within Timeline");
    }
    return context;
};
