import express, { IRouter } from 'express';
import {
  getAllUsersController,
  getOneUserController,
  deleteOneUserController,
  updateOneUserPropertyValueController,
  updateUserPropertyValuesController,
  deleteAllUserController,
} from '../controllers/user.controller';
import { UserRole } from '../models/user.model';
import { authenticateUserWithJWT, authorizeByUserRoles } from '../middleware/auth.middleware';

const router: IRouter = express.Router();

router.get('/', getAllUsersController);
router.get('/get-properties', authenticateUserWithJWT, authorizeByUserRoles([UserRole.User]), getOneUserController);

router.patch('/update-any-property', authenticateUserWithJWT, authorizeByUserRoles([UserRole.User]), updateOneUserPropertyValueController);
router.put('/update-properties', authenticateUserWithJWT, authorizeByUserRoles([UserRole.User]), updateUserPropertyValuesController);

router.delete('/delete', authenticateUserWithJWT, authorizeByUserRoles([UserRole.User]), deleteOneUserController);

//-----------------------------------------------------//
router.delete('/', deleteAllUserController);
//-----------------------------------------------------//

export { router };
