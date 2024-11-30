import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'
import { IGetUserAuthInfoRequest } from '../../../interfaces/request-definition';

interface JwtPayload {
  id: string
}

export function TokenValidate(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) : Response<any> | void {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Acess denied' })
  }

  try {
    const { id } = jwt.verify(token.split(' ')[1], 'secret-key') as JwtPayload
    req.userId = Number(id)
    next()
  } catch (er) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}