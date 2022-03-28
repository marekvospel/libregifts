import { Router } from 'express'
import { getGifts } from '../../../controllers/api/gifts/getAll'
import { query } from 'express-validator'

export const giftsRouter = Router()

giftsRouter.get(
  '/',
  query('limit').isNumeric().optional(),
  query('skip').isNumeric().optional(),
  getGifts
)
