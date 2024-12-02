import express, { Router, Request, Response } from 'express'
import { RegisterUser } from './services.ts/register-user'
import { LoginUser } from './services.ts/login-user'
import { TokenValidate } from './middlewares/token-validate'
import fs from 'node:fs'
import path from 'node:path'

const userRoutes: Router = express.Router()

userRoutes.post('/api/user/register', RegisterUser)
userRoutes.post('/api/user/login', LoginUser)


async function profile(req: Request, res: Response) {
  console.log(req.cookies.token)
  return res.render('teste')

}

userRoutes.get('/register', async (req: Request, res: Response) => {
  res.render('register')
})
userRoutes.get('/login', async (req: Request, res: Response) => {
  res.render('login')
})

userRoutes.get('/user', TokenValidate, profile)

userRoutes.get('/files', TokenValidate, async (req, res) => {
  console.log(req.query.path)
  let filesPath = path.join(__dirname, '../..', 'files', req.user.username)
  if (typeof req.query.path === 'string') {
    let folder = req.query.path
    folder = folder.replaceAll('-', '/')
    filesPath = path.join(filesPath, folder)
  }
  let files: string[] = []
  try {
    files = fs.readdirSync(filesPath)
  } catch (er) {
  }
  res.render('teste', { files, url: req.url, downloadUrl: filesPath })

})


userRoutes.get('/download', async (req, res) => {
  const { path } = req.query

  if(typeof path === 'string'){
    console.log(path)
    return res.download(path)
  }
  return res.status(500).send()
})

export default userRoutes