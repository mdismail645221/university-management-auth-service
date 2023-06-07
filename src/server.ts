import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database is connected successfully`)

    app.listen(config.path, () => {
      console.log(`Application app listening on port ${config.path}`)
    })
  } catch (error) {
    console.log(`Server is error now`, error)
  }
}

bootstrap()
