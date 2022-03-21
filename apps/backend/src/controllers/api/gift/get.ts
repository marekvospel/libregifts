import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { AppDataSource } from '../../../index'
import { Gift } from '@libregifts/orm'
import { getJson } from '../../../utils/json.util'
import { verifyDecode } from '../../../utils/jwt.util'

export async function getGift(req: Request, res: Response) {

  const errors = await validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() })

  const gift = await AppDataSource.manager.getRepository(Gift).findOne({
    where: { id: req.params.id },
    relations: {
      giver: true,
    },
  })

  if (!gift)
    return res.status(404).json({ success: false, errors: [{ msg: 'There is no gift with that id!' }] })

  const giftJson = getJson(gift)
  const user = verifyDecode(req)
  if (!user) delete giftJson['giver']
  giftJson['taken'] = !!gift.giver

  res.status(200).json({ success: true, gift: giftJson })
}
