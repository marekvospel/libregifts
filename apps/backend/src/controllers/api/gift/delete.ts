import { Request, Response } from 'express'
import { verifyDecode } from '../../../utils/jwt.util'
import { AppDataSource } from '../../../index'
import { Gift, Giver } from '@libregifts/orm'
import { validationResult } from 'express-validator'

export async function deleteGift(req: Request, res: Response): Promise<any> {

  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })

  const user = await verifyDecode(req)

  if (!user) return res.status(401).json({ success: false, errors: [{ msg: 'Unauthorized!' }] })

  const gift = await AppDataSource.manager.getRepository(Gift).findOne({
    where: { id: req.params.id },
    relations: { giver: true },
  })

  if (!gift) return res.status(404).json({ success: false, errors: [{ msg: 'There is no gift with that id!' }] })

  const giver = gift.giver
  await AppDataSource.manager.getRepository(Gift).delete(gift.id)
  if (giver) await AppDataSource.manager.getRepository(Giver).delete(giver.id)

  res.status(200).json({ success: true })

}
