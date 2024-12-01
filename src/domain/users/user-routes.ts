import express, { Router, Request, Response } from 'express'
import { RegisterUser } from './services.ts/register-user'
import { LoginUser } from './services.ts/login-user'
import { TokenValidate } from './middlewares/token-validate'

const userRoutes: Router = express.Router()

userRoutes.post('/api/user/register', RegisterUser)
userRoutes.post('/api/user/login', LoginUser)


async function profile(req: Request, res: Response) {
  
  return void res.send('ok')

}

userRoutes.get('/user', TokenValidate, profile)

userRoutes.get('/view/user/register', async (req: Request, res: Response) => {
  res.render('register')
})


export default userRoutes