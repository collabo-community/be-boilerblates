import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../models/user.model';
import { unAuthorizedErr } from '../../lib/errors/Errors';


// -----------------------------------------------------------------------------------------------------------//
// https://www.sailpoint.com/identity-library/difference-between-authentication-and-authorization/
// AUTHENTICATION is the process of verifying who someone is (This is done during SIGNUP And LOGIN)
// AUTHORIZATION is the process of verifying what specific applications, files, and data a user has access to
// -----------------------------------------------------------------------------------------------------------//


//-------------- JWT VERIFICATION - AUTHORIZATION (STEP 1) ------------------//
export const verifyUserWithJWT = async (req: Request, res: Response, next: NextFunction) => {
  // check header if it starts with bearer
  const reqAuthorizationHeader = req.headers.authorization;

  if (!reqAuthorizationHeader || !reqAuthorizationHeader.startsWith("Bearer ")) {
    unAuthorizedErr("User could not be verified because authorization header bearer not found");
  }

  const userToken = reqAuthorizationHeader.split(" ")[1];

  const decoded = jwt.verify(userToken, `${process.env.JWT_SECRET}`);
  const payload = decoded as JwtPayload;
  const { _id, username, role } = payload;

  req.user = { _id: _id, username: username, role: role };

  return next();
}
//----------------------------------------------------------------------------//


//----------------- VERIFY ROLES - AUTHORIZATION (STEP 2) --------------------//
export const verifyUserRoles = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    const roleIsVerified = allowedRoles.includes(role);

    if (roleIsVerified) {
      return next();
    }

    unAuthorizedErr(`only ${allowedRoles} have access to this route`);
  }
}
//-----------------------------------------------------------------------------//