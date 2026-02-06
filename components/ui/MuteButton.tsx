"use client";

import { useState } from "react";

interface MuteButtonProps {
    videoElement?: HTMLVideoElement | null;
}

export default function MuteButton({ videoElement }: MuteButtonProps) {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            setIsMuted(videoElement.muted);
        }
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full
                 bg-rose-pink/25 backdrop-blur-md border border-soft-pink/30
                 text-soft-white flex items-center justify-center
                 transition-all duration-300 ease-out
                 hover:scale-110 hover:bg-rose-pink/40
                 focus:outline-none focus:ring-2 focus:ring-rose-pink/40"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
            {isMuted ? (
                // Volume Off Icon (VolumeX)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="22" y1="9" x2="16" y2="15" />
                    <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
            ) : (
                // Volume On Icon (Volume2)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
            )}
        </button>
    );
}
