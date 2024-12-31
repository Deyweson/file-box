import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs"

export async function GetFiles(req: Request, res: Response) {
  let filesPath = path.join(__dirname, '../../..', 'files', req.user.username)
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
  console.log(filesPath,' aqui')
  res.render('index', { files, url: req.url, downloadUrl: filesPath })
}