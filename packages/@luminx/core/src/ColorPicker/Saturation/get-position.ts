import { RefObject } from "react";

export const getPosition = (
    clientX: number,
    clientY: number,
    ref: RefObject<HTMLDivElement | null>
) => {
    if (!ref || !ref.current) return { s: 0, v: 0 };

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = Math.max(0, Math.min(clientX - rect.left, width));
    const y = Math.max(0, Math.min(clientY - rect.top, height));

    return {
        s: x / width,
        v: 1 - y / height
    };
};
