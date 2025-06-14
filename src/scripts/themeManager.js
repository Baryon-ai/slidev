export class ThemeManager {
  constructor(store) {
    this.store = store
    this.themes = ['default', 'gaia', 'uncover', 'academic', 'business', 'nature']
  }

  applyTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Unknown theme: ${theme}`)
      return
    }

    const body = document.body

    // Remove all existing theme classes
    this.themes.forEach(themeName => {
      body.classList.remove(`theme-${themeName}`)
    })

    // Apply new theme class
    body.classList.add(`theme-${theme}`)

    // Handle theme-specific adjustments
    this.handleThemeSpecificStyles(theme)

    console.log(`테마가 ${theme}으로 변경되었습니다.`)
  }

  handleThemeSpecificStyles(theme) {
    switch (theme) {
      case 'gaia':
        this.applyGaiaTheme()
        break
      case 'academic':
        this.applyAcademicTheme()
        break
      case 'uncover':
        this.applyUncoverTheme()
        break
      case 'business':
        this.applyBusinessTheme()
        break
      case 'nature':
        this.applyNatureTheme()
        break
      default:
        this.applyDefaultTheme()
        break
    }

    // Apply fullscreen-specific styles if needed
    if (this.store.isFullscreen) {
      this.applyFullscreenThemeStyles(theme)
    }
  }

  applyGaiaTheme() {
    // Dark theme adjustments
    const headerElements = document.querySelectorAll('#header h1, #header label, #header button')
    headerElements.forEach(el => {
      if (!el.classList.contains('bg-gradient-to-r')) {
        el.style.color = '#ffffff'
      }
    })
  }

  applyAcademicTheme() {
    // Academic theme uses Times font which is handled by CSS
    // Additional JavaScript customizations can be added here
  }

  applyUncoverTheme() {
    // Minimal theme customizations
    // Georgia font is handled by CSS
  }

  applyBusinessTheme() {
    // Professional theme customizations
  }

  applyNatureTheme() {
    // Nature theme customizations
  }

  applyDefaultTheme() {
    // Reset any custom styles
    const headerElements = document.querySelectorAll('#header h1, #header label, #header button')
    headerElements.forEach(el => {
      el.style.color = ''
    })
  }

  applyFullscreenThemeStyles(theme) {
    const body = document.body

    // Apply theme-specific fullscreen backgrounds
    switch (theme) {
      case 'gaia':
        // Gaia theme already has dark background
        break
      case 'academic':
        body.style.background = '#2c3e50'
        break
      case 'uncover':
        body.style.background = '#fafafa'
        break
      case 'business':
        body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        break
      case 'nature':
        body.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        break
      default:
        body.style.background = '#000000'
        break
    }
  }

  restoreNormalThemeStyles() {
    const body = document.body
    
    // Remove inline background styles to let CSS theme classes take over
    body.style.background = ''
    
    // Reapply current theme
    this.applyTheme(this.store.currentTheme)
  }

  getThemeConfig(theme) {
    const configs = {
      default: {
        name: '📋 Default',
        description: 'Clean & Modern',
        background: 'light',
        fontFamily: 'Inter'
      },
      gaia: {
        name: '🌙 Gaia',
        description: 'Dark & Elegant',
        background: 'dark',
        fontFamily: 'Inter'
      },
      uncover: {
        name: '📰 Uncover',
        description: 'Minimal & Clean',
        background: 'light',
        fontFamily: 'Georgia'
      },
      academic: {
        name: '🎓 Academic',
        description: 'Scholarly',
        background: 'light',
        fontFamily: 'Times New Roman'
      },
      business: {
        name: '💼 Business',
        description: 'Professional',
        background: 'gradient',
        fontFamily: 'Inter'
      },
      nature: {
        name: '🌿 Nature',
        description: 'Organic & Fresh',
        background: 'gradient',
        fontFamily: 'Inter'
      }
    }

    return configs[theme] || configs.default
  }

  preloadThemeAssets() {
    // Preload any theme-specific assets if needed
    // This could include fonts, images, or other resources
  }

  animateThemeTransition(fromTheme, toTheme) {
    // Add smooth transition animation between themes
    const body = document.body
    
    body.style.transition = 'all 0.3s ease-in-out'
    
    setTimeout(() => {
      body.style.transition = ''
    }, 300)
  }

  getThemePreferences() {
    // Get user's preferred theme from localStorage
    try {
      return localStorage.getItem('marp-vertical-theme') || 'default'
    } catch (error) {
      console.warn('Could not access localStorage:', error)
      return 'default'
    }
  }

  saveThemePreference(theme) {
    // Save user's theme preference to localStorage
    try {
      localStorage.setItem('marp-vertical-theme', theme)
    } catch (error) {
      console.warn('Could not save to localStorage:', error)
    }
  }

  detectSystemTheme() {
    // Detect if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'gaia' // Use dark theme for dark mode preference
    }
    return 'default'
  }

  setupThemeWatcher() {
    // Watch for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      mediaQuery.addEventListener('change', (e) => {
        if (this.store.currentTheme === 'auto') {
          const newTheme = e.matches ? 'gaia' : 'default'
          this.store.changeTheme(newTheme)
        }
      })
    }
  }
} 