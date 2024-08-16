import {Strategy} from 'passport-local';
import { UserModel as User } from '../../../models/user.model';
import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';
import { badRequestErr } from '../../../../lib/errors/Errors';

export const localLoginStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: DoneCallback)=>{
    try {
      const user = await User.findOne({email: email}).exec();
      if (!user) {
        badRequestErr("Invalid Credentials [email]")
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        badRequestErr("Invalid Credentials [password]")
      }
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);