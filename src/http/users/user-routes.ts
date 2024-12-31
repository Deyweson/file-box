import express, { Router, Request, Response } from 'express'
import { RegisterUser } from './services/register-user'
import { LoginUser } from './services/login-user'

const userRoutes: Router = express.Router()

userRoutes.post('/api/user/register', RegisterUser)
userRoutes.post('/api/user/login', LoginUser)

userRoutes.get('/register', async (req: Request, res: Response) => {
  res.render('register')
})
userRoutes.get('/login', async (req: Request, res: Response) => {
  res.render('login')
})

export default userRoutes