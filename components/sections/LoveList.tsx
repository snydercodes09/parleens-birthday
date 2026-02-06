"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// SVG Icons
const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const FlowerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
);

interface LoveItem {
    text: string;
}

interface LoveListProps {
    items?: LoveItem[];
}

// Your 20 things from TO-DO.md!
const defaultItems: LoveItem[] = [
    { text: "How cute you are when you get angry at me for silly things" },
    { text: "How you laugh at my silly jokes and make my heart overflow with love" },
    { text: "When you send me your gorgeous photos and my heart starts racing with butterflies" },
    { text: "How cute you sound when you talk to me in your cutu voice" },
    { text: "Your voice, which is my favorite sound in the world" },
    { text: "Your songs, they are so soothing and your voice calms my heart" },
    { text: "Your silly and dumb questions that always make me smile" },
    { text: "How gorgeous, beautiful, and ethereal you are" },
    { text: "The way you make me feel loved" },
    { text: "How important I am to you" },
    { text: "How much you care about me" },
    { text: "How your eyes brighten up when you're with me" },
    { text: "Your smile" },
    { text: "Your dimple" },
    { text: "The way you smell, my favorite fragrance is you" },
    { text: "Your gorgeous eyes" },
    { text: "Your mole on your chin" },
    { text: "Your body shape" },
    { text: "The way you say 'I love you'" },
    { text: "I love you so much, I love you more than anything else" },
];

interface CardPosition {
    x: number;
    y: number;
    rotation: number;
    zIndex: number;
}

