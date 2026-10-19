// Local-only preview. The production diagnostic is served by the static Food host.
import { createServer, request } from 'node:http'
import { connect } from 'node:net'
import { readFile } from 'node:fs/promises'
const root = new URL('../', import.meta.url)
const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname
  if (path === '/diagnostico') {
    const html = (await readFile(new URL('deploy/food-lp/food/diagnostico.html', root), 'utf8')).replace('http://localhost:4010/crm/public/diagnostics/food', '/preview-diagnostic-api')
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }); res.end(html); return
  }
  const diagnostic = path.startsWith('/preview-diagnostic-api/')
  const autonomous = path.startsWith('/api/food-builder/autonomous/')
  const proxy = request({ hostname: '127.0.0.1', port: diagnostic || autonomous ? 4029 : 3029, path: diagnostic ? req.url.replace('/preview-diagnostic-api', '/crm/public/diagnostics/food') : autonomous ? req.url.replace('/api/food-builder/autonomous', '/crm/public/diagnostics/food/autonomous') : req.url, method: req.method, headers: { ...req.headers, ...(diagnostic || autonomous ? { origin: 'http://localhost:3029' } : {}), host: diagnostic || autonomous ? '127.0.0.1:4029' : 'localhost:3029' } }, upstream => {
    res.writeHead(upstream.statusCode, upstream.headers); upstream.pipe(res)
  })
  proxy.on('error', () => { res.writeHead(503); res.end('O preview local está a iniciar. Tente novamente.') }); req.pipe(proxy)
})
server.on('upgrade', (req, socket, head) => {
  const upstream = connect(3029, '127.0.0.1', () => {
    const headers = { ...req.headers, host: 'localhost:3029', origin: 'http://localhost:3029' }
    upstream.write(`GET ${req.url} HTTP/1.1\r\n${Object.entries(headers).map(([k,v]) => `${k}: ${v}`).join('\r\n')}\r\n\r\n`)
    if (head.length) upstream.write(head)
    socket.pipe(upstream); upstream.pipe(socket)
  })
  upstream.on('error', () => socket.destroy()); socket.on('error', () => upstream.destroy())
})
server.listen(3037, '127.0.0.1', () => console.log('Food funnel preview: http://127.0.0.1:3037/diagnostico?segmento=pizzaria&test=1'))
