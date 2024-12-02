import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { db } from "../../../database/knex";
import jwt from 'jsonwebtoken'

export async function LoginUser(req: Request, res: Response) {
  const { username, password } = req.body
  
  console.log(username, password)

  const user = await db('users').select('*').where('username', username).first()
  if (!user) { return res.status(401).json({ message: 'Invalid Credentials' }) }

  const hashedPassword = await bcrypt.compare(password, user.password)
  if (!hashedPassword) { return res.status(401).json({ message: 'Invalid Credentials' }) }

  const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '5h' })
  res.cookie('token', token, { httpOnly: true })
  return res.redirect('/user')

}