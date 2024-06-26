import {Application} from 'express';
import passport from 'passport';
import { localStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';

export const configurePassport = (app: Application) => {
  passport.use(localStrategy); // basic login with email/username and password
  passport.use(jwtStrategy); // used to extract bearer token 
  app.use(passport.initialize());
}