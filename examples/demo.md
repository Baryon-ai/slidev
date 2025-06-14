# 🎯 Marp Vertical Demo
## 완벽한 프레젠테이션 경험

이것은 **Marp Vertical Viewer**의 데모 프레젠테이션입니다.

### ✨ 주요 기능들
- 📝 마크다운 완벽 지원
- 🧮 수학 수식 렌더링
- 💻 코드 문법 강조
- 📊 테이블 지원
- 🎨 다양한 테마

인라인 수학: $E = mc^2$

---

# 🧮 수학 수식 데모
## LaTeX로 아름다운 수식을

### 기본 수식들
- 피타고라스 정리: $a^2 + b^2 = c^2$
- 오일러 공식: $e^{i\pi} + 1 = 0$
- 미적분: $\frac{d}{dx}x^n = nx^{n-1}$

### 복잡한 수식
가우스 적분:
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

행렬:
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}$$

---

# 💻 코드 예시
## 다양한 프로그래밍 언어

### JavaScript
```javascript
// 비동기 함수 예시
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 사용 예시
fetchData('https://api.example.com/data')
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

### Python
```python
# 클래스와 데코레이터
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timer
def fibonacci(n):
    """피보나치 수열 계산"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 실행 시간과 함께 출력
```

---

# 📊 데이터 테이블
## 체계적인 정보 정리

### 성능 비교표
| 언어 | 실행 시간 (ms) | 메모리 (MB) | 성능 점수 | 특징 |
|------|----------------|-------------|-----------|------|
| C++ | 150 | 12.8 | ⭐⭐⭐⭐⭐ | 최고 성능 |
| Rust | 180 | 15.2 | ⭐⭐⭐⭐⭐ | 안전성 + 성능 |
| Go | 220 | 25.1 | ⭐⭐⭐⭐ | 간결함 |
| Java | 350 | 125.3 | ⭐⭐⭐⭐ | 크로스 플랫폼 |
| Python | 1250 | 45.2 | ⭐⭐⭐ | 개발 속도 |
| JavaScript | 890 | 38.7 | ⭐⭐⭐ | 웹 친화적 |

### 기능 지원 현황
| 기능 | Chrome | Firefox | Safari | Edge | 지원률 |
|------|--------|---------|--------|------|--------|
| ES2020 | ✅ | ✅ | ✅ | ✅ | 100% |
| WebGL 2.0 | ✅ | ✅ | ✅ | ✅ | 100% |
| Web Workers | ✅ | ✅ | ✅ | ✅ | 100% |
| Service Workers | ✅ | ✅ | ✅ | ✅ | 100% |
| WebAssembly | ✅ | ✅ | ✅ | ✅ | 100% |

---

# 🎨 테마 및 스타일
## 다양한 디자인 옵션

이 슬라이드는 여러 테마로 볼 수 있습니다:

### 🌟 기본 테마
- 아름다운 그라디언트 배경
- 깔끔한 인터페이스
- 눈에 편안한 색상

### 🌙 다크 테마  
- 어두운 배경으로 눈의 피로 감소
- 개발자 친화적 디자인
- 집중력 향상

### ☀️ 라이트 테마
- 밝고 깔끔한 디자인
- 인쇄에 적합
- 클래식한 느낌

### 🌿 자연 테마
- 녹색 계열의 자연스러운 색상
- 편안하고 안정적인 분위기
- 환경 친화적 이미지

> 💡 **팁**: 상단의 테마 선택기에서 실시간으로 테마를 변경해보세요!

---

# 🚀 고급 기능들
## 프로페셜널한 프레젠테이션

### 🖥️ 풀스크린 모드
- 완전한 프레젠테이션 환경
- 헤더 자동 숨김
- ESC 키로 해제

### ⌨️ 키보드 단축키
- **←→↑↓**: 슬라이드 이동
- **ESC**: 풀스크린 해제
- **F11**: 브라우저 풀스크린

### 📍 레이아웃 옵션
- 목차 위치 변경 (왼쪽 ↔ 오른쪽)
- 분할 화면 모드
- 에디터 전용 모드

### 🔗 GitHub 연동
```
# URL 파라미터로 직접 로드
?url=https://github.com/user/repo/blob/main/slides.md

# 자동 변환
github.com/user/repo/blob/main/file.md
↓
raw.githubusercontent.com/user/repo/main/file.md
```

---

# 📚 실제 사용 사례
## 다양한 분야에서 활용

### 🎓 교육 및 연구
- **대학 강의**: 수학 공식이 많은 강의 자료
- **연구 발표**: 복잡한 알고리즘과 데이터 시각화
- **온라인 코스**: 코딩 튜토리얼과 실습

### 💼 비즈니스
- **기술 발표**: API 문서와 코드 예시
- **프로젝트 리뷰**: 개발 진행 상황 공유
- **팀 교육**: 새로운 기술 스택 소개

### 🏢 컨퍼런스
- **학회 발표**: 논문의 핵심 내용 요약
- **기술 컨퍼런스**: 라이브 코딩과 데모
- **워크샵**: 실습 가이드와 단계별 설명

---

# 🛠️ 기술적 세부사항
## 개발자를 위한 정보

### 🏗️ 아키텍처
```
┌─────────────────┐    ┌─────────────────┐
│   Markdown      │    │   Raw GitHub    │
│   Parser        │───▶│   Fetcher       │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   HTML          │    │   Theme         │
│   Renderer      │◀───│   Manager       │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Presentation  │
│   Viewer        │
└─────────────────┘
```

### 📦 의존성
- **KaTeX v0.16.8**: 수학 수식 렌더링
- **Highlight.js v11.9.0**: 코드 문법 강조
- **Vanilla JavaScript**: 프레임워크 없음

### 🔧 핵심 기능
```javascript
// GitHub URL 자동 변환
function convertToRawUrl(githubUrl) {
    return githubUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
}

// 수학 수식 렌더링
function renderMath(element) {
    if (window.renderMathInElement) {
        renderMathInElement(element, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ]
        });
    }
}
```

---

# 🌟 미래 계획
## 더 나은 프레젠테이션을 위해

### 🔮 예정된 기능들
- **📱 모바일 최적화**: 터치 제스처 지원
- **🎬 애니메이션**: 슬라이드 전환 효과
- **📄 PDF 내보내기**: 프레젠테이션을 PDF로 저장
- **🔄 실시간 동기화**: 여러 기기 간 동기화

### 🤝 커뮤니티 기여
- **번역**: 다국어 지원
- **테마**: 새로운 디자인 테마
- **플러그인**: 확장 기능 개발
- **문서**: 사용법과 예시 개선

### 📈 성능 개선
- **🚀 렌더링 최적화**: 대용량 문서 처리
- **💾 캐싱**: 반복 로드 성능 향상
- **📦 번들 크기**: CDN 의존성 최적화

---

# 🎉 마무리
## 감사합니다!

### 🙏 이 프레젠테이션이 도움이 되셨나요?

- ⭐ **GitHub Star**: 프로젝트에 별점을 남겨주세요
- 🐛 **이슈 제보**: 버그나 개선사항을 알려주세요  
- 🤝 **기여하기**: 함께 더 나은 도구를 만들어요
- 📢 **공유하기**: 주변에 알려주세요

### 🔗 링크들
- **프로젝트**: [GitHub Repository](https://github.com/your-username/marp-vertical-viewer)
- **데모**: [Live Demo](https://your-username.github.io/marp-vertical-viewer/)
- **문서**: [README](https://github.com/your-username/marp-vertical-viewer#readme)

### 💬 연락처
- **Issues**: 버그 리포트 및 기능 제안
- **Discussions**: 일반적인 질문과 아이디어
- **Email**: 개인적인 문의사항

---

# 🚀 지금 바로 시작하세요!

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/marp-vertical-viewer.git

# 2. 로컬 서버 실행
cd marp-vertical-viewer
python -m http.server 8000

# 3. 브라우저에서 열기
open http://localhost:8000
```

**Happy Presenting!** 🎭✨ 