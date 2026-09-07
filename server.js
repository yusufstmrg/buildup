const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const requestedPort = Number.parseInt(process.env.PORT || '4173', 10)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gz': 'application/gzip',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

function start(port) {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname)
    const requestedPath = pathname === '/' ? '/index.html' : pathname
    const filePath = path.resolve(root, `.${requestedPath}`)

    if (!filePath.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    fs.stat(filePath, (statError, stats) => {
      if (statError || !stats.isFile()) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        response.end('Not found')
        return
      }

      response.writeHead(200, {
        'Cache-Control': 'no-cache',
        'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream',
      })
      fs.createReadStream(filePath).pipe(response)
    })
  })

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`[BuildUp] Port ${port} is busy; selecting an available preview port.`)
      start(0)
      return
    }
    throw error
  })

  server.listen(port, '0.0.0.0', () => {
    const address = server.address()
    const activePort = typeof address === 'object' && address ? address.port : port
    console.log(`[BuildUp] Preview server listening on port ${activePort}`)
  })
}

start(Number.isFinite(requestedPort) ? requestedPort : 4173)
