"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Check if hovering over interactive elements
        const handlePointerCheck = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = Boolean(
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-grab") ||
                target.classList.contains("cursor-pointer") ||
                window.getComputedStyle(target).cursor === "pointer"
            );

            setIsPointer(isInteractive);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousemove", handlePointerCheck);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousemove", handlePointerCheck);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    // Hide on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Hide default cursor globally */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Custom cursor - Heart Shape */}
            <div
                className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out flex items-center justify-center"
                style={{
                    left: position.x,
                    top: position.y,
                    opacity: isVisible ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
                    // Using drop-shadow to create an outline effect if needed, but fill="white" + difference = inverted
                    mixBlendMode: "difference",
                }}
            >
                {/* Heart SVG */}
                <svg
                    width={isPointer ? "50" : "40"}
                    height={isPointer ? "50" : "40"}
                    viewBox="0 0 24 24"
                    fill="white" // White fill with difference blend mode = inverted colors
                    style={{
                        transition: "width 0.15s ease, height 0.15s ease",
                    }}
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>

                {/* Inner dot just for precision */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                    style={{
                        width: "4px",
                        height: "4px",
                    }}
                />
            </div>
        </>
    );
}
