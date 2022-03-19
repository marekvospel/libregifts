import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { verifyDecode } from '../../utils/jwt.util'
import { Gift } from 'orm'
import { AppDataSource } from '../../index'

export async function createGift(req: Request, res: Response) {

  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors })

  const user = verifyDecode(req)

  if (!user)
    return res.status(401).json({ success: false, errors: [{ msg: 'Unauthorized!' }] })

  const gift = new Gift()
  gift.name = req.body.name

  await AppDataSource.manager.getRepository(Gift).save(gift)

  res.status(200).json({ success: true, gift })
}