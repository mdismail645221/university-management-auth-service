import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import httpStatus from 'http-status';
import golbalErrorHandler from './app/middleware/globalErrorHandelar';
// import router from './app/routes';
import router from './app/routes';

const app: Application = express();

// middle ware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1/', router);
// app.use('/api/v1/academicSemester', academicSemisterRotues);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      messasge: `successfully root api hitting`,
    });
  } catch (error) {
    next(error);
  }
});

// global error handler
app.use(golbalErrorHandler);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Not found`,
    errorMessage: [
      {
        path: req.originalUrl,
        message: `API NOT FOUND `,
      },
    ],
  });
  next();
});

export default app;
