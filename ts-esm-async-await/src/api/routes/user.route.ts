import express, { IRouter } from 'express';
import {
  signUpOneUserController,
  loginOneUserController,
  getAllUsersController,
  getOneUserController,
  deleteOneUserController,
  updateOneUserPropertyValueController,
  updateUserPropertyValuesController,
  deleteAllUserController,
} from '../controllers/user.controller';
import { UserRole } from '../models/user.model';
import { verifyUserWithJWT, verifyUserRoles } from '../middleware/auth.middleware';

const router: IRouter = express.Router();

//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
router.post('/auth/signup', signUpOneUserController);
router.post('/auth/login', loginOneUserController);
//----------------------------------------------------------------------------------------//

//----------------------------------------------------------------------------------------//
router.get('/get-all', getAllUsersController);
router.get('/auth/get-profile', verifyUserWithJWT, verifyUserRoles([UserRole.User]), getOneUserController);

router.put('/auth/update-profile-any', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateOneUserPropertyValueController);
router.patch('/auth/update-profile', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateUserPropertyValuesController);

router.delete('/auth/delete', verifyUserWithJWT, verifyUserRoles([UserRole.User]), deleteOneUserController);
//----------------------------------------------------------------------------------------//

//---------------------- AUTHENTICATION (SIGNUP AND LOGIN) -------------------------------//
router.delete('/delete-all', deleteAllUserController);
//----------------------------------------------------------------------------------------//

export { router };
