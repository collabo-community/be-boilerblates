import { UserDocument, UserRole } from "../api/models/user.model";
import { Request } from "express"

export type Payload = Pick<UserDocument, "_id" | "username" | "role">

export interface ReqUser extends Request {
  user? : {
    _id?: string,
    username?: string,
    role?: UserRole,
  }
}