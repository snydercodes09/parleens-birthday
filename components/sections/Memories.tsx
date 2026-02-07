"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Memory {
    type: 'image' | 'video';
    src: string;
    caption: string;
    alt: string;
}

interface MemoriesProps {
    memories?: Memory[];
}

const defaultMemories: Memory[] = [
    { type: 'video', src: "/videos/memory1.mp4", caption: "Our special moments 🎥", alt: "Memory Video" },
    { type: 'image', src: "/images/memory2.jpg", caption: "First adventure together 💕", alt: "Memory 2" },
    { type: 'image', src: "/images/memory3.jpg", caption: "Smiles that melt my heart", alt: "Memory 3" },
    { type: 'image', src: "/images/memory4.jpg", caption: "Laughing is our favorite therapy", alt: "Memory 4" },
    { type: 'image', src: "/images/memory5.jpg", caption: "Just you and me, forever", alt: "Memory 5" },
    { type: 'image', src: "/images/memory6.jpg", caption: "Making memories with you", alt: "Memory 6" },
    { type: 'image', src: "/images/memory7.jpg", caption: "Every moment is precious", alt: "Memory 7" },
    { type: 'video', src: "/videos/memory8.mp4", caption: "Together is my favorite place", alt: "Memory 8" },
    { type: 'image', src: "/images/memory9.jpg", caption: "Adventures await us", alt: "Memory 9" },
    { type: 'image', src: "/images/memory10.jpg", caption: "You light up my world", alt: "Memory 10" },
    { type: 'image', src: "/images/memory11.jpg", caption: "Forever grateful for you", alt: "Memory 11" },
    { type: 'video', src: "/videos/memory12.mp4", caption: "Love in every glance", alt: "Memory 12" },
    { type: 'image', src: "/images/memory13.jpg", caption: "My favorite hello", alt: "Memory 13" },
    { type: 'image', src: "/images/memory14.jpg", caption: "Cherishing every second", alt: "Memory 14" },
    { type: 'image', src: "/images/memory15.jpg", caption: "Our beautiful journey", alt: "Memory 15" },
    { type: 'image', src: "/images/memory16.jpg", caption: "You are my sunshine", alt: "Memory 16" },
    { type: 'image', src: "/images/memory17.jpg", caption: "Love at first sight ❤️", alt: "Memory 17" },
    { type: 'video', src: "/videos/memory18.mp4", caption: "Our endless love story 💕", alt: "Memory 18" },
];

// SVG Icons
const CameraIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

const VideoItem = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playVideo = () => {
            video.play().catch(() => { });
        };
        playVideo();

        const onPause = () => {
            if (!video.paused) playVideo();
        };

        video.addEventListener('pause', onPause);
        return () => video.removeEventListener('pause', onPause);
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 relative z-0"
            style={{ backgroundColor: '#2D1B2E' }}
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
        />
    );
};

