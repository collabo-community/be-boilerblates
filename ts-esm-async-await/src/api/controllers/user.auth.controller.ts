import { NextFunction, Request, Response } from 'express';
import {
  signUpOneUserService,
  loginOneUserService,
} from '../services/user.auth.service';
import { success } from '../../lib/helpers';
import jwt from 'jsonwebtoken';

// const routeName = 'user';
// const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
export const signUpOneUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signUpOneUserService(req.body);
    const token = jwt.sign(
      {_id: user._id, username: user.username, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_LIFETIME});
    response = {
      success: true,
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
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
}


export const loginOneUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await loginOneUserService(req.body);
    const token = jwt.sign(
      {_id: user._id, username: user.username, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
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
}
//------------------------------------------------------------------------------------------//