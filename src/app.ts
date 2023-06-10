import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import router from './app/moules/users/users.route'

const app: Application = express()

// middle ware
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', router)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
