"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const InfinityIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
);

export default function Finale() {
    const sectionRef = useRef<HTMLElement>(null);
    const messageRef = useRef<HTMLHeadingElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const heartRef = useRef<HTMLDivElement>(null);
    const [hasTriggered, setHasTriggered] = useState(false);

    const triggerConfetti = () => {
        if (hasTriggered) return;
        setHasTriggered(true);

        // Romantic pink/red confetti colors
        const colors = ["#FF6B9D", "#FFB6C1", "#E91E63", "#FFC0CB", "#FF4757", "#E8B4B8"];

        // First burst
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors,
            gravity: 0.8,
            shapes: ["circle"],
        });

        // Second slower burst
        setTimeout(() => {
            confetti({
                particleCount: 40,
                spread: 100,
                origin: { y: 0.5 },
                colors,
                gravity: 0.5,
                scalar: 1.3,
            });
        }, 500);

        // Third gentle burst from sides
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 120,
                origin: { y: 0.4, x: 0.25 },
                colors,
                gravity: 0.6,
            });
            confetti({
                particleCount: 30,
                spread: 120,
                origin: { y: 0.4, x: 0.75 },
                colors,
                gravity: 0.6,
            });
        }, 1000);

        // Extra celebration burst!
        setTimeout(() => {
            confetti({
                particleCount: 60,
                spread: 160,
                origin: { y: 0.3 },
                colors,
                gravity: 0.7,
                scalar: 1.5,
            });
        }, 1500);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Message reveal
            if (messageRef.current) {
                gsap.from(messageRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        onEnter: () => triggerConfetti(),
                    },
                    opacity: 0,
                    scale: 0.8,
                    duration: 1.5,
                    ease: "power3.out",
                });
            }

            // Name reveal
            if (nameRef.current) {
                gsap.from(nameRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    },
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    delay: 0.8,
                    ease: "power2.out",
                });
            }

            // Pulsing heart
            if (heartRef.current) {
                gsap.to(heartRef.current, {
                    scale: 1.15,
                    duration: 0.7,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const finaleMessage = `I love you Parleen, my sweetheart, beyond everything, beyond anyone, beyond anything, beyond this world. Nothing matters more to me than you, and it will always be you my baby. I love you beyond the whole universe and I will love you forever no matter what. wish you happy birthday again sweetheart<3`;

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
            style={{
                background: `radial-gradient(
          ellipse 80% 60% at center,
          rgba(255, 107, 157, 0.3) 0%,
          rgba(233, 30, 99, 0.15) 30%,
          rgba(139, 10, 80, 0.1) 50%,
          rgba(45, 27, 46, 1) 80%
        )`,
            }}
        >
            {/* Soft glow behind text */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(
            circle at center,
            rgba(255, 107, 157, 0.2) 0%,
            transparent 50%
          )`,
                    filter: "blur(60px)",
                }}
            />

            {/* Pulsing Heart */}
            <div ref={heartRef} className="mb-8 relative z-10 text-rose-pink">
                <HeartIcon className="w-20 h-20" />
            </div>

            {/* Main Message */}
            <h1
                ref={messageRef}
                className="font-display font-light italic text-cream-pink text-center relative z-10 max-w-3xl mx-auto mb-8"
                style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1.8 }}
            >
                {finaleMessage}
            </h1>

            {/* Big I Love You */}
            <h2
                ref={nameRef}
                className="font-display font-light text-rose-pink text-center relative z-10 flex items-center gap-4"
                style={{ fontSize: "clamp(36px, 8vw, 80px)", lineHeight: 1.1 }}
            >
                I Love You Forever
                <InfinityIcon className="w-12 h-12 md:w-16 md:h-16" />
            </h2>

            {/* Name */}
            <p
                className="font-display font-light text-soft-pink text-center mt-4 relative z-10 tracking-[0.3em]"
                style={{ fontSize: "clamp(24px, 5vw, 48px)" }}
            >
                PARLEEN
            </p>

            {/* Decorative hearts */}
            <div className="mt-12 relative z-10 flex gap-4 items-center">
                <HeartIcon className="w-7 h-7 text-soft-pink" />
                <HeartIcon className="w-10 h-10 text-rose-pink" />
                <HeartIcon className="w-7 h-7 text-soft-pink" />
            </div>

            {/* Floating hearts decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${8 + i * 8}%`,
                            top: `${15 + (i % 4) * 20}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${2 + (i % 3)}s`,
                        }}
                    >
                        <HeartIcon className={`w-4 h-4 ${i % 2 === 0 ? 'text-rose-pink/30' : 'text-soft-pink/30'}`} />
                    </div>
                ))}
            </div>
        </section>
    );
}
