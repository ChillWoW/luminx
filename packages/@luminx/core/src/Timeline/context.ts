import { createContext, useContext } from "react";
import { TimelineContextValue } from "./types";

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function useTimelineContext() {
    const context = useContext(TimelineContext);

    if (!context) {
        throw new Error(
            "Timeline components must be used within a Timeline provider"
        );
    }

    return context;
}

export const TimelineProvider = TimelineContext.Provider;
