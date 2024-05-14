import express, { IRouter } from 'express';
import {
  signupUser,
  loginUser,
} from '../controllers/user.auth.controller';

const router: IRouter = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export { router };
