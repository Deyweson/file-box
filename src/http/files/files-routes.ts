import express, { Router, Request, Response } from 'express'
import fs from 'node:fs'
import { TokenValidate } from '../middlewares/token-validate'
import { GetFiles } from './services/get-files'
import { DownloadFile } from './services/download-file'
import { upload } from '../../multer/configurations'

const filesRoutes: Router = express.Router()


filesRoutes.get('/files', TokenValidate, GetFiles)
filesRoutes.get('/download', DownloadFile)

filesRoutes.post('/upload', TokenValidate, upload.single('file'), async (req, res) => {
  console.log(req.body)
  res.redirect('/files')
});

export default filesRoutes