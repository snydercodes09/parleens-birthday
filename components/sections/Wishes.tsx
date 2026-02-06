"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const HeartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const CakeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
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
        <path d="M12 0L13.5 7.5L21 9L13.5 10.5L12 18L10.5 10.5L3 9L10.5 7.5L12 0Z" />
    </svg>
);

export default function Wishes() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
    const signoffRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power2.out",
                });
            }

            // Paragraph animations
            paragraphRefs.current.forEach((p, i) => {
                gsap.from(p, {
                    scrollTrigger: {
                        trigger: p,
                        start: "top 85%",
                    },
                    opacity: 0,
                    y: 25,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: i * 0.3,
                });
            });

            // Sign-off
            if (signoffRef.current) {
                gsap.from(signoffRef.current, {
                    scrollTrigger: {
                        trigger: signoffRef.current,
                        start: "top 90%",
                    },
                    opacity: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: "power2.out",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24"
            style={{
                background: `linear-gradient(
          180deg,
          rgba(45, 27, 46, 1) 0%,
          rgba(139, 10, 80, 0.4) 30%,
          rgba(255, 107, 157, 0.2) 60%,
          rgba(45, 27, 46, 1) 100%
        )`,
            }}
        >
            {/* Birthday Cake Icon */}
            <div className="text-rose-pink mb-8">
                <CakeIcon className="w-16 h-16" />
            </div>

            {/* Title */}
            <h2
                ref={titleRef}
                className="font-display font-light italic text-cream-pink text-center mb-12 flex items-center gap-3"
                style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
                Birthday Wishes
                <CakeIcon className="w-10 h-10 text-soft-pink" />
            </h2>

            {/* Wishes Content */}
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <p
                    ref={(el) => { if (el) paragraphRefs.current[0] = el; }}
                    className="font-display font-light text-soft-white/95 leading-relaxed"
                    style={{ fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: "1.9" }}
                >
                    Happy birthday sweetheart! YAYAY it&apos;s your 19th birthday. I love you so much my baby girl. You are now in your second year of adulthood and I&apos;m so proud of you. You&apos;ve made it through another year, and we&apos;ve completed more than two beautiful years together. It honestly feels like we&apos;ve known each other for so long.
                </p>

                <p
                    ref={(el) => { if (el) paragraphRefs.current[1] = el; }}
                    className="font-display font-light text-soft-white/95 leading-relaxed"
                    style={{ fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: "1.9" }}
                >
                    You are my everything and the best thing that has ever happened to me. You are the most precious and important person in my life. You are my life, sweetheart. I love you more than anything else baby.
                </p>

                <p
                    ref={(el) => { if (el) paragraphRefs.current[2] = el; }}
                    className="font-display font-light text-rose-pink text-2xl md:text-3xl flex items-center justify-center gap-3 flex-wrap"
                    style={{ lineHeight: "1.6" }}
                >
                    HAPPY BIRTHDAY TO YOU MY SWEETY BABY GIRL
                    <HeartIcon className="w-8 h-8 text-warm-red" />
                </p>
            </div>

            {/* Sign-off */}
            <p
                ref={signoffRef}
                className="font-accent italic text-soft-pink mt-16 flex items-center gap-2"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
            >
                — With all my love
                <SparkleIcon className="w-5 h-5 text-rose-pink" />
            </p>
        </section>
    );
}
