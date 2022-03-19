import { Request, Response } from 'express'
import { AppDataSource } from '../../index'
import { Gift } from 'orm'
import { getJson } from '../../utils/json.util'
import { verifyDecode } from '../../utils/jwt.util'
import { validationResult } from 'express-validator'

export async function getGifts(req: Request, res: Response) {

  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors })

  let limit = req.query.limit ?? 25

  if (limit <= 0 || limit > 50) limit = 25

  const gifts = await AppDataSource.manager.getRepository(Gift).find({
    order: {
      name: 'asc',
    },
    relations: {
      giver: true,
    },
    take: limit as number,
    skip: (req.query.skip ?? 0) as number,
  })

  const user = verifyDecode(req)

  const giftsObj = gifts.map((gift) => getJson(gift)).map((gift) => {
    gift['taken'] = !!gift['giver']
    return gift
  }).map((gift) => {
    if (user) return gift
    delete gift['giver']
    return gift
  })

  res.status(200).json({ success: true, gifts: giftsObj })
}