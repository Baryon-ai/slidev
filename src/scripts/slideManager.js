import { MarkdownRenderer } from '../utils/markdown.js'

export class SlideManager {
  constructor(store) {
    this.store = store
    this.markdownRenderer = new MarkdownRenderer()
  }

  parseMarkdown(input) {
    if (!input?.trim()) {
      throw new Error('마크다운 내용을 입력해주세요.')
    }

    // Handle MARP frontmatter
    let cleanInput = input.trim()
    if (cleanInput.startsWith('---')) {
      const frontmatterEnd = cleanInput.indexOf('---', 3)
      if (frontmatterEnd !== -1) {
        cleanInput = cleanInput.substring(frontmatterEnd + 3).trim()
      }
    }

    const slides = []
    const slideTexts = cleanInput.split(/\n\s*---\s*\n|\n\s*---\s*$|^\s*---\s*\n/)
    let lastH1Title = null

    slideTexts.forEach((slideText, index) => {
      slideText = slideText.trim()
      if (!slideText) return

      const lines = slideText.split('\n')
      let title = `슬라이드 ${index + 1}`
      let h1Title = null
      let h2Title = null
      let content = slideText
      let titleLineIndex = -1

      // Find H1 and H2 titles
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.startsWith('# ') && !h1Title) {
          h1Title = line.substring(2).trim()
          titleLineIndex = i
          break
        } else if (line.startsWith('## ') && !h2Title) {
          h2Title = line.substring(3).trim()
          if (!h1Title) titleLineIndex = i
        }
      }

      // Determine title logic
      if (h1Title) {
        lastH1Title = h1Title
        title = h1Title
      } else if (h2Title && lastH1Title) {
        title = `${lastH1Title} > ${h2Title}`
      } else if (h2Title) {
        title = h2Title
      }

      // Clean title for navigation display
      const cleanTitle = title.replace(/[📝🎯🔤📊👁️🔬🌟🚀💡🌍🧩🔍💭🎭🏗️💻🤓📚]/g, '').trim()
      const displayTitle = cleanTitle || title

      // Remove title line from content
      if (titleLineIndex >= 0) {
        const remainingLines = [...lines]
        remainingLines.splice(titleLineIndex, 1)
        content = remainingLines.join('\n').trim()
      }

      // Determine original title for display
      let originalTitle = title
      if (h1Title) {
        originalTitle = `# ${h1Title}`
      } else if (h2Title && lastH1Title) {
        originalTitle = `# ${lastH1Title}\n## ${h2Title}`
      } else if (h2Title) {
        originalTitle = `## ${h2Title}`
      }

      slides.push({
        title: displayTitle,
        content: content,
        originalTitle: originalTitle,
        h1Title: h1Title,
        h2Title: h2Title,
        parentH1: lastH1Title,
        isSubSlide: !h1Title && h2Title && lastH1Title
      })
    })

    if (slides.length === 0) {
      throw new Error('슬라이드 내용이 없습니다. --- 으로 슬라이드를 구분하세요.')
    }

    return slides
  }

  renderSlides() {
    const navigation = document.getElementById('slide-navigation')
    if (!navigation) return

    // Clear existing content
    navigation.innerHTML = ''
    
    // Create container for slides list
    const slidesContainer = document.createElement('div')
    slidesContainer.setAttribute('x-data', '{}')
    
    this.store.slides.forEach((slide, index) => {
      const navItem = document.createElement('div')
      navItem.className = 'p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-100 group'
      navItem.addEventListener('click', () => this.store.showSlide(index))
      
      // Add active class if current slide
      if (index === this.store.currentSlide) {
        navItem.classList.add('bg-brand-50', 'border-r-4', 'border-brand-500')
      }

      const preview = slide.content.length > 100 
        ? slide.content.substring(0, 100) + '...' 
        : slide.content

      const titleClass = index === this.store.currentSlide 
        ? 'font-semibold text-sm text-brand-600 mb-2'
        : 'font-semibold text-sm text-gray-900 mb-2 group-hover:text-brand-600'

      navItem.innerHTML = `
        <div class="${titleClass}">
          ${index + 1}. ${slide.title}
        </div>
        <div class="text-xs text-gray-600 line-clamp-3 leading-relaxed">${preview}</div>
      `
      
      slidesContainer.appendChild(navItem)
    })
    
    navigation.appendChild(slidesContainer)

    // Show controls
    const pageIndicator = document.getElementById('page-indicator')
    const slideControls = document.getElementById('slide-controls')
    
    if (pageIndicator) pageIndicator.classList.remove('hidden')
    if (slideControls) slideControls.classList.remove('hidden')
  }

  showSlide(index) {
    const slide = this.store.slides[index]
    if (!slide) return

    const viewer = document.getElementById('slide-viewer')
    if (!viewer) return

    // Generate slide header
    let headerHtml = ''
    if (slide.isSubSlide) {
      headerHtml = `
        <div class="sticky top-0 bg-white border-b-2 border-brand-500 px-8 py-6 z-10 shadow-sm">
          <div class="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wide opacity-75">
            📂 ${slide.parentH1}
          </div>
          <h1 class="text-2xl font-bold text-gray-900 flex items-center">
            <span class="text-brand-500 mr-2">└</span> ${slide.h2Title}
          </h1>
        </div>
      `
    } else if (slide.h1Title) {
      headerHtml = `
        <div class="sticky top-0 bg-white border-b-2 border-brand-500 px-8 py-6 z-10 shadow-sm">
          <h1 class="text-3xl font-bold text-gray-900">${slide.h1Title}</h1>
        </div>
      `
    } else {
      headerHtml = `
        <div class="sticky top-0 bg-white border-b-2 border-brand-500 px-8 py-6 z-10 shadow-sm">
          <h1 class="text-3xl font-bold text-gray-900">${slide.originalTitle || slide.title}</h1>
        </div>
      `
    }

    // Render slide content
    const contentHtml = this.markdownRenderer.render(slide.content)
    
    viewer.innerHTML = `
      ${headerHtml}
      <div class="flex-1 p-8 overflow-y-auto prose prose-lg max-w-none custom-scrollbar">
        ${contentHtml}
      </div>
    `

    // Update page indicator
    const pageIndicator = document.getElementById('page-indicator')
    if (pageIndicator) {
      pageIndicator.textContent = `${index + 1} / ${this.store.slides.length}`
    }

    // Update navigation active state
    this.updateNavigationActiveState(index)

    // Scroll to top
    const slideContent = viewer.querySelector('.prose')
    if (slideContent) {
      slideContent.scrollTop = 0
      
      // Render math and code
      this.renderMathAndCode(slideContent)
    }
  }

  updateNavigationActiveState(activeIndex) {
    const navigation = document.getElementById('slide-navigation')
    if (!navigation) return

    // Update all navigation items
    const navItems = navigation.querySelectorAll('.cursor-pointer')
    navItems.forEach((item, index) => {
      const titleDiv = item.querySelector('div')
      
      if (index === activeIndex) {
        // Add active classes
        item.classList.add('bg-brand-50', 'border-r-4', 'border-brand-500')
        item.classList.remove('hover:bg-gray-100')
        if (titleDiv) {
          titleDiv.className = 'font-semibold text-sm text-brand-600 mb-2'
        }
      } else {
        // Remove active classes
        item.classList.remove('bg-brand-50', 'border-r-4', 'border-brand-500')
        item.classList.add('hover:bg-gray-100')
        if (titleDiv) {
          titleDiv.className = 'font-semibold text-sm text-gray-900 mb-2 group-hover:text-brand-600'
        }
      }
    })
  }

  renderMathAndCode(element) {
    // Render KaTeX math
    if (window.renderMathInElement) {
      window.renderMathInElement(element, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      })
    }

    // Highlight code blocks
    if (window.Prism) {
      element.querySelectorAll('pre code').forEach((block) => {
        window.Prism.highlightElement(block)
      })
    }
  }

  updateLayout(layout) {
    const container = document.getElementById('viewer-container')
    const editorSection = document.getElementById('editor-section')
    const presentationSection = document.getElementById('presentation-section')

    if (!container || !editorSection || !presentationSection) return

    switch (layout) {
      case 'presentation':
        editorSection.classList.add('hidden')
        editorSection.classList.remove('flex')
        presentationSection.classList.remove('hidden')
        break

      case 'split':
        container.classList.remove('flex')
        container.classList.add('flex', 'flex-col', 'lg:flex-row')
        editorSection.classList.remove('hidden', 'w-1/2')
        editorSection.classList.add('flex', 'flex-col', 'lg:w-1/2')
        presentationSection.classList.remove('hidden')
        break
    }

    this.syncEditorContent()
  }

  updateNavPosition(position) {
    const presentationSection = document.getElementById('presentation-section')
    const slideNavigation = document.getElementById('slide-navigation')

    if (!presentationSection || !slideNavigation) return

    if (position === 'right') {
      presentationSection.classList.add('flex-row-reverse')
      slideNavigation.classList.remove('border-r')
      slideNavigation.classList.add('border-l')
    } else {
      presentationSection.classList.remove('flex-row-reverse')
      slideNavigation.classList.remove('border-l')
      slideNavigation.classList.add('border-r')
    }
  }

  syncEditorContent() {
    const mainTextarea = document.getElementById('markdown-input')
    const editorTextarea = document.getElementById('editor-textarea')

    if (mainTextarea && editorTextarea) {
      if (mainTextarea.value !== editorTextarea.value) {
        editorTextarea.value = mainTextarea.value
      }
    }
  }

  clearContent() {
    const navigation = document.getElementById('slide-navigation')
    const viewer = document.getElementById('slide-viewer')

    if (navigation) {
      const button = document.createElement('button')
      button.className = 'px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium text-sm transition-colors'
      button.textContent = '🎯 공식 데모 보기'
      button.addEventListener('click', () => this.store.loadOfficialDemo())

      navigation.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center p-8">
          <div class="text-6xl mb-4">📋</div>
          <div class="text-gray-600 mb-4">
            마크다운을 입력하고<br>프레젠테이션을 생성하세요
          </div>
        </div>
      `
      
      const container = navigation.querySelector('.p-8')
      if (container) {
        container.appendChild(button)
      }
    }

    if (viewer) {
      viewer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center p-8">
          <div class="text-8xl mb-6">🎭</div>
          <div class="max-w-2xl">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">환영합니다!</h3>
            <p class="text-gray-600 mb-6">
              마크다운을 입력하고 프레젠테이션을 생성해보세요.
            </p>
            <div class="text-sm text-gray-500 space-y-1">
              <p>• --- 으로 슬라이드 구분</p>
              <p>• 수학 수식: $E = mc^2$</p>
              <p>• 코드 블록 지원</p>
              <p>• 6가지 테마</p>
            </div>
          </div>
        </div>
      `
    }

    // Hide controls
    const pageIndicator = document.getElementById('page-indicator')
    const slideControls = document.getElementById('slide-controls')
    
    if (pageIndicator) pageIndicator.classList.add('hidden')
    if (slideControls) slideControls.classList.add('hidden')
  }
} 