import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface Skill {
  icon: string;
  title: string;
  description: string;
  color: string;
  glow: string;
}

const skills: Skill[] = [
  {
    icon: "⚡",
    title: "코드 자동 생성",
    description: "복잡한 함수, 클래스, 알고리즘을 자연어 설명만으로 즉시 생성",
    color: "linear-gradient(135deg, #f59e0b, #ef4444)",
    glow: "rgba(245,158,11,0.4)",
  },
  {
    icon: "🔍",
    title: "코드 리뷰 & 디버깅",
    description: "버그를 자동으로 탐지하고 최적화된 수정 방안을 제안",
    color: "linear-gradient(135deg, #3b82f6, #6366f1)",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    icon: "🏗️",
    title: "프로젝트 스캐폴딩",
    description: "전체 프로젝트 구조를 설계하고 파일을 한 번에 생성",
    color: "linear-gradient(135deg, #10b981, #3b82f6)",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    icon: "🧪",
    title: "테스트 코드 작성",
    description: "유닛 테스트, 통합 테스트를 자동으로 작성 및 실행",
    color: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    icon: "📖",
    title: "문서 자동화",
    description: "README, API 문서, 주석을 코드 기반으로 자동 생성",
    color: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6,182,212,0.4)",
  },
  {
    icon: "🔄",
    title: "리팩토링",
    description: "기존 코드를 최신 패턴과 베스트 프랙티스로 자동 개선",
    color: "linear-gradient(135deg, #f97316, #f59e0b)",
    glow: "rgba(249,115,22,0.4)",
  },
];

export const SkillsGrid: React.FC = () => {
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
        padding: "48px 60px",
        fontFamily: "'Segoe UI', sans-serif",
        boxSizing: "border-box",
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
          marginBottom: 40,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
          }}
        >
          핵심 스킬 & 기능
        </h2>
        <div
          style={{
            width: 80,
            height: 4,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: 2,
            margin: "12px auto 0",
          }}
        />
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          width: "100%",
          zIndex: 1,
        }}
      >
        {skills.map((skill, i) => {
          const cardSpring = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 80, stiffness: 180 },
            durationInFrames: 35,
          });

          const cardY = interpolate(cardSpring, [0, 1], [40, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: Math.max(0, cardSpring),
                transform: `translateY(${cardY}px)`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                backdropFilter: "blur(10px)",
                boxShadow: `0 4px 30px ${skill.glow}`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: skill.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  boxShadow: `0 0 20px ${skill.glow}`,
                }}
              >
                {skill.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f1f5f9",
                    margin: "0 0 6px",
                  }}
                >
                  {skill.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
