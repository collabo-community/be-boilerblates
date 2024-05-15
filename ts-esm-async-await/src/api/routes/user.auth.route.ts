import express, { IRouter } from 'express';
import {
  signUpOneUserController,
  loginOneUserController,
} from '../controllers/user.auth.controller';

const router: IRouter = express.Router();

router.post('/signup', signUpOneUserController);
router.post('/login', loginOneUserController);

export { router };
