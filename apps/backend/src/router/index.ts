import { Router } from 'express'
import { signRouter } from './sign'
import { giftRouter } from './gift'

export const router = Router()

router.use('/sign', signRouter)
router.use('/gift', giftRouter)
