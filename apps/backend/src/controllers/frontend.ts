import { NextFunction, Request, Response } from 'express'
import * as fs from 'fs'
import path from 'path'

const resolve = (p) => path.resolve(__dirname, p)
const manifest = require('../../../frontend/dist/client/ssr-manifest.json')
const indexProd = fs.readFileSync(resolve('../../../frontend/dist/client/index.html'), 'utf-8')

export async function frontend(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/api'))
    return next()


  try {
    const url = req.originalUrl

    const template = indexProd
    const render = require('../../../frontend/dist/server/entry-server.js').render

    const [appHtml, preloadLinks, initialState] = await render(url, manifest)

    const html = template
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml)
      .replace('<!--initial-state-->', initialState)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}