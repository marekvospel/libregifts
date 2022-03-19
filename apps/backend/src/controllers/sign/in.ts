import { Request, Response } from 'express'
import { AppDataSource } from '../../index'
import { User } from 'orm'
import { validationResult } from 'express-validator'

import * as bcrypt from 'bcrypt'

export async function postSignIn(req: Request, res: Response) {

  const errors = validationResult(req)

  if (!errors.isEmpty())
    res.status(400).json({ errors: errors.array() })


  const repository = AppDataSource.manager.getRepository(User)

  const user = await repository.findOne({ where: { email: req.body.email } })

  const success = await bcrypt.compare(req.body.password, user.password)

  // TODO: generate token :)

  res.json({ success })
}