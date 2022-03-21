import { Router } from 'express'
import { signRouter } from './sign'
import { giftRouter } from './gift'
import { giftsRouter } from './gifts'

export const apiRouter = Router()

apiRouter.use('/sign', signRouter)
apiRouter.use('/gift', giftRouter)
apiRouter.use('/gifts', giftsRouter)
