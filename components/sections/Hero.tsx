"use client";

import { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";

interface HeroProps {
    onVideoRef?: (video: HTMLVideoElement | null) => void;
}

// SVG Icons
const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const CakeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
        <path d="M2 21h20" />
        <path d="M7 8v2" />
        <path d="M12 8v2" />
        <path d="M17 8v2" />
        <path d="M7 4h.01" />
        <path d="M12 4h.01" />
        <path d="M17 4h.01" />
    </svg>
);

const SparkleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Hero = forwardRef<HTMLVideoElement, HeroProps>(function Hero({ onVideoRef }, _ref) {
    const heroRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const heartRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose video ref to parent
    useEffect(() => {
        if (onVideoRef) {
            onVideoRef(videoRef.current);
        }
    }, [onVideoRef]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate headline lines
            if (headlineRef.current) {
                const lines = headlineRef.current.querySelectorAll(".line");
                gsap.from(lines, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    delay: 0.3,
                });
            }

            // Animate body and CTA - reveal from opacity-0
            if (bodyRef.current) {
                gsap.to(bodyRef.current, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 1.2,
                });
            }

            // Pulsing heart animation
            if (heartRef.current) {
                gsap.to(heartRef.current, {
                    scale: 1.1,
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.querySelector("#our-story");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen overflow-hidden flex items-end"
            style={{ padding: "60px 48px 64px" }}
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                poster="/images/hero-poster.jpg"
            >
                <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>

            {/* Dreamy Pink/Red Gradient Overlay */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: `linear-gradient(
            135deg,
            rgba(139, 10, 80, 0.55) 0%,
            rgba(255, 107, 157, 0.40) 40%,
            rgba(255, 182, 193, 0.35) 100%
          )`,
                    boxShadow: "inset 0 0 250px rgba(0, 0, 0, 0.25)",
                }}
            />

            {/* Bottom Fade to Next Section */}
            <div
                className="absolute bottom-0 left-0 w-full h-32 z-[2] pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent, #2D1B2E)",
                }}
            />

            {/* Decorative Heart */}
            <div ref={heartRef} className="absolute top-10 right-10 z-[2] text-rose-pink opacity-70">
                <HeartIcon className="w-14 h-14" />
            </div>

            {/* Content Grid */}
            <div className="relative z-[3] w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 items-end">
                {/* Left Column - Large Headline */}
                <div ref={headlineRef}>
                    <h1 className="font-display font-bold text-cream-pink leading-[1.05] tracking-tight"
                        style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
                        <span className="line flex items-center gap-3">
                            Happy Birthday
                            <CakeIcon className="w-12 h-12 md:w-16 md:h-16 text-rose-pink inline" />
                        </span>
                        <span className="line block">My Sweetheart!</span>
                        <span className="line block text-rose-pink">YAYAY you&apos;re</span>
                        <span className="line flex items-center gap-2 text-rose-pink">
                            19 now!
                            <HeartIcon className="w-8 h-8 md:w-10 md:h-10 text-soft-pink inline" />
                        </span>
                    </h1>
                </div>

                {/* Right Column - Body Text + CTA */}
                <div ref={bodyRef} className="flex flex-col gap-7 max-w-[380px] self-end pb-2">
                    <p className="font-body font-light text-[15px] leading-[1.7] text-soft-white/85 flex items-start gap-2">
                        <SparkleIcon className="w-4 h-4 text-rose-pink mt-1 flex-shrink-0" />
                        I made this just for you. Every scroll is a memory, every word is something I felt with you. Read it slowly, just like I love you.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToNextSection}
                        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full backdrop-blur-sm border text-soft-white font-body text-xs font-semibold uppercase transition-all duration-300 w-fit hover:-translate-y-0.5"
                        style={{
                            background: 'rgba(255,107,157,0.25)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            letterSpacing: '2px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,107,157,0.4)';
                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,107,157,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,107,157,0.25)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Begin Our Story
                        <span
                            className="flex items-center justify-center w-[18px] h-[18px] rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                            style={{ background: 'rgba(255,255,255,0.15)' }}
                        >
                            <HeartIcon className="w-3 h-3 text-rose-pink" />
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Responsive Overrides */}
            <style jsx>{`
        @media (max-width: 640px) {
          section {
            padding: 32px 24px 48px !important;
          }
        }
      `}</style>
        </section>
    );
});

export default Hero;
