import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

const renderVideo = async () => {
  console.log("🎬 Remotion 렌더링 시작...");
  console.log("📦 번들 생성 중...");

  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/Root.tsx"),
    webpackOverride: (config) => config,
  });

  console.log("✅ 번들 생성 완료:", bundleLocation);
  console.log("🔍 컴포지션 로드 중...");

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "ClaudeCodeSkills",
    inputProps: {},
  });

  console.log(
    `📐 컴포지션 정보: ${composition.width}x${composition.height} @ ${composition.fps}fps, ${composition.durationInFrames}프레임`
  );

  const outputPath = path.resolve("./output/claude-code-skills.mp4");
  console.log(`🎥 렌더링 중 → ${outputPath}`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    onProgress: ({ progress }) => {
      const percent = Math.round(progress * 100);
      const bar = "█".repeat(Math.floor(percent / 5)) + "░".repeat(20 - Math.floor(percent / 5));
      process.stdout.write(`\r[${bar}] ${percent}%`);
    },
  });

  console.log("\n✨ 렌더링 완료!");
  console.log(`📁 저장 위치: ${outputPath}`);
};

renderVideo().catch((err) => {
  console.error("❌ 렌더링 오류:", err);
  process.exit(1);
});
