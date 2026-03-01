import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 40,
  });

  const subtitleOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 40,
  });

  const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);
  const subtitleY = interpolate(subtitleOpacity, [0, 1], [30, 0]);

  const glowPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.6, 1]
  );

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
      {/* Animated background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.4,
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          opacity: glowPulse,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          bottom: "10%",
          right: "15%",
          opacity: glowPulse,
          filter: "blur(60px)",
        }}
      />

      {/* Claude logo / icon area */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: "0 0 40px rgba(139,92,246,0.6)",
          }}
        >
          ✦
        </div>
      </div>

      {/* Main Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          Claude Code
        </h1>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            margin: "8px 0 0",
            color: "#e2e8f0",
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Skills Showcase
        </h2>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: Math.max(0, subtitleOpacity),
          transform: `translateY(${subtitleY}px)`,
          marginTop: 32,
        }}
      >
        <p
          style={{
            fontSize: 22,
            color: "#94a3b8",
            margin: 0,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          AI-Powered Development · Made with Remotion
        </p>
      </div>
    </div>
  );
};
