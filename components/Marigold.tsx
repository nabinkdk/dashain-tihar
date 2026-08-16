"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number; // percentage width
  size: number; // px size
  duration: number; // fall/rise speed in seconds
  delay: number; // start delay
  rotation: number;
  content: string; // emoji icon
  type: "flower" | "cracker";
}

export default function FestiveEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Only Marigold (🌼, 🏵️) and Globe Amaranth / Makhamali (🟣, 🌸) + Crackers (🎆, 🎇, ✨)
    const festiveItems = [
      "🌼",
      "🏵️", // Marigold
      "🟣",
      "🌸", // Globe Amaranth (Makhamali)
      "🎆",
      "🎇",
      "✨", // Crackers / Sparkles
    ];

    const generatedParticles: Particle[] = Array.from(
      { length: 30 },
      (_, i) => ({
        id: i,
        left: Math.random() * 100, // distributed across left, middle, and right
        size: Math.floor(Math.random() * 14) + 18,
        duration: Math.random() * 6 + 5, // fall duration between 5s and 11s
        delay: Math.random() * 8,
        rotation: Math.random() * 360,
        content: festiveItems[Math.floor(Math.random() * festiveItems.length)],
        type: i % 3 === 0 ? "cracker" : "flower",
      }),
    );

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="festive-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`festive-particle ${p.type}`}
          style={
            {
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--initial-rotation": `${p.rotation}deg`,
            } as React.CSSProperties
          }
        >
          {p.content}
        </div>
      ))}
    </div>
  );
}
