import { Router, static as serveStatic } from 'express'
import { apiRouter } from './api'
import { frontend } from '../controllers/frontend'
import path from 'path'

const resolve = (p) => path.resolve(__dirname, p)


export const router = Router()

const staticHandler = serveStatic(resolve('../../../frontend/dist/client'), { index: false })

router.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next()
  else staticHandler(req, res, next)
})

router.use('*', frontend)

router.use('/api', apiRouter)
