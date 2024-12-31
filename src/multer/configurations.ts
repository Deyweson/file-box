import multer from 'multer'
import path from 'node:path'
import { Request } from 'express'


const storage = multer.diskStorage({
  destination: (req: Request, file, callback) => {
    let filesPath = path.resolve(__dirname, '..', 'files', req.user.username)
    const pathfile = req.body.pathfile
    console.log(pathfile, req.body.pathfile, 'aquiiiiiiiiiii')
    callback(null, filesPath);
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`)
  }
})

export const upload = multer({ storage: storage })