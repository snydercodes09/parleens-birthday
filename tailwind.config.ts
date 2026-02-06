import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 💖 Romantic Love Palette - Pink, Red, Rose
        "rose-pink": "#FF6B9D",
        "soft-pink": "#FFB6C1",
        "blush": "#FFC0CB",
        "deep-rose": "#E91E63",
        "warm-red": "#FF4757",
        "burgundy": "#8B0A50",
        "cream-pink": "#FFF0F5",
        "soft-white": "#FFFAFA",
        "rose-gold": "#E8B4B8",
        "dark-rose": "#4A1A2C",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "soft-fade": "softFade 1s ease-out forwards",
        "gentle-rise": "gentleRise 1s ease-out forwards",
        "draw-line": "drawLine 2s ease-out 0.5s forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-heart": "pulseHeart 1.5s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
      },
      keyframes: {
        softFade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gentleRise: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          from: { strokeDashoffset: "1200" },
          to: { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
