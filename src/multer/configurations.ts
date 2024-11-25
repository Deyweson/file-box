import multer from 'multer'
import path from 'node:path'

const filesPath = path.resolve(__dirname, '..', 'files')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, filesPath);
  },
  filename: (req, file, callback) => {
    const timeID = new Date().getTime()
    callback(null, `${timeID}_${file.originalname}`)
  }
})

export const upload = multer({ storage: storage })