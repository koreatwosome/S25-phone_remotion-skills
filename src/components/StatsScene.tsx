import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const stats = [
  { value: "10x", label: "개발 속도 향상", icon: "🚀", color: "#f59e0b" },
  { value: "98%", label: "코드 정확도", icon: "🎯", color: "#10b981" },
  { value: "5M+", label: "생성된 코드 라인", icon: "📝", color: "#6366f1" },
  { value: "24/7", label: "무중단 AI 지원", icon: "⚡", color: "#ec4899" },
];

const features = [
  "✅ 40+ 프로그래밍 언어 지원",
  "✅ VS Code, JetBrains 통합",
  "✅ Git 워크플로우 자동화",
  "✅ CI/CD 파이프라인 최적화",
  "✅ 실시간 코드 설명 & 학습",
  "✅ 보안 취약점 자동 탐지",
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 30,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0d1b2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 60px",
        fontFamily: "'Segoe UI', sans-serif",
        boxSizing: "border-box",
        gap: 32,
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

      {/* Header */}
      <div
        style={{
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #34d399, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          성과 & 통계
        </h2>
        <p style={{ color: "#64748b", margin: "8px 0 0", fontSize: 16 }}>
          Claude Code로 달성한 실제 결과
        </p>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "100%",
          zIndex: 1,
        }}
      >
        {stats.map((stat, i) => {
          const cardSpring = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 80, stiffness: 180 },
            durationInFrames: 35,
          });

          // Animate number counting
          const countProgress = spring({
            frame: frame - i * 8 - 10,
            fps,
            config: { damping: 60, stiffness: 100 },
            durationInFrames: 45,
          });

          const numericVal = parseInt(stat.value.replace(/\D/g, ""));
          let displayVal = stat.value;
          if (!isNaN(numericVal) && stat.value.includes("%")) {
            displayVal = `${Math.round(countProgress * numericVal)}%`;
          } else if (!isNaN(numericVal) && stat.value.endsWith("x")) {
            displayVal = `${Math.round(countProgress * numericVal)}x`;
          }

          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: Math.max(0, cardSpring),
                transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${stat.color}33`,
                borderRadius: 16,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 0 30px ${stat.color}22`,
              }}
            >
              <span style={{ fontSize: 36 }}>{stat.icon}</span>
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayVal}
              </span>
              <span style={{ fontSize: 14, color: "#94a3b8", textAlign: "center" }}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Features List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px 40px",
          width: "100%",
          zIndex: 1,
        }}
      >
        {features.map((feature, i) => {
          const featureSpring = spring({
            frame: frame - 30 - i * 6,
            fps,
            config: { damping: 80, stiffness: 200 },
            durationInFrames: 25,
          });

          return (
            <div
              key={i}
              style={{
                opacity: Math.max(0, featureSpring),
                transform: `translateX(${interpolate(featureSpring, [0, 1], [-20, 0])}px)`,
                fontSize: 16,
                color: "#cbd5e1",
                padding: "8px 16px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {feature}
            </div>
          );
        })}
      </div>
    </div>
  );
};
