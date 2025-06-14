# 🎯 Marp Vertical - 세로 스크롤 프레젠테이션 뷰어

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/your-username/marp-vertical-viewer.svg)](https://github.com/your-username/marp-vertical-viewer/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/your-username/marp-vertical-viewer.svg)](https://github.com/your-username/marp-vertical-viewer/issues)

> 🚀 GitHub 마크다운을 아름다운 세로 스크롤 프레젠테이션으로 변환하는 웹 애플리케이션

### 🎯 [공식 데모 체험하기 →](http://127.0.0.1:8827/?url=https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md)
> TRAS NLP 기초 슬라이드로 **수학 수식, 코드 하이라이팅, 테이블, 테마 변경** 등 모든 기능을 한번에 체험해보세요!

## ✨ 주요 기능

### 📝 완벽한 마크다운 지원
- **기본 문법**: 제목, 목록, 링크, 이미지 등
- **수학 수식**: LaTeX 문법 지원 ($...$, $$...$$)
- **코드 블록**: 문법 강조 지원 (JavaScript, Python, Java 등)
- **테이블**: 깔끔한 표 형식
- **MARP 호환**: 기존 MARP 슬라이드 완벽 지원

### 🎨 다양한 테마 & 레이아웃
- **4가지 테마**: 기본, 다크, 라이트, 자연
- **유연한 레이아웃**: 목차 위치 변경 (왼쪽/오른쪽)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

### 🔗 GitHub 연동
- **URL 자동 변환**: GitHub blob URL → raw URL 자동 변환
- **원클릭 로드**: GitHub 저장소에서 직접 마크다운 로드
- **URL 파라미터**: 링크만으로 바로 프레젠테이션 시작
- **공유 기능**: 생성된 프레젠테이션을 URL로 공유

### 🖥️ 프레젠테이션 모드
- **풀스크린**: 헤더 숨김으로 완전한 프레젠테이션 모드
- **키보드 단축키**: 방향키로 슬라이드 이동, ESC로 종료
- **세로 스크롤**: 긴 내용도 자유롭게 스크롤

## 🚀 빠른 시작

### 🎯 공식 데모 체험
```
http://127.0.0.1:8827/?url=https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md
```
> TRAS NLP 기초 슬라이드로 모든 기능을 한번에 체험해보세요!

### 1. 바로 사용하기
```
https://your-domain.com/index.html?url=https://github.com/user/repo/blob/main/presentation.md
```

### 2. 로컬에서 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/marp-vertical-viewer.git

# 디렉토리 이동
cd marp-vertical-viewer

# 웹 서버 실행 (Python 예시)
python -m http.server 8000

# 브라우저에서 열기
open http://localhost:8000
```

### 3. GitHub Pages로 배포
1. 이 저장소를 Fork
2. Settings → Pages에서 GitHub Pages 활성화
3. `https://your-username.github.io/marp-vertical-viewer/` 로 접근

## 📖 사용법

### 기본 사용법
1. **직접 입력**: 마크다운을 입력하고 "프레젠테이션 생성"
2. **GitHub 로드**: "📁 GitHub 로드" → URL 입력 → 자동 로드
3. **URL 파라미터**: `?url=GitHub주소`로 직접 접근

### URL 파라미터 예시
```
# 🎯 공식 데모 (TRAS NLP 기초)
?url=https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md

# 기본 파라미터
?url=https://github.com/user/repo/blob/main/slides.md

# 다른 파라미터명도 지원
?github=https://github.com/user/repo/blob/main/slides.md
?md=https://github.com/user/repo/blob/main/slides.md
```

### 마크다운 문법 예시
```markdown
# 첫 번째 슬라이드
## 부제목

일반 텍스트와 **강조**, *기울임* 텍스트

### 수학 수식
인라인: $E = mc^2$

블록:
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

### 코드 블록
```javascript
function hello() {
    console.log("Hello, World!");
}
```

### 테이블
| 이름 | 나이 | 직업 |
|------|------|------|
| 김철수 | 30 | 개발자 |
| 이영희 | 25 | 디자이너 |

---

# 두 번째 슬라이드
다음 슬라이드 내용...
```

## 🎯 활용 사례

### 교육 및 강의
- 온라인 강의 자료
- 학회 발표
- 워크샵 및 세미나

### 개발 문서화
- API 문서 프레젠테이션
- 기술 스펙 발표
- 프로젝트 소개

### 팀 미팅
- 상태 보고서
- 계획 발표
- 결과 공유

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **수학 렌더링**: [KaTeX](https://katex.org/)
- **코드 하이라이팅**: [Highlight.js](https://highlightjs.org/)
- **디자인**: 순수 CSS (프레임워크 없음)

## 📦 의존성

### CDN 라이브러리
- KaTeX v0.16.8 (수학 수식 렌더링)
- Highlight.js v11.9.0 (코드 문법 강조)

### 브라우저 지원
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 기여하기

### 버그 리포트
[Issues](https://github.com/your-username/marp-vertical-viewer/issues)에서 버그를 신고해주세요.

### 기능 제안
새로운 기능 아이디어가 있으시면 [Discussions](https://github.com/your-username/marp-vertical-viewer/discussions)에서 논의해주세요.

### Pull Request
1. 저장소를 Fork
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### 개발 가이드라인
- 코드 스타일: JavaScript Standard Style
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/)
- 테스트: 주요 브라우저에서 동작 확인

## 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

```
MIT License

Copyright (c) 2025 BaryonLabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 영감을 받았습니다:
- [Marp](https://marp.app/) - 마크다운 프레젠테이션 도구
- [reveal.js](https://revealjs.com/) - HTML 프레젠테이션 프레임워크
- [Slidev](https://sli.dev/) - 개발자를 위한 프레젠테이션 슬라이드

## 📞 연락처

- 프로젝트 링크: [https://github.com/your-username/marp-vertical-viewer](https://github.com/your-username/marp-vertical-viewer)
- 데모 사이트: [https://your-username.github.io/marp-vertical-viewer/](https://your-username.github.io/marp-vertical-viewer/)

---

⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요! 