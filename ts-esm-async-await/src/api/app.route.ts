import express, { IRouter } from 'express';
import { getAppController } from './app.controller';

const router: IRouter = express.Router();

router.get('/', getAppController);

export { router };
