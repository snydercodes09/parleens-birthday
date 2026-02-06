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

const EnvelopeHeartIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
        <path d="m22 6-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 6" />
        <path d="M18 15.28c.35-.58.94-.95 1.68-.95 1.06 0 1.92.88 1.92 1.98 0 1.78-2.02 3.22-3.6 4.7-1.58-1.48-3.6-2.92-3.6-4.7 0-1.1.86-1.98 1.92-1.98.74 0 1.33.37 1.68.95Z" />
    </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L13.5 7.5L21 9L13.5 10.5L12 18L10.5 10.5L3 9L10.5 7.5L12 0Z" />
        <path d="M19 12L19.75 15.25L23 16L19.75 16.75L19 20L18.25 16.75L15 16L18.25 15.25L19 12Z" opacity="0.6" />
        <path d="M5 14L5.5 16.5L8 17L5.5 17.5L5 20L4.5 17.5L2 17L4.5 16.5L5 14Z" opacity="0.4" />
    </svg>
);

export default function OurStory() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
    const heartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heart animation
            if (heartRef.current) {
                gsap.from(heartRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    scale: 0,
                    rotation: -180,
                    duration: 1,
                    ease: "back.out(1.7)",
                });
            }

            // Title animation
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                });
            }

            // Paragraph animations - staggered
            paragraphRefs.current.forEach((p, i) => {
                gsap.from(p, {
                    scrollTrigger: {
                        trigger: p,
                        start: "top 85%",
                    },
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    ease: "power2.out",
                    delay: i * 0.2,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const story = [
        `We met in an Instagram group chat I created called "Samuhic Sammelan", and I still can't believe how that random place turned into you, the most important person in my life. One day, I texted you asking for classes on how to talk to girls 😭, and somehow, with the very tips you gave me, I ended up falling for you. Within a week, we were in a long-distance relationship, and on 29th November 2023, we officially became us.`,

        `We lived a beautiful honeymoon phase for 3–4 months, full of love and warmth, until life changed and I had to start traveling to Delhi for my mom's treatment. Then came 2nd May, the day I escaped from Delhi without telling anyone. I told my parents I was just roaming around the city, boarded a train at 9 a.m., and came straight to Karnal with a bouquet in my hand and my heart racing the whole way.`,

        `Around 12:40 p.m., I saw you standing on the footpath, talking to me on the phone and guiding me where you were. You were half hidden behind a tree, waiting. My heart skipped a beat the moment I saw you. Your glance felt unreal, almost ethereal. When I stood in front of you, it felt like a dream. We said hi, hey, and then there was that sweet, awkward silence. I gave you the flowers, you smiled and accepted them, and I held your hand as we got into the rickshaw together.`,

        `We went to the park, hugged, kissed, talked, walked, listened to music, and spent time just being with each other. I gave you chocolates and jhumkas, and you gave me a bracelet. Then we went to a café and talked for hours about everything and nothing. We laughed, shared stories, and kissed so many times. It was my first real kiss, my first French kiss, and it meant everything to me because it was with you.`,

        `Later, we walked through the market and bought more gifts for each other. I gave you a Hello Kitty keychain and a necklace, and you gave me a ring and a locket that holds our photos. In the final moments, on the ride back, you rested your head on my shoulder. We were both quiet, thinking about the uncertainty of when we would meet again. At the bus station, we hugged, said our goodbyes, and walked away in different directions.`,

        `That whole day with you felt like a dream I never wanted to wake up from.`,
    ];

    return (
        <section
            id="our-story"
            ref={sectionRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24"
            style={{
                background: `linear-gradient(
          180deg,
          rgba(45, 27, 46, 1) 0%,
          rgba(139, 10, 80, 0.3) 50%,
          rgba(45, 27, 46, 1) 100%
        )`,
            }}
        >
            {/* Decorative Heart */}
            <div ref={heartRef} className="mb-8 text-rose-pink">
                <HeartIcon className="w-12 h-12" />
            </div>

            {/* Title */}
            <h2
                ref={titleRef}
                className="font-display font-light italic text-cream-pink text-center mb-12 flex items-center gap-3"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
                Our Story
                <EnvelopeHeartIcon className="w-10 h-10 md:w-14 md:h-14 text-soft-pink" />
            </h2>

            {/* Story Paragraphs */}
            <div className="max-w-3xl mx-auto space-y-8">
                {story.map((paragraph, index) => (
                    <p
                        key={index}
                        ref={(el) => { if (el) paragraphRefs.current[index] = el; }}
                        className="font-display font-light text-soft-white/90 text-center leading-relaxed"
                        style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: "1.9" }}
                    >
                        {paragraph}
                    </p>
                ))}

                {/* Final heart decoration */}
                <div className="flex justify-center pt-4">
                    <SparklesIcon className="w-8 h-8 text-rose-pink/70" />
                </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="w-16 h-px bg-rose-pink/50 mt-16" />
        </section>
    );
}
