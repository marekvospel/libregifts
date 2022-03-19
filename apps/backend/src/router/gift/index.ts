import { Router } from 'express'
import { body, param } from 'express-validator'
import { createGift } from '../../controllers/gift/create'
import { getGift } from '../../controllers/gift/get'
import { deleteGift } from '../../controllers/gift/delete'

export const giftRouter = Router()

giftRouter.post('/',
  body('name').isString(),
  (req, res) => createGift(req, res))

giftRouter.get('/:id',
  param('id').isUUID(),
  (req, res) => getGift(req, res))

giftRouter.delete('/:id',
  param('id').isUUID(),
  (req, res) => deleteGift(req, res))