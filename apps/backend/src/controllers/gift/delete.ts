import { Request, Response } from 'express'
import { verifyDecode } from '../../utils/jwt.util'

export async function deleteGift(req: Request, res: Response) {

  if (!verifyDecode(req))
    return res.status(401).json({ success: false, errors: [{ msg: 'Unauthorized!' }] })

}
