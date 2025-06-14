export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')
    if (!targetUrl) {
      return new Response('Missing url parameter', { status: 400 })
    }

    // GitHub raw 파일만 허용 (보안)
    if (!/^https:\/\/raw\.githubusercontent\.com\//.test(targetUrl)) {
      return new Response('Only raw.githubusercontent.com allowed', { status: 403 })
    }

    // 실제 fetch
    const resp = await fetch(targetUrl)
    const headers = new Headers(resp.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Cache-Control')

    // OPTIONS 프리플라이트 처리
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    // 본문 반환
    return new Response(await resp.body, {
      status: resp.status,
      headers
    })
  }
} 