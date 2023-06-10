import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  path: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  custom_user_pass: process.env.CUSTOM_USER_PASS,
}
