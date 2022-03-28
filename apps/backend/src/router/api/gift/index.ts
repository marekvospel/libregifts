import { Router } from 'express'
import { body, param } from 'express-validator'
import { createGift } from '../../../controllers/api/gift/create'
import { getGift } from '../../../controllers/api/gift/get'
import { deleteGift } from '../../../controllers/api/gift/delete'
import { giveGift } from '../../../controllers/api/gift/give'

export const giftRouter = Router()

giftRouter.post('/',
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  createGift)

giftRouter.get('/:id',
  param('id').isUUID(),
  getGift)

giftRouter.delete('/:id',
  param('id').isUUID(),
  deleteGift)

giftRouter.post('/:id/give',
  param('id').isUUID(),
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isMobilePhone('any'),
  giveGift)
