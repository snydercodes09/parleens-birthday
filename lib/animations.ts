import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Standard scroll-triggered reveal animation
 * Elements fade in and rise gently when scrolling into view
 */
export const createScrollReveal = (
    element: string | Element | Element[],
    options?: {
        y?: number;
        duration?: number;
        delay?: number;
        stagger?: number;
        start?: string;
    }
) => {
    const defaults = {
        y: 60,
        duration: 1,
        delay: 0,
        stagger: 0.15,
        start: "top 80%",
    };
    const config = { ...defaults, ...options };

    return gsap.from(element, {
        scrollTrigger: {
            trigger: element as string,
            start: config.start,
            toggleActions: "play none none reverse",
        },
        y: config.y,
        opacity: 0,
        duration: config.duration,
        delay: config.delay,
        stagger: config.stagger,
        ease: "power2.out",
    });
};

/**
 * Staggered text line animation for headlines
 */
export const createLineReveal = (
    lines: string | Element | Element[],
    options?: {
        delay?: number;
        staggerDelay?: number;
    }
) => {
    const defaults = {
        delay: 0.3,
        staggerDelay: 0.2,
    };
    const config = { ...defaults, ...options };

    return gsap.from(lines, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: config.staggerDelay,
        delay: config.delay,
    });
};

/**
 * Parallax effect for background images
 */
export const createParallax = (
    element: string | Element,
    options?: {
        yPercent?: number;
        scrub?: number;
    }
) => {
    const defaults = {
        yPercent: -20,
        scrub: 1,
    };
    const config = { ...defaults, ...options };

    return gsap.to(element, {
        scrollTrigger: {
            trigger: element as string,
            start: "top bottom",
            end: "bottom top",
            scrub: config.scrub,
        },
        yPercent: config.yPercent,
        ease: "none",
    });
};

/**
 * Fade in animation for body text and CTAs
 */
export const createFadeIn = (
    element: string | Element,
    options?: {
        delay?: number;
        duration?: number;
    }
) => {
    const defaults = {
        delay: 1.2,
        duration: 1,
    };
    const config = { ...defaults, ...options };

    return gsap.from(element, {
        opacity: 0,
        duration: config.duration,
        delay: config.delay,
        ease: "power2.out",
    });
};

/**
 * Scale and fade entrance for cards or images
 */
export const createScaleReveal = (
    elements: string | Element | Element[],
    options?: {
        scale?: number;
        stagger?: number;
        duration?: number;
        onComplete?: () => void;
    }
) => {
    const defaults = {
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
    };
    const config = { ...defaults, ...options };

    return gsap.from(elements, {
        scrollTrigger: {
            trigger: elements as string,
            start: "top 80%",
        },
        opacity: 0,
        scale: config.scale,
        y: 40,
        stagger: config.stagger,
        duration: config.duration,
        ease: "power2.out",
        onComplete: config.onComplete,
    });
};

export { gsap, ScrollTrigger };
