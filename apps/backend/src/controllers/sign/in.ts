import { Request, Response } from 'express'
import { AppDataSource } from '../../index'
import { getJson } from '../../utils/json.util'
import { User } from 'orm'
import { validationResult } from 'express-validator'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export async function postSignIn(req: Request, res: Response) {

  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() })


  const repository = AppDataSource.manager.getRepository(User)

  const user = await repository.findOne({ where: { email: req.body.email } })

  if (!user)
    return res.status(400).json({ success: false, errors: [{ msg: 'Invalid username or password!' }] })

  const success = await bcrypt.compare(req.body.password, user.password)

  if (!success)
    return res.status(400).json({ success, errors: [{ msg: 'Invalid username or password!' }] })

  const userJson = getJson(user)
  delete userJson?.['password']
  userJson['expire'] = Date.now() + (7 * 24 * 60 * 60)

  const token = jwt.sign(userJson, 'abc123')

  res.json({ success, token })
}