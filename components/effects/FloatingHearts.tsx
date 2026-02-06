"use client";

import { useEffect, useState } from "react";

interface Heart {
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
}

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        // Generate random hearts
        const generateHearts = () => {
            const newHearts: Heart[] = [];
            for (let i = 0; i < 15; i++) {
                newHearts.push({
                    id: i,
                    left: Math.random() * 100,
                    size: Math.random() * 20 + 10,
                    delay: Math.random() * 8,
                    duration: Math.random() * 4 + 6,
                });
            }
            setHearts(newHearts);
        };

        generateHearts();
    }, []);

    return (
        <div className="floating-hearts" aria-hidden="true">
            {hearts.map((heart) => (
                <svg
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.left}%`,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                    }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M12 21.593C-6 8.594 6-2.407 12 4.135 18-2.407 30 8.594 12 21.593Z"
                        fill="#FF6B9D"
                    />
                </svg>
            ))}
        </div>
    );
}
