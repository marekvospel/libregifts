import { Router } from 'express'
import { postSignIn } from '../../controllers/sign/in'
import { body } from 'express-validator'

export const signRouter = Router()

signRouter.post('/in',
  body('email').isEmail(),
  body('password').isString(),
  (req, res) => postSignIn(req, res))
