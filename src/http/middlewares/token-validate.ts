import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken'
import { db } from '../../database/knex';

interface JwtPayload {
  id: string
}

export async function TokenValidate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const authorization = req.cookies.token;

  if (!authorization) {
    return res.status(401).json({ message: 'Access denied' })
  }
  
  try {
    const { id } = jwt.verify(authorization, 'secret-key') as JwtPayload
    const {username} = await db('users').select('username').where('id', Number(id)).first()
    req.user = {
      id,
      username: username
    }

    next()
  } catch (er) {
    console.log(er)
    return res.status(401).json({ error: 'Invalid token' });
    
  }
}