export default function Memories({ memories = defaultMemories }: MemoriesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const currentX = useRef(0);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // GSAP infinite scroll animation
    useEffect(() => {
        if (!innerRef.current || isMobile) return;

        const inner = innerRef.current;
        const totalWidth = inner.scrollWidth / 3; // Since we tripled the content

        // Start the infinite scroll animation
        animationRef.current = gsap.to(inner, {
            x: -totalWidth,
            duration: 60,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth)
            }
        });

        return () => {
            animationRef.current?.kill();
        };
    }, [isMobile]);

    // Drag to scroll handlers
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (!innerRef.current) return;
        setIsDragging(true);
        dragStartX.current = e.clientX;

        // Pause animation and get current position
        if (animationRef.current) {
            animationRef.current.pause();
            const transform = gsap.getProperty(innerRef.current, "x") as number;
            currentX.current = transform;
        }

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging || !innerRef.current) return;
        const dx = e.clientX - dragStartX.current;
        gsap.set(innerRef.current, { x: currentX.current + dx });
    }, [isDragging]);

    const handlePointerUp = useCallback(() => {
        if (!innerRef.current) return;
        setIsDragging(false);

        // Get current position and resume animation from there
        const transform = gsap.getProperty(innerRef.current, "x") as number;
        currentX.current = transform;

        // Resume animation after a short delay
        setTimeout(() => {
            if (animationRef.current && innerRef.current) {
                const totalWidth = innerRef.current.scrollWidth / 3;
                // Recreate animation from current position
                animationRef.current.kill();
                animationRef.current = gsap.to(innerRef.current, {
                    x: currentX.current - totalWidth,
                    duration: 60,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize((x: string) => {
                            const mod = parseFloat(x) % totalWidth;
                            return mod > 0 ? mod - totalWidth : mod;
                        })
                    }
                });
            }
        }, 300);
    }, []);

    // Duplicate memories for seamless loop
    const allMemories = [...memories, ...memories, ...memories];
    const expandedWidth = "calc(60vh * 9 / 16)"; // 9:16 aspect ratio

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col justify-center items-center py-16 overflow-hidden"
            style={{
                background: `linear-gradient(
                    180deg,
                    rgba(45, 27, 46, 1) 0%,
                    rgba(255, 107, 157, 0.15) 50%,
                    rgba(45, 27, 46, 1) 100%
                )`,
            }}
        >
            {/* Section Title */}
            <h2
                className="font-display font-light text-cream-pink text-center mb-10 flex items-center justify-center gap-4"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
                Our Memories
                <CameraIcon className="w-8 h-8 md:w-12 md:h-12 text-rose-pink" />
            </h2>

            {/* Infinite Scroll Track */}
            <div
                ref={trackRef}
                className={`memories-track flex gap-4 h-[60vh] px-6 overflow-hidden scrollbar-hide cursor-grab active:cursor-grabbing ${isDragging ? 'dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onMouseEnter={() => animationRef.current?.pause()}
                onMouseLeave={() => animationRef.current?.play()}
                style={{
                    touchAction: "none",
                }}
            >
                {/* Animated Inner Track */}
                <div ref={innerRef} className="memories-inner flex gap-4">
                    {allMemories.map((memory, index) => (
                        <div
                            key={index}
                            className="memory-card relative h-full rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-500 ease-out group shadow-lg"
                            style={{
                                width: isMobile ? "85vw" : "100px",
                                minWidth: isMobile ? "85vw" : "100px",
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.width = expandedWidth;
                                    e.currentTarget.style.minWidth = expandedWidth;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.width = "100px";
                                    e.currentTarget.style.minWidth = "100px";
                                }
                            }}
                        >
                            {/* Background Image / Video */}
                            <div className="absolute inset-0 w-full h-full z-0">
                                {memory.type === 'video' ? (
                                    <VideoItem src={memory.src} />
                                ) : (
                                    <Image
                                        src={memory.src}
                                        alt={memory.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        sizes="(max-width: 640px) 90vw, 500px"
                                        priority={index < 5}
                                    />
                                )}
                            </div>

                            {/* Gradient Overlay */}
                            <div
                                className="absolute inset-0 z-[1] transition-opacity duration-300"
                                style={{
                                    background: `linear-gradient(
                                        to top,
                                        rgba(45, 27, 46, 0.6) 0%,
                                        rgba(139, 10, 80, 0.1) 30%,
                                        transparent 60%
                                    )`,
                                }}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-[2]" />

                            {/* Caption Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-[3] flex flex-col justify-end h-full pointer-events-none">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span
                                        className={`font-display text-cream-pink block
                                            ${!isMobile
                                                ? "text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                                                : "text-2xl"
                                            }
                                        `}
                                    >
                                        {memory.caption}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollbar Hide Styles */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Instructions */}
            <p className="hidden md:block text-soft-white/50 text-sm mt-6 font-body">
                Drag to scroll • Hover to pause & expand 💕
            </p>
        </section>
    );
}
