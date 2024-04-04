// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-request
import { UserRole } from "../api/models/user.model";

export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        username: string;
        role: UserRole;
      };
    }
  }
}