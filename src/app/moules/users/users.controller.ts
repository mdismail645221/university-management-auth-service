import { Request, Response } from 'express'
import usersServices from './users.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const result = await usersServices.createUsers(users)

    res.status(200).json({
      success: true,
      message: `Successfully create user`,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed Create user',
    })
  }
}

export default {
  createUser,
}
