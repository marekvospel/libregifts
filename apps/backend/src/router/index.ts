import { Router } from 'express'
import { signRouter } from './sign'
import { giftRouter } from './gift'
import { giftsRouter } from './gifts'

export const router = Router()

router.use('/sign', signRouter)
router.use('/gift', giftRouter)
router.use('/gifts', giftsRouter)
