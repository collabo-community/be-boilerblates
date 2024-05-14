import { Request, Response } from 'express';
import {
  getAllUsersService,
  getOneUserService,
  deleteAllUsersService,
  deleteOneUserService
} from '../services/user.service';
import { success } from '../../lib/helpers';
import { ReqUser } from '../../types';

const routeName = 'user';
const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  response = {
    succes: true,
    count: users.length,
    users: users.map(user => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    })
  };
  success(`GET request successful!`);
  return res.status(200).json(response);
}

export const getOneUserController = async (req: ReqUser, res: Response) => {
  const user = await getOneUserService(req.user._id);
  response = {
    success:true,
    message:`GET profile request for [${user.username}] was successful!`,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  }
  success(`GET request for ${user.username} successful!`);
  return res.status(200).json(response);

}

export const deleteOneUserController = async (req: ReqUser, res: Response) => {
  await deleteOneUserService(req.user._id);
  response = {
    success: true,
    message: `${item} DELETED successfully!`,
  }
  success(`${item} DELETED successfully!`);
  return res.status(200).json(response);
};

export const deleteAllUsersController = async (req: ReqUser, res: Response) => {
  await deleteAllUsersService();
  response = {
    success: true,
    message:`All ${item}s DELETED successfully`,
  }
  success(`All ${item}s DELETED successfully`);
  return res.status(200).json(response);
};
