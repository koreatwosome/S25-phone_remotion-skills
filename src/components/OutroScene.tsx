import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 150 },
    durationInFrames: 40,
  });

  const ctaSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 35,
  });

  const taglineSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 30,
  });

  // Pulsing animation for the logo
  const pulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.9, 1.05]
  );

  const glowPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.5, 1]
  );

  // Particle positions (deterministic)
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: ((i * 137.508) % 100),
    y: ((i * 97.3) % 100),
    size: 2 + (i % 4),
    opacity: 0.2 + (i % 5) * 0.1,
    speed: 0.3 + (i % 3) * 0.2,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0d1b2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${((p.y + (frame * p.speed * 0.1)) % 100)}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#3b82f6" : "#34d399",
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Large glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowPulse,
          filter: "blur(80px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: mainSpring,
          transform: `scale(${interpolate(mainSpring, [0, 1], [0.8, 1]) * pulse})`,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
            boxShadow: `0 0 60px rgba(139,92,246,${glowPulse * 0.8})`,
            margin: "0 auto",
          }}
        >
          ✦
        </div>
      </div>

      {/* Main text */}
      <div
        style={{
          opacity: mainSpring,
          transform: `translateY(${interpolate(mainSpring, [0, 1], [30, 0])}px)`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          Claude Code
        </h1>
        <p
          style={{
            fontSize: 22,
            color: "#94a3b8",
            margin: "12px 0 0",
            letterSpacing: 1,
          }}
        >
          미래의 개발 방식을 지금 경험하세요
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: Math.max(0, ctaSpring),
          transform: `translateY(${interpolate(ctaSpring, [0, 1], [20, 0])}px)`,
          marginTop: 40,
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            padding: "16px 48px",
            borderRadius: 50,
            fontSize: 20,
            fontWeight: 700,
            boxShadow: "0 0 40px rgba(139,92,246,0.5)",
            letterSpacing: 0.5,
          }}
        >
          지금 시작하기 → claude.ai/code
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: Math.max(0, taglineSpring),
          marginTop: 28,
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "#475569",
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Made with Remotion · Powered by Claude
        </p>
      </div>
    </div>
  );
};
