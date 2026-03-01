import React from "react";
import { Composition, registerRoot } from "remotion";
import { ClaudeCodeSkills } from "./compositions/ClaudeCodeSkills";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeCodeSkills"
        component={ClaudeCodeSkills}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

registerRoot(RemotionRoot);
