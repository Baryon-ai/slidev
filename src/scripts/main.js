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
  // Mobile state
  isMobile: false,
  mobileNavOpen: false,
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  // URL state
  isInitialLoad: true,

  // Initialize app
  init() {
    console.log('Alpine.js store init() called')
    
    // Create managers outside of Alpine's reactivity system
    window._managers = {
      slideManager: new SlideManager(this),
      themeManager: new ThemeManager(this), 
      githubLoader: new GitHubLoader(this),
      markdownRenderer: new MarkdownRenderer()
    }
    
    console.log('Managers created:', window._managers)

    // Detect mobile and setup event listeners
    this.detectMobile()
    this.setupTouchGestures()
    this.setupPopstateHandler()
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts()
    console.log('Keyboard shortcuts set up')

    // Load from URL parameters or sample
    this.initializeContent()
    console.log('Init completed')
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
    console.log('parseMarkdown called with input length:', input.length)
    console.log('Input preview:', input.substring(0, 200))
    
    this.isLoading = true
    try {
      const slides = this.slideManager.parseMarkdown(input)
      console.log('SlideManager parsed slides:', slides.length)
      
      this.slides = slides
      this.currentSlide = 0
      this.slideManager.renderSlides()
      
      // URL에서 슬라이드 인덱스 확인 후 해당 슬라이드로 이동
      if (!this.loadSlideFromURL()) {
        // URL에 슬라이드 정보가 없으면 첫 번째 슬라이드 표시
        this.showSlide(0)
      }
      
      console.log('Successfully parsed and rendered slides')
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
      
      // URL 업데이트
      this.updateURL()
      
      // 모바일에서 슬라이드 변경 시 네비게이션 닫기
      if (this.isMobile && this.mobileNavOpen) {
        this.mobileNavOpen = false
      }
      
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

  // URL Management
  updateURL() {
    const params = new URLSearchParams(window.location.search)
    
    // Keep existing url parameter if present
    const existingUrl = params.get('url') || params.get('github') || params.get('md')
    
    // Update slide parameter
    if (this.currentSlide > 0) {
      params.set('slide', this.currentSlide + 1) // 1-based for user-friendly URLs
    } else {
      params.delete('slide')
    }
    
    // Update browser URL
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
    if (window.location.href !== window.location.origin + newUrl) {
      if (this.isInitialLoad) {
        // Use replaceState for initial load to avoid creating history entry
        window.history.replaceState({ slide: this.currentSlide }, '', newUrl)
        this.isInitialLoad = false
      } else {
        // Use pushState for subsequent navigation to enable back/forward
        window.history.pushState({ slide: this.currentSlide }, '', newUrl)
      }
    }
  },

  loadSlideFromURL() {
    const params = new URLSearchParams(window.location.search)
    const slideParam = params.get('slide')
    
    if (slideParam) {
      const slideIndex = parseInt(slideParam) - 1 // Convert to 0-based index
      if (slideIndex >= 0 && slideIndex < this.slides.length) {
        this.showSlide(slideIndex)
        return true
      }
    }
    return false
  },
  setupPopstateHandler() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (this.slides.length > 0) {
        this.loadSlideFromURL()
      }
    })
  },

  detectMobile() {
    this.isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Listen for resize events
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768
      if (!this.isMobile) {
        this.mobileNavOpen = false
      }
    })
  },

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen
  },

  setupTouchGestures() {
    const slideViewer = document.getElementById('slide-viewer')
    if (!slideViewer) return

    let touchStartTime = 0
    const swipeThreshold = 50 // minimum distance for swipe
    const timeThreshold = 300 // maximum time for swipe (ms)

    slideViewer.addEventListener('touchstart', (e) => {
      if (!this.isMobile) return
      
      touchStartTime = Date.now()
      this.touchStartX = e.touches[0].clientX
      this.touchStartY = e.touches[0].clientY
    }, { passive: true })

    slideViewer.addEventListener('touchmove', (e) => {
      if (!this.isMobile) return
      
      this.touchEndX = e.touches[0].clientX
      this.touchEndY = e.touches[0].clientY
      
      const deltaX = this.touchEndX - this.touchStartX
      const deltaY = Math.abs(this.touchEndY - this.touchStartY)
      
      // Show swipe indicators
      const leftIndicator = document.getElementById('swipe-left')
      const rightIndicator = document.getElementById('swipe-right')
      
      if (Math.abs(deltaX) > 20 && deltaY < 50) {
        if (deltaX > 0 && this.currentSlide > 0) {
          leftIndicator?.classList.add('active')
          rightIndicator?.classList.remove('active')
        } else if (deltaX < 0 && this.currentSlide < this.slides.length - 1) {
          rightIndicator?.classList.add('active')
          leftIndicator?.classList.remove('active')
        }
      } else {
        leftIndicator?.classList.remove('active')
        rightIndicator?.classList.remove('active')
      }
    }, { passive: true })

    slideViewer.addEventListener('touchend', (e) => {
      if (!this.isMobile) return
      
      const touchEndTime = Date.now()
      const timeDiff = touchEndTime - touchStartTime
      
      if (timeDiff > timeThreshold) return
      
      const deltaX = this.touchEndX - this.touchStartX
      const deltaY = Math.abs(this.touchEndY - this.touchStartY)
      
      // Hide indicators
      document.getElementById('swipe-left')?.classList.remove('active')
      document.getElementById('swipe-right')?.classList.remove('active')
      
      // Check if it's a horizontal swipe
      if (Math.abs(deltaX) > swipeThreshold && deltaY < swipeThreshold) {
        if (deltaX > 0) {
          // Swipe right - previous slide
          this.previousSlide()
        } else {
          // Swipe left - next slide
          this.nextSlide()
        }
      }
      
      // Reset touch coordinates
      this.touchStartX = 0
      this.touchStartY = 0
      this.touchEndX = 0
      this.touchEndY = 0
    }, { passive: true })

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.isMobile || !this.mobileNavOpen) return
      
      const nav = document.getElementById('slide-navigation')
      const overlay = document.getElementById('mobile-overlay')
      
      if (nav && !nav.contains(e.target) && overlay && overlay.contains(e.target)) {
        this.mobileNavOpen = false
      }
    })
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
    console.log('Loading from GitHub:', url)
    
    if (!this.githubLoader) {
      console.error('GitHubLoader not available')
      alert('GitHub 로더가 초기화되지 않았습니다.')
      return
    }
    
    try {
      this.isLoading = true
      console.log('Starting GitHub file load...')
      
      const markdown = await this.githubLoader.loadFile(url)
      console.log('Successfully loaded markdown, length:', markdown.length)
      
      this.markdownInput = markdown
      this.parseMarkdown(markdown)
      
      console.log('Parsed slides count:', this.slides.length)
      
      if (!this.isFullscreen) {
        console.log('Entering fullscreen mode...')
        this.toggleFullscreen()
      }
    } catch (error) {
      console.error('GitHub load error:', error)
      alert(`GitHub 파일 로드 중 오류가 발생했습니다:\n${error.message}\n\n샘플을 대신 로드합니다.`)
      // 에러 발생 시 샘플 로드
      this.loadSample()
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
    console.log('Initializing content...')
    console.log('Current URL:', window.location.href)
    
    const urlParams = new URLSearchParams(window.location.search)
    console.log('URL search params:', window.location.search)
    
    const githubUrl = urlParams.get('url') || urlParams.get('github') || urlParams.get('md')
    console.log('Extracted GitHub URL:', githubUrl)
    
    if (githubUrl) {
      const decodedUrl = decodeURIComponent(githubUrl)
      console.log('Decoded URL:', decodedUrl)
      this.githubUrl = decodedUrl
      
      // 약간의 딜레이를 주어 UI가 준비될 시간을 줌
      setTimeout(() => {
        this.loadFromGitHub(decodedUrl)
      }, 100)
    } else {
      console.log('No GitHub URL found, loading sample...')
      this.loadSample()
    }
  },

  getSampleMarkdown() {
    return `# What's Marp?

### This is a stub page!

**Marp** (**Mar**kdown **P**resentation Ecosystem) provides a great experience for _writing_ presentations with Markdown.

\`\`\`markdown
---
marp: true
theme: uncover
---

![Marp w:240](/assets/marp-logo.svg)

# **Marp**

Markdown Presentation Ecosystem

https://marp.app/

---

<!-- paginate: true -->

## What's Marp?

Marp provides a great experience for _writing_ presentations with Markdown. :pencil:
\`\`\`

## Concepts

### Markdown

[Markdown] is one of the most popular lightweight markup languages. Markdown allows the author to write presentations quickly and focus on the logical structure of the presentation (rather than the code needed to generate the presentation).

The Marp ecosystem is based on [CommonMark], a consistent spec of Markdown. Marp uses CommonMark to ensure maximum compatibility across Markdown editors and with other Markdown files.

### Theme CSS

The Marp ecosystem is designed to be intuitive to anyone who has made a webpage. As long as you know HTML and CSS, you should be able to style your presentation easily.

---

# Export Features

## Export to PDF, PPTX, HTML

Marp has first-class support for conversion into other file formats. We prioritize reproducible rendering across formats so that users do not have to worry about different formats breaking layouts.

### Supported formats:
- **PDF**: Perfect for presentations
- **PPTX**: PowerPoint compatibility
- **HTML**: Interactive web presentations

\`\`\`javascript
// Example JavaScript code
function createSlide(content) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = content;
    return slide;
}

// Usage
const mySlide = createSlide('<h1>Hello World!</h1>');
document.body.appendChild(mySlide);
\`\`\`

### Math Support

Inline math: $E = mc^2$

Block math:
$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$

---

# Getting Started

## Easy to get started

Our ecosystem provides both a CLI and a GUI (as an VS Code extension) for authoring a Marp slide deck.

> To create a slide deck, all you need to do is install Marp and write a Markdown file in the Marp format.

### Features:
1. **Real-time preview** in VS Code
2. **Export commands** built-in
3. **Plugin architecture** for customization
4. **Multiple themes** available

| Feature | Status | Notes |
|---------|--------| ----- |
| PDF Export | ✅ | Requires Chrome/Edge |
| PPTX Export | ✅ | Full compatibility |
| HTML Export | ✅ | Interactive features |
| Custom Themes | ✅ | CSS-based |

---

# Author & License

## Author

We're [Marp team](https://github.com/marp-team). Currently, Marp is primarily maintained by:

- **Yuki Hattori ([@yhatt](https://github.com/yhatt))** - Project owner / maintainer

## License

All tools and related libraries by Marp team are licensed by [MIT License](https://github.com/marp-team/marp/blob/main/LICENSE).

### Contributing

The best way to join us is through contributions to Marp! Check out our GitHub repository for more information.`
  }
})

// Set up Alpine.js immediately
window.Alpine = Alpine

// Start Alpine.js when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting Alpine.js...')
  Alpine.start()
})

// Export for external use
export { Alpine } 