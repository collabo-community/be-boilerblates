import { Request, Response } from 'express';
import {
  signUpOneUserService,
  loginOneUserService,
  getAllUsersService,
  getOneUserService,
  deleteOneUserService,
  updateOneUserPropertyValueService,
  updateUserPropertyValuesService,
  deleteAllUserService,
  
} from '../services/user.service';
import { success } from '../../lib/helpers';

// const routeName = 'user';
// const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
export const signUpOneUserController = async (req: Request, res: Response) => {
  const doc = await signUpOneUserService(req.body);
  const token = doc.generateToken();
  response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      token: token
    },
    message: `SUCCESS: User registration successfull`,
  };
  success(`SUCCESS: User registration successfull`);
  return res.status(201).json(response);
}


export const loginOneUserController = async (req: Request, res: Response) => {
  const doc = await loginOneUserService(req.body);
  const token = doc.generateToken();
  response = {
    success: true,
    data: { token: token },
    message: `SUCCESS: User successfully logged in`,
  };
  success(`SUCCESS: User successfully logged in`);
  return res.status(201).json(response);
}
//------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------//
export const getAllUsersController = async (req: Request, res: Response) => {
  const docs = await getAllUsersService();
  response = {
    success: true,
    data: {
      count: docs.length,
      users: docs.map(doc => {
        return {
          _id: doc._id,
          username: doc.username,
          email: doc.email,
          role: doc.role,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
      })
    },
    message: `SUCCESS: All users succesfully retrieved`,
  };
  success(`SUCCESS: All users succesfully retrieved`);
  return res.status(200).json(response);
}

export const getOneUserController = async (req: Request, res: Response) => {
  const doc = await getOneUserService(req.user._id);
  const response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }
    },
    message: `SUCCESS: User succesfully retrieved`,
  };
  success(`SUCCESS: User succesfully retrieved`);
  return res.status(200).json(response);
}

export const deleteOneUserController = async (req: Request, res: Response) => {
  await deleteOneUserService(req.user._id);
  response = {
    success: true,
    data: {},
    message: `SUCCESS: User successfully deleted`,
  };
  success(`SUCCESS: User successfully deleted`);
  return res.status(201).json(response);
};

export const updateOneUserPropertyValueController = async (req: Request, res: Response) => {
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

export const updateUserPropertyValuesController = async (req: Request, res: Response) => {
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


//------------------------------------------------------------------------------------------//
export const deleteAllUserController = async (req: Request, res: Response) => {
  const doc = await deleteAllUserService();
  const response = {
    success: true,
    data: {},
    message: `${doc.deletedCount} user(s) deleted successfully!`,
  };
  success(response.message);
  return res.status(201).json(response);
};
//------------------------------------------------------------------------------------------//