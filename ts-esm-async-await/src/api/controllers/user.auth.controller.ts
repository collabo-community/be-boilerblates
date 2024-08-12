import { Request, Response, NextFunction } from 'express';
import { success } from '../../lib/helpers';
import passport from 'passport';
import { UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

// const routeName = 'user';
// const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
export const signUpOneUserController = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-signup', {session: false}, 
    (err: Error, user: UserDocument) => {
    try {
      if (err) {
        throw err;
      }

      const token = jwt.sign(
        {_id: user._id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
      );

      response = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          email_verified: user.email_verified,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token: token
      },
      message: `SUCCESS: User registration successfull`,
    };
    success(`SUCCESS: User registration successfull`);
    return res.status(201).json(response);

    } catch (err) {
      next(err);
    }
  }) (req, res, next);
}


export const loginOneUserController = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-login', {session: false}, 
    (err: Error, user: UserDocument) => {
    try {
      if (err) {
        throw err;
      }

      const token = jwt.sign(
        {_id: user._id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
      );

      response = {
        success: true,
        data: { token: token },
        message: `SUCCESS: User successfully logged in`,
      };
      success(`SUCCESS: User successfully logged in`);
      return res.status(201).json(response);

    } catch (err) {
      next(err);
    }
  }) (req, res, next);
}
//------------------------------------------------------------------------------------------//