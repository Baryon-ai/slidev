# 🎯 Marp Vertical - 모던 세로 스크롤 프레젠테이션 뷰어

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Alpine.js](https://img.shields.io/badge/Alpine.js-3.13-blue.svg)](https://alpinejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)

GitHub 마크다운을 아름다운 세로 스크롤 프레젠테이션으로 변환하는 **모던 웹 애플리케이션**입니다.

## ✨ 주요 특징

### 🎨 **Marp 테마 시스템**
- **6가지 완전히 다른 테마**: Default, Gaia, Uncover, Academic, Business, Nature
- 각 테마별 고유한 폰트, 색상, 레이아웃
- 실시간 테마 전환 및 풀스크린 최적화

### 🧮 **고급 마크다운 지원**
- **수학 수식**: KaTeX를 활용한 LaTeX 문법 ($...$, $$...$$)
- **코드 강조**: Prism.js 기반 다양한 언어 지원
- **테이블 렌더링**: GitHub Flavored Markdown 완벽 지원
- **연속 슬라이드**: H1 없이 H2만 있어도 자연스러운 구조

### 🚀 **모던 기술 스택**
- **Alpine.js**: 반응형 상태 관리
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Vite**: 초고속 개발 서버 및 빌드
- **npm 패키지 관리**: 모던 의존성 관리

### 📱 **사용자 경험**
- 완전 반응형 디자인
- 키보드 네비게이션 (화살표 키, ESC)
- GitHub URL 직접 로드
- 풀스크린 프레젠테이션 모드
- 목차 위치 자유 변경 (좌/우)

## 🛠️ 설치 및 실행

### 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/marp-vertical-viewer.git
cd marp-vertical-viewer

# 패키지 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🏗️ 프로젝트 구조

```
marp_vertical_viewer/
├── package.json              # 프로젝트 설정 및 의존성
├── vite.config.js            # Vite 빌드 설정
├── tailwind.config.js        # Tailwind CSS 설정
├── postcss.config.js         # PostCSS 설정
├── index.html                # 메인 HTML (Alpine.js 기반)
├── src/
│   ├── styles/
│   │   ├── main.css          # 메인 스타일 (Tailwind + 커스텀)
│   │   └── themes.css        # Marp 테마 시스템
│   ├── scripts/
│   │   ├── main.js           # Alpine.js 메인 스토어
│   │   ├── slideManager.js   # 슬라이드 관리 로직
│   │   ├── themeManager.js   # 테마 관리 로직
│   │   └── githubLoader.js   # GitHub 연동 로직
│   └── utils/
│       └── markdown.js       # 마크다운 렌더링 유틸리티
└── dist/                     # 빌드 결과물
```

## 🎮 사용법

### 기본 사용법
1. **마크다운 입력**: 상단 텍스트 영역에 마크다운 작성
2. **슬라이드 구분**: `---`로 슬라이드 분리
3. **프레젠테이션 생성**: "🚀 생성" 버튼 클릭

### 고급 기능

#### 📁 GitHub 연동
```
# URL 파라미터로 직접 접근
https://slidev.wwwai.com/?url=https://github.com/user/repo/blob/main/slides.md

# 또는 "📁 GitHub" 버튼 사용
```

#### 🎨 테마 선택
- 드롭다운에서 6가지 테마 중 선택
- 각 테마별 특화된 디자인과 폰트
- 풀스크린 모드에서 최적화된 경험

#### ⌨️ 키보드 단축키
- `←/→` 또는 `↑/↓`: 슬라이드 네비게이션
- `ESC`: 풀스크린 모드 해제

## 🎯 공식 데모

**TRAS NLP 기초 슬라이드**로 모든 기능을 체험해보세요:

```
https://slidev.wwwai.com/?url=https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md
```

## 🎨 테마 가이드

### 📋 **Default Theme**
- **용도**: 일반적인 모든 프레젠테이션
- **특징**: 깔끔하고 모던한 Tailwind 기반 디자인
- **폰트**: Inter

### 🌙 **Gaia Theme**
- **용도**: 몰입형 프레젠테이션, 컨퍼런스 발표
- **특징**: 어두운 배경, 백드롭 블러 효과
- **폰트**: Inter

### 📰 **Uncover Theme**
- **용도**: 텍스트 중심 콘텐츠, 블로그 포스트
- **특징**: 미니멀한 신문/잡지 스타일
- **폰트**: Georgia (serif)

### 🎓 **Academic Theme**
- **용도**: 학술 발표, 연구 보고서
- **특징**: 정형화된 학술 논문 스타일
- **폰트**: Times New Roman

### 💼 **Business Theme**
- **용도**: 기업 프레젠테이션, 투자 피칭
- **특징**: 전문적인 그라디언트 효과
- **폰트**: Inter

### 🌿 **Nature Theme**
- **용도**: 환경 프레젠테이션, 교육 자료
- **특징**: 자연스러운 색상 팔레트
- **폰트**: Inter

## 🔧 기술 세부사항

### Alpine.js 아키텍처
- **Global Store 패턴**: 중앙집중식 상태 관리
- **모듈화**: 기능별 매니저 클래스 분리
- **반응형 UI**: x-model, x-show, x-transition 활용

### 스타일링 시스템
- **Tailwind CSS**: 유틸리티 우선 접근법
- **PostCSS**: 자동 접두사 및 최적화
- **테마 시스템**: CSS 클래스 기반 테마 전환

### 빌드 시스템
- **Vite**: ES 모듈 기반 개발 서버
- **Hot Module Replacement**: 실시간 개발 경험
- **트리 쉐이킹**: 최적화된 프로덕션 번들

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License에 따라 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔗 관련 링크

- **공식 웹사이트**: [slidev.wwwai.com](https://slidev.wwwai.com)
- **데모 슬라이드**: [TRAS NLP 기초](https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md)
- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/marp-vertical-viewer/issues)

---

**⭐ 이 프로젝트가 유용하다면 별표를 눌러주세요!** 