import express, { IRouter } from 'express';
import {
  getAllUsersController,
  getOneUserController,
  deleteAllUsersController,
  deleteOneUserController,
} from '../controllers/user.controller';
import { authenticateWithJwt } from '../middleware/auth.middleware';

const router: IRouter = express.Router();

router.get('/', getAllUsersController);
router.get('/profile', authenticateWithJwt, getOneUserController);
router.delete('/', deleteAllUsersController);
router.delete('/profile', authenticateWithJwt, deleteOneUserController);

export { router };
