export class GitHubLoader {
  constructor(store) {
    this.store = store
  }

  async loadFile(url) {
    console.log('GitHubLoader.loadFile called with:', url)
    
    if (!url?.trim()) {
      throw new Error('URL을 입력해주세요.')
    }

    try {
      const rawUrl = this.convertToRawUrl(url)
      console.log('Converted to raw URL:', rawUrl)
      
      // Cloudflare Worker 프록시 주소 사용
      const proxy = 'https://github-cors-proxy.hongbuzz.workers.dev'
      const proxiedUrl = `${proxy}/?url=${encodeURIComponent(rawUrl)}`
      const response = await fetch(proxiedUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain, text/markdown, */*',
          'Cache-Control': 'no-cache'
        }
      })

      console.log('Fetch response status:', response.status)
      console.log('Fetch response ok:', response.ok)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const markdown = await response.text()
      console.log('Successfully fetched markdown, length:', markdown.length)
      console.log('First 200 chars:', markdown.substring(0, 200))
      
      return markdown
      
    } catch (error) {
      console.error('GitHub file load error:', error)
      throw new Error(`파일 로드 실패: ${error.message}\n\n올바른 GitHub URL인지 확인해주세요.\n예: https://github.com/user/repo/blob/main/file.md`)
    }
  }

  convertToRawUrl(githubUrl) {
    console.log('Converting GitHub URL to raw URL:', githubUrl)
    
    // Convert GitHub blob URL to raw URL
    if (githubUrl.includes('github.com') && githubUrl.includes('/blob/')) {
      const rawUrl = githubUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/')
      
      console.log('Converted URL:', rawUrl)
      return rawUrl
    }
    
    console.log('URL is already in raw format or not a GitHub blob URL')
    return githubUrl
  }

  generateShareUrl(githubUrl) {
    if (!githubUrl?.trim()) {
      throw new Error('GitHub URL이 필요합니다.')
    }

    const currentUrl = window.location.origin + window.location.pathname
    const shareUrl = `${currentUrl}?url=${encodeURIComponent(githubUrl)}`
    
    return shareUrl
  }

  async copyShareUrlToClipboard(githubUrl) {
    try {
      const shareUrl = this.generateShareUrl(githubUrl)
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        return shareUrl
      } else {
        // Fallback for browsers without clipboard API
        this.fallbackCopyToClipboard(shareUrl)
        return shareUrl
      }
    } catch (error) {
      console.error('Copy to clipboard error:', error)
      throw new Error('클립보드 복사에 실패했습니다.')
    }
  }

  fallbackCopyToClipboard(text) {
    // Create temporary textarea for copying
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
    } catch (error) {
      console.error('Fallback copy failed:', error)
    } finally {
      document.body.removeChild(textArea)
    }
  }

  validateGitHubUrl(url) {
    if (!url) return false
    
    // Basic GitHub URL validation
    const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/blob\/[\w\-\.\/]+\.md$/i
    return githubPattern.test(url)
  }

  extractRepoInfo(githubUrl) {
    try {
      const url = new URL(githubUrl)
      const pathParts = url.pathname.split('/')
      
      if (pathParts.length >= 4) {
        return {
          owner: pathParts[1],
          repo: pathParts[2],
          branch: pathParts[4] || 'main',
          path: pathParts.slice(5).join('/'),
          fullPath: url.pathname
        }
      }
      
      return null
    } catch (error) {
      console.error('URL parsing error:', error)
      return null
    }
  }

  getOfficialDemoUrl() {
    return 'https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md'
  }

  buildDemoUrl(githubUrl) {
    const currentUrl = window.location.origin + window.location.pathname
    return `${currentUrl}?url=${encodeURIComponent(githubUrl)}`
  }

  parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search)
    return {
      url: urlParams.get('url'),
      github: urlParams.get('github'),
      md: urlParams.get('md'),
      theme: urlParams.get('theme'),
      layout: urlParams.get('layout')
    }
  }

  async loadFromUrlParams() {
    const params = this.parseUrlParameters()
    const githubUrl = params.url || params.github || params.md
    
    if (githubUrl) {
      const decodedUrl = decodeURIComponent(githubUrl)
      await this.store.loadFromGitHub(decodedUrl)
      
      // Apply additional URL parameters
      if (params.theme && this.store.themeManager.themes.includes(params.theme)) {
        this.store.changeTheme(params.theme)
      }
      
      if (params.layout && ['presentation', 'split'].includes(params.layout)) {
        this.store.setLayout(params.layout)
      }
      
      return true
    }
    
    return false
  }

  // Common GitHub repositories for presentations
  getPopularRepos() {
    return [
      {
        name: 'TRAS NLP Basics',
        url: 'https://github.com/Baryon-ai/TRAS/blob/main/slides/section2_nlp_basics.md',
        description: '자연어처리 기초 슬라이드'
      },
      // Add more popular repositories as needed
    ]
  }

  async preloadDemo() {
    // Preload the official demo for faster loading
    try {
      const demoUrl = this.getOfficialDemoUrl()
      const response = await fetch(this.convertToRawUrl(demoUrl))
      
      if (response.ok) {
        const content = await response.text()
        // Cache the content if needed
        sessionStorage.setItem('demo-content', content)
      }
    } catch (error) {
      console.warn('Demo preload failed:', error)
    }
  }

  getCachedDemo() {
    try {
      return sessionStorage.getItem('demo-content')
    } catch (error) {
      console.warn('Could not access session storage:', error)
      return null
    }
  }

  clearCache() {
    try {
      sessionStorage.removeItem('demo-content')
    } catch (error) {
      console.warn('Could not clear cache:', error)
    }
  }
} 