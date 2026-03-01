import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { TitleCard } from "../components/TitleCard";
import { SkillsGrid } from "../components/SkillsGrid";
import { CodeDemo } from "../components/CodeDemo";
import { StatsScene } from "../components/StatsScene";
import { OutroScene } from "../components/OutroScene";

// Transition overlay between scenes
const SceneTransition: React.FC<{ reversed?: boolean }> = ({ reversed = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 200 },
    durationInFrames: 20,
  });

  const opacity = reversed
    ? interpolate(progress, [0, 1], [1, 0])
    : interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a, #1a0a2e)",
        opacity,
        zIndex: 10,
      }}
    />
  );
};

export const ClaudeCodeSkills: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a1a",
        fontFamily: "'Segoe UI', 'Noto Sans KR', sans-serif",
      }}
    >
      <Series>
        {/* Scene 1: Title Card - 90 frames (3s) */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <TitleCard />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 2: Skills Grid - 105 frames (3.5s) */}
        <Series.Sequence durationInFrames={105}>
          <AbsoluteFill>
            <SkillsGrid />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 3: Code Demo - 105 frames (3.5s) */}
        <Series.Sequence durationInFrames={105}>
          <AbsoluteFill>
            <CodeDemo />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 4: Stats - 90 frames (3s) */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <StatsScene />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 5: Outro - 90 frames (3s) */}
        <Series.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <OutroScene />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
