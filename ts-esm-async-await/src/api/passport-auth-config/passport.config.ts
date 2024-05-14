import {Application} from 'express';
import passport from 'passport';
import { localStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';

export const configurePassport = (app: Application) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
  app.use(passport.initialize());
}