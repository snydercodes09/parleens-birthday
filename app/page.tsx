"use client";

import { useState, useCallback } from "react";
import MuteButton from "@/components/ui/MuteButton";
import FloatingHearts from "@/components/effects/FloatingHearts";
import CustomCursor from "@/components/effects/CustomCursor";
import Hero from "@/components/sections/Hero";
import OurStory from "@/components/sections/OurStory";
import Memories from "@/components/sections/Memories";
import LoveList from "@/components/sections/LoveList";
import Wishes from "@/components/sections/Wishes";
import Finale from "@/components/sections/Finale";

export default function Home() {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const handleVideoRef = useCallback((video: HTMLVideoElement | null) => {
    setVideoElement(video);
  }, []);

  return (
    <main className="relative">
      {/* Custom Cursor with Inverted Colors */}
      <CustomCursor />

      {/* Floating Hearts Background Effect */}
      <FloatingHearts />

      {/* Global Mute Button */}
      <MuteButton videoElement={videoElement} />

      {/* Section 1: Hero */}
      <Hero onVideoRef={handleVideoRef} />

      {/* Section 2: Our Story */}
      <OurStory />

      {/* Section 3: Memories Gallery */}
      <Memories />

      {/* Section 4: Things I Love About You */}
      <LoveList />

      {/* Section 5: Birthday Wishes */}
      <Wishes />

      {/* Section 6: Finale */}
      <Finale />
    </main>
  );
}
