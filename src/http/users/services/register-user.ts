import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { db } from "../../../database/knex";
import fs from 'fs'
import path from 'node:path'

export async function RegisterUser(req: Request, res: Response) {
  const { username, password } = req.body
  console.log(username, password)
  try {
    //validar nome
    const usernameAlreadyExists = await db('users').select('*').where('username', username).first()
    if (usernameAlreadyExists) {
      return res.status(400).json({ message: 'Username already in use' })
    }
    //cryptografas senha
    const hashedPassword = await bcrypt.hash(password, 10)
    //inserir no banco
    await db('users').insert({
      username,
      password: hashedPassword
    })

    const filesPath = path.join(__dirname, '../../..', 'files')
    console.log(filesPath)
    fs.mkdirSync(`${filesPath}/${username}`, { recursive: true })
    

    return res.status(201).send()
  } catch (er){
    return res.status(500).send()
  }
}