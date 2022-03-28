import { Router, static as serveStatic } from 'express'
import { apiRouter } from './api'
import path from 'path'

const resolve = (p): string => path.resolve(__dirname, p)

export const router = Router()

const staticHandler = serveStatic(resolve('../../../frontend/dist'))

router.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next()
  else staticHandler(req, res, next)
})

router.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next()
  else res.sendFile(path.join(__dirname, '../../../frontend/dist/index.html'))
})

router.use('/api', apiRouter)
