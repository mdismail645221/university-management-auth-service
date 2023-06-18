import express from 'express'
import { usersControllers } from './user.controller'

const router = express.Router()

router.post('/create-user', usersControllers.createUser)

export const userRotues = router
