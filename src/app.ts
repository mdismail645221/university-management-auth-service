import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'

const app: Application = express()

// middle ware
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
