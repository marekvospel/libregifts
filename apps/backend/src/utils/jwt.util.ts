import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export const secret = process.env.JWT_SECRET ?? 'abc123'

export function verifyDecode(req: Request): boolean | string | JwtPayload {
  const token = req.header('Authorization')

  if (!token) return false

  try {
    return jwt.verify(token, secret)
  } catch {
    return false
  }
}