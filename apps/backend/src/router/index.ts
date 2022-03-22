import { Router, static as serveStatic } from 'express'
import { apiRouter } from './api'
import path from 'path'

const resolve = (p) => path.resolve(__dirname, p)


export const router = Router()

const staticHandler = serveStatic(resolve('../../../frontend/dist'), { index: ['index.html'] })

router.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next()
  else staticHandler(req, res, next)
})

router.use('/api', apiRouter)
