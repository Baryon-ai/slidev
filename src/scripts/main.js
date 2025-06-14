import Alpine from 'alpinejs'
import { marked } from 'marked'
import katex from 'katex'
import Prism from 'prismjs'

// Import modules
import { SlideManager } from './slideManager.js'
import { ThemeManager } from './themeManager.js'
import { GitHubLoader } from './githubLoader.js'
import { MarkdownRenderer } from '../utils/markdown.js'

// Alpine.js Global Store
Alpine.store('app', {
  // State
  slides: [],
  currentSlide: 0,
  currentLayout: 'presentation',
  inputVisible: true,
  currentTheme: 'default',
  navPosition: 'left',
  isFullscreen: false,
  isLoading: false,
  isSlideTransitioning: false,
  markdownInput: '',
  githubUrl: '',

  // Initialize app
  init() {
    // Create managers outside of Alpine's reactivity system
    window._managers = {
      slideManager: new SlideManager(this),
      themeManager: new ThemeManager(this), 
      githubLoader: new GitHubLoader(this),
      markdownRenderer: new MarkdownRenderer()
    }

    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts()

    // Load from URL parameters or sample
    this.initializeContent()
  },

  // Helper methods to access managers
  get slideManager() { return window._managers?.slideManager },
  get themeManager() { return window._managers?.themeManager },
  get githubLoader() { return window._managers?.githubLoader },
  get markdownRenderer() { return window._managers?.markdownRenderer },

  // Layout Management
  setLayout(layout) {
    this.currentLayout = layout
    this.slideManager.updateLayout(layout)
  },

  toggleInput() {
    this.inputVisible = !this.inputVisible
  },

  // Slide Management
  parseMarkdown(input) {
    this.isLoading = true
    try {
      const slides = this.slideManager.parseMarkdown(input)
      this.slides = slides
      this.currentSlide = 0
      this.slideManager.renderSlides()
      this.showSlide(0)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      alert('마크다운 파싱 중 오류가 발생했습니다.')
    } finally {
      this.isLoading = false
    }
  },

  showSlide(index) {
    if (this.isSlideTransitioning) return // 전환 중이면 무시
    if (index >= 0 && index < this.slides.length && index !== this.currentSlide) {
      this.isSlideTransitioning = true
      this.currentSlide = index
      this.slideManager.showSlide(index)
      
      // 짧은 딜레이 후 전환 완료 처리
      setTimeout(() => {
        this.isSlideTransitioning = false
      }, 100)
    }
  },

  nextSlide() {
    if (this.isSlideTransitioning) return // 전환 중이면 무시
    if (this.currentSlide < this.slides.length - 1) {
      this.showSlide(this.currentSlide + 1)
    }
  },

  previousSlide() {
    if (this.isSlideTransitioning) return // 전환 중이면 무시
    if (this.currentSlide > 0) {
      this.showSlide(this.currentSlide - 1)
    }
  },

  scrollSlideContent(amount) {
    const slideViewer = document.getElementById('slide-viewer')
    if (!slideViewer) return

    // 현재 슬라이드의 스크롤 가능한 영역 찾기
    const scrollableArea = slideViewer.querySelector('.prose') || 
                          slideViewer.querySelector('.overflow-y-auto') ||
                          slideViewer

    if (scrollableArea) {
      const currentScrollTop = scrollableArea.scrollTop
      const newScrollTop = Math.max(0, currentScrollTop + amount)
      
      // 부드러운 스크롤
      scrollableArea.scrollTo({
        top: newScrollTop,
        behavior: 'smooth'
      })
    }
  },

  // Theme Management
  changeTheme(theme) {
    this.currentTheme = theme
    this.themeManager.applyTheme(theme)
  },

  changeNavPosition(position) {
    this.navPosition = position
    this.slideManager.updateNavPosition(position)
  },

  // Fullscreen Management
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen
    
    if (this.isFullscreen) {
      this.enterFullscreen()
    } else {
      this.exitFullscreen()
    }
  },

  enterFullscreen() {
    document.body.classList.add('fullscreen-mode')
    this.setLayout('presentation')
  },

  exitFullscreen() {
    document.body.classList.remove('fullscreen-mode')
  },

  // Content Management
  loadSample() {
    const sampleMarkdown = this.getSampleMarkdown()
    this.markdownInput = sampleMarkdown
    this.parseMarkdown(sampleMarkdown)
  },

  clearAll() {
    this.slides = []
    this.currentSlide = 0
    this.markdownInput = ''
    this.slideManager.clearContent()
  },

  // GitHub Integration
  async loadFromGitHub(url) {
    try {
      this.isLoading = true
      const markdown = await this.githubLoader.loadFile(url)
      this.markdownInput = markdown
      this.parseMarkdown(markdown)
      
      if (!this.isFullscreen) {
        this.toggleFullscreen()
      }
    } catch (error) {
      console.error('GitHub load error:', error)
      alert('GitHub 파일 로드 중 오류가 발생했습니다.')
    } finally {
      this.isLoading = false
    }
  },

  loadOfficialDemo() {
    const demoUrl = 'https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md'
    const currentUrl = window.location.origin + window.location.pathname
    const fullUrl = `${currentUrl}?url=${encodeURIComponent(demoUrl)}`
    window.location.href = fullUrl
  },

  // Keyboard Shortcuts
  setupKeyboardShortcuts() {
    let keyPressed = new Set() // 현재 눌린 키들을 추적
    
    document.addEventListener('keydown', (e) => {
      if (this.slides.length === 0) return
      
      // Don't trigger when typing in input fields
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return
      
      // 이미 눌린 키면 무시 (연속 입력 방지)
      if (keyPressed.has(e.key)) return
      keyPressed.add(e.key)
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          this.previousSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          this.nextSlide()
          break
        case 'ArrowUp':
          e.preventDefault()
          this.scrollSlideContent(-100) // 위로 스크롤
          break
        case 'ArrowDown':
          e.preventDefault()
          this.scrollSlideContent(100) // 아래로 스크롤
          break
        case 'Escape':
          if (this.isFullscreen) {
            this.toggleFullscreen()
          }
          break
      }
    })
    
    // 키를 뗄 때 추적에서 제거
    document.addEventListener('keyup', (e) => {
      keyPressed.delete(e.key)
    })
    
    // 포커스를 잃었을 때 키 추적 초기화
    document.addEventListener('blur', () => {
      keyPressed.clear()
    })
  },

  // Initialize content from URL or sample
  initializeContent() {
    const urlParams = new URLSearchParams(window.location.search)
    const githubUrl = urlParams.get('url') || urlParams.get('github') || urlParams.get('md')
    
    if (githubUrl) {
      const decodedUrl = decodeURIComponent(githubUrl)
      this.githubUrl = decodedUrl
      this.loadFromGitHub(decodedUrl)
    } else {
      this.loadSample()
    }
  },

  getSampleMarkdown() {
    return `# 🎯 Marp Vertical 소개
## 세로 스크롤 프레젠테이션 뷰어

이것은 **Marp Vertical** 프레젠테이션 뷰어입니다.

### 주요 특징
- 세로 스크롤링 지원
- H1 제목 상단 고정
- 페이지 번호 항상 표시
- 마크다운 문법 지원
- **수학 수식 지원** 🧮
- **코드 문법 강조** 💻
- **🆕 Marp 테마 시스템**: 6가지 완전히 다른 디자인
- **🆕 연속 슬라이드**: H1 없이 H2만 있으면 이전 제목 유지

긴 내용이 있어도 스크롤로 모든 내용을 볼 수 있습니다.

### 수학 수식 예제
인라인 수학: $E = mc^2$ 

블록 수학:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

\`\`\`javascript
// JavaScript 코드 블록
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
\`\`\`

> 인용문도 이렇게 표시됩니다.

---

# 🎨 Marp 테마 시스템
## 6가지 완전히 다른 디자인

상단의 **🎨 테마** 드롭다운에서 다양한 테마를 체험해보세요!

### 📋 Default Theme
- 깔끔하고 모던한 디자인
- Tailwind CSS 기반
- 밝은 배경에 어두운 텍스트
- **현재 적용된 테마입니다**

### 🌙 Gaia Theme  
- 어두운 배경의 우아한 디자인
- 백드롭 블러 효과
- 밝은 텍스트로 가독성 향상
- 프레젠테이션에 최적화

---

# 🚀 완성된 기능들
## 모든 기능이 테마와 호환됩니다

### ✅ **핵심 기능**
- **6가지 Marp 테마**: 완전히 다른 디자인
- **수학 수식**: $\\LaTeX$ 문법으로 아름다운 수식  
- **코드 강조**: 다양한 프로그래밍 언어 지원  
- **테이블 지원**: 데이터를 깔끔하게 정리  
- **GitHub 연동**: URL만 입력하면 자동 로드  
- **풀스크린**: 테마별 최적화된 프레젠테이션 모드

**🎨 다양한 테마로 멋진 프레젠테이션을 만들어보세요!** 🎉`
  }
})

// Initialize Alpine.js when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.Alpine = Alpine
  Alpine.start()
})

// Export for external use
export { Alpine } 