import { Request, Response, NextFunction } from 'express';
import {
  createOneUserService,
} from '../services/user.service';
import { success } from '../../lib/helpers';
import passport from 'passport';
import { UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

const routeName = 'user';
const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const signupUser = async (req: Request, res: Response) => {
  const user = await createOneUserService(req.body);

  const token = jwt.sign(
    {_id: user._id, username: user.username, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_LIFETIME}
  );

  response = {
    success:true,
    message:`${item} created successfully!`,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: token
  }
  success(`${item} CREATED successfully!`);
  return res.status(201).json(response);
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {session: false}, 
  (err:Error, user: UserDocument) => {
    if (err) {
      return next(err);
    }

    const token = jwt.sign(
      {_id: user._id, username: user.username, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_LIFETIME}
    );

    response = {
      success:true,
      message:`LOGIN SUCCESSFUL`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token
    }
    success(`LOGIN SUCCESSFUL`);
    return res.status(200).json(response);
  }) (req, res, next);
}