import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Payload } from "../../types";

export const authenticateWithJwt = (req: Request, res: Response, next: NextFunction) => {
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