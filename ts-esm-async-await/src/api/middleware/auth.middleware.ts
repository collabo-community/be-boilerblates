import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.model';
import { unAuthorizedErr } from '../../lib/errors/Errors';
import { Payload, ReqUser } from '../../types';


// -----------------------------------------------------------------------------------------------------------//
// https://www.sailpoint.com/identity-library/difference-between-authentication-and-authorization/
// AUTHENTICATION is the process of verifying who someone is (This is done during SIGNUP, LOGIN, and JWT)
// AUTHORIZATION is the process of verifying what specific applications, files, and data a user 
//               has access to (Usually by ROLES)
// -----------------------------------------------------------------------------------------------------------//


export const authenticateUserWithJWT = async (req: ReqUser, res: Response, next: NextFunction) => {
  try {
    // check header if it starts with bearer
    const reqAuthorizationHeader = req.headers.authorization;
    if (!reqAuthorizationHeader || !reqAuthorizationHeader.startsWith("Bearer ")) {
      unAuthorizedErr("User could not be verified because authorization header bearer not found");
    }
    const userToken = reqAuthorizationHeader.split(" ")[1];
    const decoded = jwt.verify(userToken, `${process.env.JWT_SECRET}`);
    const payload = decoded as Payload;
    const { _id, username, role } = payload;
    req.user = { _id: _id, username: username, role: role };
    return next();
    
  } catch (err) {
    next(err);
  }
}


export const authorizeByUserRoles = (allowedRoles: UserRole[]) => {
  return (req: ReqUser, res: Response, next: NextFunction) => {
    try {
      const { role } = req.user;
      const roleIsVerified = allowedRoles.includes(role);
      if (roleIsVerified) {
        return next();
      }
      unAuthorizedErr(`only [${allowedRoles}] have access to this route`);
      
    } catch (err) {
      next(err);
    }
  }
}