import { Request, Response } from "express"

export async function DownloadFile(req: Request, res: Response) {
  const { path } = req.query

  if(typeof path === 'string'){
    console.log(path)
    return res.download(path)
  }
  return res.status(500).send()
}