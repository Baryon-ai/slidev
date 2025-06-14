# 🤝 기여 가이드

Marp Vertical Viewer 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 기여 방법

### 🐛 버그 리포트

버그를 발견하셨나요? 다음 정보를 포함해서 [Issues](https://github.com/your-username/marp-vertical-viewer/issues)에 등록해주세요:

- **버그 설명**: 무엇이 잘못되었는지 명확하게 설명
- **재현 단계**: 버그를 재현할 수 있는 단계별 설명
- **예상 결과**: 어떻게 동작해야 하는지
- **실제 결과**: 실제로 어떻게 동작하는지
- **환경 정보**: 브라우저, 운영체제, 버전 등
- **스크린샷**: 가능하다면 문제를 보여주는 이미지

### ✨ 기능 제안

새로운 기능을 제안하고 싶으시나요? [Discussions](https://github.com/your-username/marp-vertical-viewer/discussions)에서 논의를 시작해주세요:

- **기능 설명**: 어떤 기능을 원하는지 설명
- **사용 사례**: 이 기능이 언제 유용한지
- **참고 자료**: 비슷한 기능의 예시나 참고 링크

### 🔧 코드 기여

#### 개발 환경 설정

1. **저장소 Fork 및 Clone**
```bash
git clone https://github.com/your-username/marp-vertical-viewer.git
cd marp-vertical-viewer
```

2. **로컬 서버 실행**
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

3. **브라우저에서 테스트**
```
http://localhost:8000
```

#### 코딩 스타일

- **JavaScript**: [JavaScript Standard Style](https://standardjs.com/) 준수
- **HTML/CSS**: 들여쓰기 4 spaces, 세미콜론 사용
- **커밋 메시지**: [Conventional Commits](https://www.conventionalcommits.org/) 형식

#### 커밋 메시지 예시
```
feat: GitHub URL 자동 변환 기능 추가
fix: 수학 수식 렌더링 오류 수정
docs: README에 사용법 예시 추가
style: 코드 포맷팅 정리
refactor: 마크다운 파싱 로직 개선
test: 브라우저 호환성 테스트 추가
```

#### Pull Request 프로세스

1. **기능 브랜치 생성**
```bash
git checkout -b feature/awesome-feature
```

2. **변경사항 작업**
- 코드 작성
- 테스트 확인
- 문서 업데이트 (필요시)

3. **커밋 및 푸시**
```bash
git add .
git commit -m "feat: 멋진 기능 추가"
git push origin feature/awesome-feature
```

4. **Pull Request 생성**
- GitHub에서 Pull Request 생성
- 명확한 제목과 설명 작성
- 관련 이슈 번호 언급 (예: `Closes #123`)

## 🧪 테스트

### 브라우저 테스트
다음 브라우저에서 테스트해주세요:
- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

### 기능 테스트 체크리스트
- [ ] 마크다운 파싱이 올바르게 작동하는가?
- [ ] 수학 수식이 정확히 렌더링되는가?
- [ ] 코드 블록 문법 강조가 작동하는가?
- [ ] 테이블이 올바르게 표시되는가?
- [ ] GitHub URL 로드가 작동하는가?
- [ ] 모든 테마에서 올바르게 표시되는가?
- [ ] 풀스크린 모드가 정상 작동하는가?
- [ ] 키보드 단축키가 작동하는가?
- [ ] 모바일에서 반응형이 작동하는가?

### URL 파라미터 테스트
다음 URL들로 테스트해주세요:
```
# 기본 테스트
?url=https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md

# 다른 파라미터명
?github=https://github.com/user/repo/blob/main/file.md
?md=https://github.com/user/repo/blob/main/file.md

# 잘못된 URL
?url=invalid-url
```

## 📚 개발 참고 자료

### 프로젝트 구조
```
marp-vertical-viewer/
├── index.html          # 메인 애플리케이션
├── README.md           # 프로젝트 문서
├── LICENSE             # MIT 라이선스
├── CONTRIBUTING.md     # 기여 가이드
└── examples/           # 예시 파일들 (선택사항)
    ├── sample.md
    └── math-demo.md
```

### 핵심 함수들
- `parseMarkdown()`: 마크다운 파싱
- `markdownToHtml()`: HTML 변환
- `loadGitHubFile()`: GitHub 파일 로드
- `convertToRawUrl()`: URL 변환
- `changeTheme()`: 테마 변경
- `toggleFullscreen()`: 풀스크린 전환

### 외부 라이브러리
- [KaTeX](https://katex.org/): 수학 수식 렌더링
- [Highlight.js](https://highlightjs.org/): 코드 문법 강조

## 🎯 우선순위 높은 기여 영역

### 🔥 즉시 도움이 필요한 영역
1. **브라우저 호환성 개선**
2. **모바일 UX 최적화**
3. **접근성(a11y) 개선**
4. **성능 최적화**

### 🚀 새로운 기능 아이디어
1. **이미지 지원 개선**
2. **애니메이션 효과**
3. **PDF 내보내기**
4. **실시간 협업 기능**
5. **플러그인 시스템**

### 📖 문서 개선
1. **다국어 지원** (영어, 일본어 등)
2. **튜토리얼 비디오**
3. **API 문서**
4. **예시 갤러리**

## ❓ 질문이 있으신가요?

- **일반적인 질문**: [Discussions](https://github.com/your-username/marp-vertical-viewer/discussions) 사용
- **버그 리포트**: [Issues](https://github.com/your-username/marp-vertical-viewer/issues) 사용
- **기능 제안**: [Discussions](https://github.com/your-username/marp-vertical-viewer/discussions) 사용

## 🙏 감사의 말

모든 기여자분들께 진심으로 감사드립니다. 여러분의 도움으로 이 프로젝트가 더욱 발전할 수 있습니다!

---

Happy coding! 🎉 