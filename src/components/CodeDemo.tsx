import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const codeLines = [
  { text: "// Claude Code가 생성한 코드", color: "#6a9955", delay: 0 },
  { text: "async function analyzeCode(", color: "#dcdcaa", delay: 4 },
  { text: "  filePath: string,", color: "#9cdcfe", delay: 8 },
  { text: "  options: AnalysisOptions", color: "#9cdcfe", delay: 12 },
  { text: "): Promise<CodeReport> {", color: "#dcdcaa", delay: 16 },
  { text: "  const ast = await parse(filePath);", color: "#ce9178", delay: 20 },
  { text: "  const issues = detectIssues(ast);", color: "#ce9178", delay: 24 },
  { text: "  const suggestions = await", color: "#c586c0", delay: 28 },
  { text: "    claude.suggest(issues);", color: "#4ec9b0", delay: 32 },
  { text: "  return { issues, suggestions };", color: "#9cdcfe", delay: 36 },
  { text: "}", color: "#dcdcaa", delay: 40 },
];

export const CodeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 150 },
    durationInFrames: 40,
  });

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 30,
  });

  // Typing cursor blink
  const cursorVisible = Math.floor(frame / 18) % 2 === 0;

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
        padding: "40px 60px",
        fontFamily: "'Segoe UI', sans-serif",
        boxSizing: "border-box",
        gap: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
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

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          실시간 코드 생성 데모
        </h2>
        <p style={{ color: "#64748b", margin: "8px 0 0", fontSize: 16 }}>
          자연어 설명 → 완성된 코드 즉시 생성
        </p>
      </div>

      {/* Code Editor Panel */}
      <div
        style={{
          opacity: panelSpring,
          transform: `scale(${interpolate(panelSpring, [0, 1], [0.95, 1])})`,
          width: "100%",
          maxWidth: 860,
          background: "#1e1e2e",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(99,102,241,0.3)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.2)",
          zIndex: 1,
        }}
      >
        {/* Window Chrome */}
        <div
          style={{
            background: "#181825",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ color: "#585b70", fontSize: 13, marginLeft: 12 }}>
            analyzeCode.ts — Claude Code
          </span>
        </div>

        {/* Code Content */}
        <div
          style={{
            padding: "24px 28px",
            fontFamily: "'Consolas', 'Monaco', monospace",
            fontSize: 16,
            lineHeight: 1.8,
          }}
        >
          {codeLines.map((line, i) => {
            const lineSpring = spring({
              frame: frame - line.delay,
              fps,
              config: { damping: 120, stiffness: 300 },
              durationInFrames: 20,
            });

            const isLastVisible =
              i ===
              codeLines.filter((_, idx) => {
                const s = spring({
                  frame: frame - codeLines[idx].delay,
                  fps,
                  config: { damping: 120, stiffness: 300 },
                  durationInFrames: 20,
                });
                return s > 0.1;
              }).length -
                1;

            return (
              <div
                key={i}
                style={{
                  opacity: Math.max(0, lineSpring),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#3b4261", fontSize: 13, width: 30, userSelect: "none" }}>
                  {i + 1}
                </span>
                <span style={{ color: line.color }}>{line.text}</span>
                {isLastVisible && cursorVisible && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: "1em",
                      background: "#a78bfa",
                      marginLeft: 2,
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
