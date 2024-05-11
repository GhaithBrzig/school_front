import {Role} from "./Role";

export class User {
  userId?: number
  userName?: string
  firstName?: string
  lastName?: string
  password?:string
  emailAddress?: string
  phoneNumber?: string
  creationDate?: Date
  expirationDate?: Date
  accountStatus?: boolean
  expired?: boolean
  roles?:Role[]
}
