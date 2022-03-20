import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Gift, Giver } from 'orm'
import { AppDataSource } from '../../index'

export async function giveGift(req: Request, res: Response) {

  const errors = validationResult(req)

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

  if (gift.giver)
    return res.status(400).json({ success: false, errors: [{ msg: 'That gift is already given!' }] })

  const giver = new Giver()
  giver.name = req.body.name
  giver.email = req.body.email
  giver.phone = req.body.phone
  giver.gift = gift

  await AppDataSource.manager.getRepository(Giver).save(giver)

  gift.giver = giver

  await AppDataSource.manager.getRepository(Gift).save(gift)

  res.status(200).json({ success: true })
}
