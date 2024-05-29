import express from 'express'
import mysql2 from 'mysql2'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { getAllUser, getUserByEmail, getUserByName, createUser} from './controler.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 4000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const pool = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});
app.get('/api/user', getAllUser)
app.get('/api/email/:email', getUserByEmail)
app.get('/api/user/name/:UserName', getUserByName)
app.post('/create', createUser);
app.listen(port, () => {
  console.log(port);
})
export default pool