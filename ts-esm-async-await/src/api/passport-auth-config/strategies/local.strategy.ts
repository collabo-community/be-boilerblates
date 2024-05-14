import {Strategy} from 'passport-local';
import { UserModel as User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';

export const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done: DoneCallback)=>{
    try {
      const user = await User.findOne({email: email}).exec();
      if (!user){
        const myErr = Error("Invalid Credentials [email]");
        throw myErr;
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches){
        const myErr = Error("Invalid Credentials [password]");
        throw myErr;
      }
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);