import { Request, Response } from 'express';
import {
  getAllUsersService,
  getOneUserService,
  deleteOneUserService,
  updateOneUserPropertyValueService,
  updateUserPropertyValuesService,
  deleteAllUserService,
  
} from '../services/user.service';
import { success } from '../../lib/helpers';
import { ReqUser } from '../../types';

// const routeName = 'user';
// const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  response = {
    success: true,
    data: {
      count: users.length,
      users: users.map(user => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })
    },
    message: `SUCCESS: All users succesfully retrieved`,
  };
  success(`SUCCESS: All users succesfully retrieved`);
  return res.status(200).json(response);
}

export const getOneUserController = async (req: ReqUser, res: Response) => {
  const user = await getOneUserService(req.user._id);
  const response = {
    success: true,
    data: {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    },
    message: `SUCCESS: User succesfully retrieved`,
  };
  success(`SUCCESS: User succesfully retrieved`);
  return res.status(200).json(response);
}

export const deleteOneUserController = async (req: ReqUser, res: Response) => {
  await deleteOneUserService(req.user._id);
  response = {
    success: true,
    data: {},
    message: `SUCCESS: User successfully deleted`,
  };
  success(`SUCCESS: User successfully deleted`);
  return res.status(201).json(response);
};

export const updateOneUserPropertyValueController = async (req: ReqUser, res: Response) => {
  const id: string = req.user._id;
  await updateOneUserPropertyValueService(req.user._id, req.body);
  response = {
    success: true,
    data: {},
    message: `PATCH update request for ID ${id} successful!`,
  };
  success(`PATCH update request for ID ${id} successful!`);
  return res.status(200).json(response);
}

export const updateUserPropertyValuesController = async (req: ReqUser, res: Response) => {
  const id: string = req.user._id;
  await updateUserPropertyValuesService(req.user._id, req.body);
  response = {
    success: true,
    data: {},
    message: `PUT update request for ID ${id} successful!`,
  };
  success(`PUT update request for ID ${id} successful!`);
  return res.status(200).json(response);
}


//------------------------------------------------------------------------------------------//
export const deleteAllUserController = async (req: Request, res: Response) => {
  const user = await deleteAllUserService();
  const response = {
    success: true,
    data: {},
    message: `${user.deletedCount} user(s) deleted successfully!`,
  };
  success(response.message);
  return res.status(201).json(response);
};
//------------------------------------------------------------------------------------------//