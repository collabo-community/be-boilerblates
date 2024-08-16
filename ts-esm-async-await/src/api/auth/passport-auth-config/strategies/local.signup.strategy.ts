import {Strategy} from 'passport-local';
import { UserModel as User } from '../../../models/user.model';
import { DoneCallback } from 'passport';

export const localSignupStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: DoneCallback)=>{
    try {
      const createUser = new User({
        email: email,
        password: password,
      });
      const user = await createUser.save();
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);