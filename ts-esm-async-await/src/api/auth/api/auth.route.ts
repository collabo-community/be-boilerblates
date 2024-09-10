import express, { IRouter } from 'express';
import {
  signupWithLocalController,
  loginWithLocalController,
  signupOrLoginWithGithubController,
  signupOrLoginWithGoogleController,
} from '../controllers/auth.controller';
import { authWithGithub } from '../auth/middlewares/auth.middleware';
import { authWithGoogle } from '../auth/middlewares/auth.middleware';

const router: IRouter = express.Router();

router.get("/github", authWithGithub);
router.get("/github/callback", signupOrLoginWithGithubController);

router.get("/google", authWithGoogle);
router.get("/google/callback", signupOrLoginWithGoogleController);

router.post('/signup', signupWithLocalController);
router.post('/login', loginWithLocalController);

export { router };