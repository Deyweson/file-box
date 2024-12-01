import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

export async function TokenValidate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Acess denied' })
  }

  try {
    const { id } = jwt.verify(authorization.split(' ')[1], 'secret-key') as JwtPayload

    req.user.id = Number(id)

    next()
  } catch (er) {
    return res.status(401).json({ error: 'Invalid token' });
    
  }
}