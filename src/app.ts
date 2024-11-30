// app.js ou app.ts
import express from 'express';
import { upload } from './multer/configurations';
import { db } from './database/knex';
import { File } from './models/file';
import path from 'node:path'
import fs from 'fs'
import userRoutes from './domain/users/user-routes';

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static(path.join(__dirname, './views')))

app.use(userRoutes)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.post('/upload', upload.single('file'), async (req, res) => {
  // Acesse o arquivo em req.file
  console.log(req.file)
  // Envie uma resposta apropriada
  if (req.file) {
    await db<File>('files').insert({
      name: req.file?.originalname,
      path: req.file?.path
    })
    res.redirect('/home')
  }
});

app.get('/home', async (req, res) => {
  console.log(path.join('./views'))
  const files = await db<File>('files').select('*')

  res.render('home', { files })
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)

  const file = await db<File>('files').select('*').where(
    'id', id
  ).first()

  if (file) {
    return res.render('file', { file })
  }
  return res.redirect('/home')
})

app.get('/download/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)

  const file = await db<File>('files').select('*').where(
    'id', id
  ).first()

  if (file?.path) {
    return res.download(file.path);
  }

  res.send("File Not Found")
})

app.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)

  const file = await db<File>('files').select('*').where(
    'id', id
  ).first()

  if (file?.path) {
    fs.unlink(file.path, async (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File is deleted.');
        await db<File>('files').delete().where('id', id)
      }
    });
    return res.redirect('/files')
  }

})

export default app;
