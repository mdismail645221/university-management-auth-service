import cors from 'cors'
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import golbalErrorHandler from './app/middleware/globalErrorHandelar'
import router from './app/moules/users/users.route'

const app: Application = express()

// middle ware
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', router)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  next('Oree baba error')
})

app.use(golbalErrorHandler)

export default app
