import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import golbalErrorHandler from './app/middleware/globalErrorHandelar';
import { userRotues } from './app/moules/user/user.route';

const app: Application = express();

// middle ware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', userRotues);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      messasge: `successfully root api hitting`,
    });
  } catch (error) {
    next(error);
  }
});

app.use(golbalErrorHandler);

export default app;
