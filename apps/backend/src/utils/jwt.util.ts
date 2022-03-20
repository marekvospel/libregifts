import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { AppDataSource } from '../index'
import { User } from '@libregifts/orm'

export const secret = process.env.JWT_SECRET ?? 'abc123'

export async function verifyDecode(req: Request): Promise<boolean | string | JwtPayload> {
  const token = req.header('Authorization')

  if (!token) return false

  try {
    const data = jwt.verify(token, secret)
    if (!data?.['expire']) return false
    if (data['expire'] <= Date.now()) return false

    const user = await AppDataSource.manager.getRepository(User).findOne({ where: { id: data?.['id'] ?? '' } })

    if (!user) return false

    return data
  } catch {
    return false
  }
}