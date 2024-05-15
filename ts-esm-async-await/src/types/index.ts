import { Request } from "express";
import { UserDocument, UserRole } from "../api/models/user.model";

export interface ReqUser extends Request {
  user?: {
    _id?: string;
    username?: string;
    role?: UserRole;
  }
}

export type Payload = Pick<UserDocument, "_id" | "username" | "role">;