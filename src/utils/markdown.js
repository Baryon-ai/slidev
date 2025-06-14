import { marked } from 'marked'

export class MarkdownRenderer {
  constructor() {
    this.setupMarkedOptions()
  }

  setupMarkedOptions() {
    // Configure marked with custom renderer
    const renderer = new marked.Renderer()

    // Custom table renderer
    renderer.table = (header, body) => {
      return `<table class="min-w-full divide-y divide-gray-200 my-4">
        <thead class="bg-gray-50">
          ${header}
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${body}
        </tbody>
      </table>`
    }

    // Custom table header renderer
    renderer.tablerow = (content) => {
      return `<tr>${content}</tr>`
    }

    // Custom table cell renderer
    renderer.tablecell = (content, flags) => {
      const tag = flags.header ? 'th' : 'td'
      const className = flags.header 
        ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
        : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'
      
      return `<${tag} class="${className}">${content}</${tag}>`
    }

    // Custom code block renderer
    renderer.code = (code, language) => {
      const lang = language || ''
      const languageLabel = lang ? `<span class="code-language">${lang}</span>` : ''
      
      return `<pre class="relative bg-gray-50 rounded-lg p-4 my-4 overflow-x-auto">
        ${languageLabel}
        <code class="language-${lang} text-sm">${this.escapeHtml(code)}</code>
      </pre>`
    }

    // Custom blockquote renderer
    renderer.blockquote = (quote) => {
      return `<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 bg-gray-50 text-gray-700 italic">
        ${quote}
      </blockquote>`
    }

    marked.setOptions({
      renderer: renderer,
      highlight: null, // We'll use Prism.js for highlighting
      langPrefix: 'language-',
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
  }

  render(markdown) {
    if (!markdown) return ''

    // Pre-process math expressions
    const { processedMarkdown, mathExpressions } = this.extractMathExpressions(markdown)

    // Process markdown with marked
    let html = marked(processedMarkdown)

    // Post-process: restore math expressions
    html = this.restoreMathExpressions(html, mathExpressions)

    // Additional post-processing
    html = this.postProcessHtml(html)

    return html
  }

  extractMathExpressions(markdown) {
    const mathExpressions = []
    let mathIndex = 0

    // Extract display math ($$...$$)
    let processedMarkdown = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (match, expr) => {
      mathExpressions[mathIndex] = { type: 'display', expr: expr.trim() }
      return `__MATH_${mathIndex++}__`
    })

    // Extract inline math ($...$)
    processedMarkdown = processedMarkdown.replace(/\$([^$\n]+?)\$/g, (match, expr) => {
      mathExpressions[mathIndex] = { type: 'inline', expr: expr.trim() }
      return `__MATH_${mathIndex++}__`
    })

    return { processedMarkdown, mathExpressions }
  }

  restoreMathExpressions(html, mathExpressions) {
    return html.replace(/__MATH_(\d+)__/g, (match, index) => {
      const math = mathExpressions[index]
      if (!math) return match

      if (math.type === 'display') {
        return `<div class="math-display my-4 text-center overflow-x-auto">$$${math.expr}$$</div>`
      } else {
        return `<span class="math-inline">$${math.expr}$</span>`
      }
    })
  }

  postProcessHtml(html) {
    // Add custom classes to elements
    html = html
      // Style headers
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-6">')
      .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-gray-700 mb-3 mt-5">')
      
      // Style paragraphs
      .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
      
      // Style lists
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-2">')
      .replace(/<li>/g, '<li class="ml-4">')
      
      // Style inline code
      .replace(/<code>/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">')
      
      // Style links
      .replace(/<a /g, '<a class="text-brand-600 hover:text-brand-800 underline" ')
      
      // Style emphasis
      .replace(/<strong>/g, '<strong class="font-semibold">')
      .replace(/<em>/g, '<em class="italic">')

    return html
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // Method to render just the title/header part
  renderTitle(markdown) {
    const lines = markdown.split('\n')
    
    for (let line of lines) {
      line = line.trim()
      if (line.startsWith('# ')) {
        return line.substring(2).trim()
      } else if (line.startsWith('## ')) {
        return line.substring(3).trim()
      }
    }
    
    return 'Untitled Slide'
  }

  // Method to render markdown without the title
  renderContent(markdown) {
    const lines = markdown.split('\n')
    const contentLines = []
    let foundTitle = false
    
    for (let line of lines) {
      if (!foundTitle && (line.trim().startsWith('# ') || line.trim().startsWith('## '))) {
        foundTitle = true
        continue
      }
      contentLines.push(line)
    }
    
    return this.render(contentLines.join('\n'))
  }

  // Method to extract preview text
  extractPreview(markdown, maxLength = 100) {
    // Remove markdown syntax and get plain text
    let text = markdown
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim()

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    
    return text
  }

  // Method to count words in markdown
  countWords(markdown) {
    const text = this.extractPreview(markdown, Infinity)
    return text.split(/\s+/).filter(word => word.length > 0).length
  }

  // Method to estimate reading time
  estimateReadingTime(markdown, wordsPerMinute = 200) {
    const wordCount = this.countWords(markdown)
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return minutes
  }
} 