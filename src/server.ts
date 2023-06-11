import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info(`Database is connected successfully`)

    app.listen(config.path, () => {
      infoLogger.info(`Application app listening on port ${config.path}`)
    })
  } catch (error) {
    errorLogger.error(`Server is error now`, error)
  }
}

bootstrap()
