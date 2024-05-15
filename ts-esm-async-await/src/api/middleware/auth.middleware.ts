import { NextFunction, Response } from "express";
import passport from 'passport';
import { Payload, ReqUser } from '../../types';
import { UserRole } from "../models/user.model";
import { unAuthorizedErr } from '../../lib/errors/Errors';

// -----------------------------------------------------------------------------------------------------------//
// https://www.sailpoint.com/identity-library/difference-between-authentication-and-authorization/
// AUTHENTICATION is the process of verifying who someone is (This is done during SIGNUP, LOGIN, and JWT)
// AUTHORIZATION is the process of verifying what specific applications, files, and data a user 
//               has access to (Usually by ROLES)
// -----------------------------------------------------------------------------------------------------------//

export const authenticateUserWithJWT = (req: ReqUser, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', {session: false},
    (err: Error, payload:Payload, info: {message: string}) => {
      if (err) {
        return next(err);
      }
  
      if (info) {
        const myErr = new Error(info.message);
        return next(myErr);
      }
  
      if (!payload) {
        const myErr = new Error("[UNAUTHORIZED] Unknown User Trying to Access This Route\nRedirecting To Login Page");
        return next(myErr);
      }
      
      const { _id, username, role} = payload;
      req.user = { _id: _id, username: username, role: role}; // replace the req.user parameter with the payload
      return next();
    }
  )(req, res, next);
}


export const authorizeByUserRoles = (allowedRoles: UserRole[]) => {
  return (req: ReqUser, res: Response, next: NextFunction) => {
    const { role } = req.user;

    const roleIsVerified = allowedRoles.includes(role);

    if (roleIsVerified) {
      return next();
    }

    unAuthorizedErr(`only [${allowedRoles}] have access to this route`);
  }
}