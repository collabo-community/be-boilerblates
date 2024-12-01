import {Profile, Strategy} from 'passport-google-oauth20';
import { UserModel as User } from '../../../user/user.model';
// import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';
import { badRequestErr } from '../../../../lib/errors/Errors';
import { success } from '../../../../lib/helpers';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.BACKEND_URL as string}/auth/google/callback`,
    scope: ['email']
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback)=>{
    try {
      // console.log(profile);
      success(profile.emails[0].value);
      success(`ACCESS_TOKEN: ${accessToken}`);
      success(`REFRESH_TOKEN: ${refreshToken}`);

      // check if email is part of the returned properties of the google user profile
      const user_email = profile.emails[0].value
      if (!user_email) {
        badRequestErr("Email not Found in Google User Profile");
      }
      let user = await User.findOne({ email: user_email }).exec();
      if (user) {
        if (!user.email_verified) {
          user.email_verified = true;
          user = await user.save()
        }
      } 
      else {
        const createUser = new User({
          email: user_email,
          email_verified: true,
          password: Number(process.env.DEFAULT_USER_PASSWORD),
        });
        user = await createUser.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);