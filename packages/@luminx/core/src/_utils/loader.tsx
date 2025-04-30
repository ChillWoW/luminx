import { cn } from "..";

export interface ComponentLoaderProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export const ComponentLoader = ({
    width = 4,
    height = 4,
    className
}: ComponentLoaderProps) => {
    return (
        <span
            className={cn(
                `mr-2 inline-block w-${width} h-${height} border-2 border-current border-t-transparent rounded-full animate-spin`,
                className
            )}
            role="status"
            aria-label="loading"
        />
    );
};

ComponentLoader.displayName = "ComponentLoader";
