import express from 'express'
import { RegisterUser } from './services.ts/register-user'
import { LoginUser } from './services.ts/login-user'
import { TokenValidate } from './middlewares/token-validate'
import { IGetUserAuthInfoRequest } from '../../interfaces/request-definition'

const userRoutes = express.Router()

userRoutes.post('/api/user/register', RegisterUser)
userRoutes.post('/api/user/login', LoginUser)

userRoutes.use(TokenValidate)

userRoutes.get('/user', (req: IGetUserAuthInfoRequest, res) {
  console.log(req.userId)
  return res.send('ok')
})

userRoutes.get('/view/user/register', async (req, res) => {
  res.render('register')
})


export default userRoutes