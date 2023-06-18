import { IgenericErrorMessage } from './errors'

export type IgenericErrorResposed = {
  statusCode: number
  message: string
  errorMessage: IgenericErrorMessage[]
}
