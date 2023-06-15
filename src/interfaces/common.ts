import { Model } from 'mongoose'
import { IUser } from '../app/moules/users/user.interface'
import { IgenericErrorMessage } from './errors'

export type IgenericErrorResposed = {
  statusCode: number
  message: string
  errorMessage: IgenericErrorMessage[]
}

export type UserModel = Model<IUser, Record<string, unknown>>
