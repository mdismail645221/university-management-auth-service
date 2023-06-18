import { RequestHandler } from 'express'
import { UserService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { users } = req.body
    const result = await UserService.createUsers(users)

    res.status(200).json({
      success: true,
      message: `Successfully create user`,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const usersControllers = {
  createUser,
}