export default function LoveList({ items = defaultItems }: LoveListProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<CardPosition[]>([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [dragging, setDragging] = useState<number | null>(null);
    const dragInfo = useRef<{ startX: number; startY: number; cardStartX: number; cardStartY: number } | null>(null);
    const [maxZ, setMaxZ] = useState(25);

    // Initialize card positions (stacked)
    useEffect(() => {
        const initialPositions = items.map((_, index) => ({
            x: (index - currentCard) * 5,
            y: (index - currentCard) * 5,
            rotation: (Math.random() - 0.5) * 8,
            zIndex: items.length - Math.abs(index - currentCard),
        }));
        setPositions(initialPositions);
    }, [items, currentCard]);

    // GSAP entrance animation
    useEffect(() => {
        if (positions.length === 0) return;

        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll(".love-card");
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.9,
                y: 40,
                stagger: 0.05,
                duration: 0.6,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [positions.length]);

    // Navigate to next card
    const nextCard = () => {
        if (currentCard < items.length - 1) {
            setCurrentCard(prev => prev + 1);
            setMaxZ(z => z + 1);
        }
    };

    // Navigate to previous card
    const prevCard = () => {
        if (currentCard > 0) {
            setCurrentCard(prev => prev - 1);
            setMaxZ(z => z + 1);
        }
    };

    // Pointer down
    const onPointerDown = (e: React.PointerEvent, index: number) => {
        setDragging(index);
        setMaxZ(z => z + 1);

        dragInfo.current = {
            startX: e.clientX,
            startY: e.clientY,
            cardStartX: positions[index]?.x || 0,
            cardStartY: positions[index]?.y || 0,
        };

        setPositions(prev => {
            const next = [...prev];
            next[index] = { ...next[index], zIndex: maxZ + 1 };
            return next;
        });

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    // Pointer move
    const onPointerMove = (e: React.PointerEvent, index: number) => {
        if (dragging !== index || !dragInfo.current) return;

        const startX = dragInfo.current.startX;
        const startY = dragInfo.current.startY;
        const cardStartX = dragInfo.current.cardStartX;
        const cardStartY = dragInfo.current.cardStartY;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        setPositions(prev => {
            const next = [...prev];
            next[index] = {
                ...next[index],
                x: cardStartX + dx,
                y: cardStartY + dy,
            };
            return next;
        });
    };

    // Pointer up
    const onPointerUp = (e: React.PointerEvent, index: number) => {
        if (dragging === index) {
            setPositions(prev => {
                const next = [...prev];
                next[index] = {
                    ...next[index],
                    rotation: (Math.random() - 0.5) * 6,
                };
                return next;
            });
            setDragging(null);
            dragInfo.current = null;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 overflow-hidden"
            style={{
                background: `radial-gradient(
          ellipse at center,
          rgba(255, 107, 157, 0.2) 0%,
          rgba(45, 27, 46, 1) 70%
        )`,
            }}
        >
            {/* Section Title */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-[1]">
                <h2
                    className="font-display font-light text-cream-pink flex items-center justify-center gap-3"
                    style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.15 }}
                >
                    <FlowerIcon className="w-8 h-8 md:w-10 md:h-10 text-soft-pink" />
                    Things I Love About You
                    <FlowerIcon className="w-8 h-8 md:w-10 md:h-10 text-soft-pink" />
                </h2>
                <div className="w-[60px] h-px bg-rose-pink/50 mx-auto mt-4" />
            </div>

            {/* Cards Container */}
            <div
                ref={containerRef}
                className="relative w-full h-[60vh] md:h-[70vh] flex justify-center items-center"
            >
                {items.map((item, index) => {
                    const position = positions[index] || { x: 0, y: 0, rotation: 0, zIndex: 1 };
                    const isDragging = dragging === index;
                    const isTopCard = index === currentCard;

                    return (
                        <div
                            key={index}
                            className={`love-card absolute w-[280px] h-[320px] md:w-[320px] md:h-[380px] 
                         rounded-2xl select-none cursor-grab active:cursor-grabbing
                         transition-all duration-300 ${isTopCard ? 'ring-2 ring-rose-pink/50' : ''}`}
                            style={{
                                zIndex: position.zIndex,
                                transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg) scale(${isDragging ? 1.04 : isTopCard ? 1.02 : 0.95})`,
                                opacity: Math.abs(index - currentCard) > 3 ? 0 : 1 - Math.abs(index - currentCard) * 0.15,
                                background: "rgba(255, 107, 157, 0.18)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 182, 193, 0.35)",
                                boxShadow: isDragging
                                    ? "0 20px 60px rgba(255, 107, 157, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                                    : isTopCard
                                        ? "0 12px 40px rgba(255, 107, 157, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                                        : "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                touchAction: "none",
                            }}
                            onPointerDown={(e) => onPointerDown(e, index)}
                            onPointerMove={(e) => onPointerMove(e, index)}
                            onPointerUp={(e) => onPointerUp(e, index)}
                        >
                            <div className="flex flex-col items-center justify-center h-full p-6 md:p-8 text-center pointer-events-none">
                                {/* Card Number */}
                                <span className="font-body text-xs tracking-[2px] uppercase text-soft-pink/70 mb-4">
                                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                </span>

                                {/* Heart Icon */}
                                <HeartIcon className="w-7 h-7 mb-5 text-rose-pink" />

                                {/* Card Text */}
                                <p className="font-display font-light italic text-xl md:text-2xl text-cream-pink leading-snug">
                                    &quot;{item.text}&quot;
                                </p>

                                {/* Decorative Line */}
                                <div className="w-12 h-px bg-rose-pink/50 mt-5" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-6 mt-8 z-10">
                {/* Previous Button */}
                <button
                    onClick={prevCard}
                    disabled={currentCard === 0}
                    className="w-14 h-14 rounded-full bg-rose-pink/20 backdrop-blur-md 
                     border border-soft-pink/30 text-soft-white
                     flex items-center justify-center
                     transition-all duration-300 hover:bg-rose-pink/35 hover:scale-110
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Previous card"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Card Counter */}
                <span className="font-body text-sm tracking-wider text-soft-pink/80">
                    {currentCard + 1} of {items.length}
                </span>

                {/* Next Button */}
                <button
                    onClick={nextCard}
                    disabled={currentCard === items.length - 1}
                    className="w-14 h-14 rounded-full bg-rose-pink/20 backdrop-blur-md 
                     border border-soft-pink/30 text-soft-white
                     flex items-center justify-center
                     transition-all duration-300 hover:bg-rose-pink/35 hover:scale-110
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Next card"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Instruction */}
            <p className="text-soft-white/50 text-sm font-body mt-4 flex items-center gap-2">
                Use buttons to navigate or drag cards anywhere
                <HeartIcon className="w-4 h-4 text-rose-pink/70" />
            </p>
        </section>
    );
}
