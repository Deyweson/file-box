import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { db } from "../../../database/knex";
import jwt from 'jsonwebtoken'

export async function LoginUser(req: Request, res: Response) {
  const { username, password } = req.body

  const user = await db('users').select('*').where('username', username).first()
  if (!user) { return res.status(400).json({ message: 'Invalid Credentials' }) }

  const hashedPassword = await bcrypt.compare(password, user.password)
  if (!hashedPassword) { return res.status(400).json({ message: 'Invalid Credentials' }) }

  const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '5h' })

  return res.status(200).json({ token })

}