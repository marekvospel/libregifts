import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export const secret = process.env.JWT_SECRET ?? 'abc123'

export function verifyDecode(req: Request): boolean | string | JwtPayload {
  const token = req.header('Authorization')

  if (!token) return false

  try {
    const data = jwt.verify(token, secret)
    if (!data?.['expire']) return false
    if (data['expire'] <= Date.now()) return false

    // TODO: verify user's existence

    return data
  } catch {
    return false
  }
}