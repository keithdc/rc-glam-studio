/**
 * @file tailwind.config.ts — Tailwind CSS configuration with MagicUI animations
 * @shared
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  important: "#root",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "rose-gold": "#B76E79",
        "rose-gold-light": "#D4A0A7",
        "rose-gold-dark": "#8B4A52",
        burgundy: "#722F37",
        "burgundy-light": "#9B5A62",
        champagne: "#F5E6D3",
        charcoal: "#1A1A2E",
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) infinite linear",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "shiny-text": "shiny-text 8s infinite",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        "blur-fade-in": "blur-fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "shimmer-slide": {
          to: { transform: "translate(calc(100cqw - 100%), 0)" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
        ripple: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)" },
        },
        "blur-fade-in": {
          from: { opacity: "0", filter: "blur(10px)" },
          to: { opacity: "1", filter: "blur(0px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
