import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { AppDataSource } from '../../index'
import { Gift } from 'orm'
import { getJson } from '../../utils/json.util'

export async function getGift(req: Request, res: Response) {

  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() })

  const gift = await AppDataSource.manager.getRepository(Gift).findOne({ where: { id: req.params.id } })

  if (!gift)
    return res.status(400).json({ success: false, errors: [{ msg: 'There is no gift with that id!' }] })

  const giftJson = getJson(gift)
  // TODO: only delete if user isn't authenticated
  delete giftJson['giver']
  giftJson['taken'] = !!gift.giver

  res.status(200).json({ success: true, gift: giftJson })
}
