import { Router } from 'express'
import { signRouter } from './sign'

export const router = Router()

router.use('/sign', signRouter)
