# 🎬 Claude Code Skills — Remotion Video

Claude Code의 핵심 기능과 스킬을 소개하는 **Remotion** 기반 영상 프로젝트입니다.  
React + TypeScript로 제작된 프로그래매틱 애니메이션 영상입니다.

---

## 📹 영상 구성 (14초, 420프레임 @ 30fps, 1280×720)

| 씬 | 이름 | 길이 | 내용 |
|---|---|---|---|
| 1 | **TitleCard** | 3초 | Claude Code Skills 타이틀 인트로 |
| 2 | **SkillsGrid** | 3.5초 | 6가지 핵심 기능 카드 그리드 |
| 3 | **CodeDemo** | 3.5초 | 실시간 코드 타이핑 에디터 데모 |
| 4 | **StatsScene** | 3초 | 성과 통계 & 주요 특징 목록 |
| 5 | **OutroScene** | 3초 | CTA와 함께하는 아웃트로 |

---

## 🚀 시작하기

### 의존성 설치
```bash
npm install
```

### Remotion Studio (개발 미리보기)
```bash
npm start
# → http://localhost:3000 에서 실시간 편집 가능
```

### MP4 렌더링
```bash
npm run build
# → output/claude-code-skills.mp4 생성
```

---

## 📁 프로젝트 구조

```
src/
├── Root.tsx                        # Remotion 엔트리 + registerRoot
├── compositions/
│   └── ClaudeCodeSkills.tsx        # 메인 컴포지션 (씬 조합)
├── components/
│   ├── TitleCard.tsx               # 씬 1: 타이틀
│   ├── SkillsGrid.tsx              # 씬 2: 스킬 그리드
│   ├── CodeDemo.tsx                # 씬 3: 코드 데모
│   ├── StatsScene.tsx              # 씬 4: 통계
│   └── OutroScene.tsx              # 씬 5: 아웃트로
└── render.ts                       # 프로그래매틱 렌더러
output/
└── claude-code-skills.mp4          # 완성된 영상 파일
```

---

## 🎨 디자인 특징

- **다크 테마**: `#0a0a1a` 베이스의 우주 느낌 배경
- **Glassmorphism**: 반투명 카드 UI
- **Spring 애니메이션**: Remotion의 `spring()` 함수로 자연스러운 모션
- **그라데이션 텍스트**: Indigo → Blue → Emerald 그라데이션
- **파티클 효과**: 아웃트로 씬의 유동적 파티클
- **코드 에디터**: VS Code 스타일 에디터 UI + 타이핑 커서

---

## 🛠 기술 스택

- [Remotion](https://www.remotion.dev/) v4
- React 19
- TypeScript 5
- Node.js 20

---

## 📦 출력 정보

| 항목 | 값 |
|---|---|
| 파일명 | `claude-code-skills.mp4` |
| 해상도 | 1280 × 720 (HD) |
| 프레임레이트 | 30 fps |
| 총 프레임 | 420 |
| 길이 | 14초 |
| 코덱 | H.264 |
| 파일 크기 | ~2.1 MB |
